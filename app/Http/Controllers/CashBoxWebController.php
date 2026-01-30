<?php

namespace App\Http\Controllers;

use App\Models\CashBox;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\JsonResponse;

class CashBoxWebController extends Controller
{
    /**
     * Display a listing of cash boxes.
     */
    public function index(Request $request)
    {
        $cashBoxes = CashBox::with(['transfersFrom', 'transfersTo'])
            ->orderBy('is_primary', 'desc')
            ->orderBy('name')
            ->get();

        return Inertia::render('cash-boxes/index', [
            'cashBoxes' => $cashBoxes,
        ]);
    }

    /**
     * Store a newly created cash box.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:cash_boxes,name'],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'current_balance' => ['required', 'numeric', 'min:0'],
            'is_active' => ['boolean'],
            'is_primary' => ['boolean'],
            'opening_hours' => ['nullable', 'array'],
        ]);

        // If setting as primary, unset other primary
        if ($validated['is_primary'] ?? false) {
            CashBox::where('is_primary', true)->update(['is_primary' => false]);
        }

        $cashBox = CashBox::create($validated);
        
        return redirect()->route('cash-boxes.index')->with('success', 'Cash box created successfully.');
    }

    /**
     * Update the specified cash box.
     */
    public function update(Request $request, CashBox $cashBox)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:cash_boxes,name,' . $cashBox->id],
            'location' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'is_primary' => ['boolean'],
            'opening_hours' => ['nullable', 'array'],
        ]);

        // If setting as primary, unset other primary
        if ($validated['is_primary'] ?? false) {
            CashBox::where('is_primary', true)->where('id', '!=', $cashBox->id)->update(['is_primary' => false]);
        }

        $cashBox->update($validated);
        
        return redirect()->route('cash-boxes.index')->with('success', 'Cash box updated successfully.');
    }

    /**
     * Remove the specified cash box.
     */
    public function destroy(CashBox $cashBox)
    {
        // Check if cash box has transfers
        if ($cashBox->transfersFrom()->exists() || $cashBox->transfersTo()->exists()) {
            return back()->with('error', 'Cannot delete cash box that has transfer history');
        }

        // Check if it's the primary cash box
        if ($cashBox->is_primary) {
            return back()->with('error', 'Cannot delete primary cash box');
        }

        $cashBox->delete();
        
        return redirect()->route('cash-boxes.index')->with('success', 'Cash box deleted successfully.');
    }

    /**
     * Adjust cash box balance.
     */
    public function adjustBalance(Request $request, CashBox $cashBox)
    {
        $validated = $request->validate([
            'new_balance' => ['required', 'numeric', 'min:0'],
            'reason' => ['required', 'string'],
        ]);

        try {
            $cashBox->updateBalance(
                $validated['new_balance'],
                $validated['reason'],
                auth()->id()
            );
            
            return redirect()->route('cash-boxes.index')->with('success', 'Balance adjusted successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to adjust balance: ' . $e->getMessage());
        }
    }
}
