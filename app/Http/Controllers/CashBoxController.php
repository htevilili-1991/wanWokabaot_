<?php

namespace App\Http\Controllers;

use App\Models\CashBox;
use App\Models\CashBalanceHistory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class CashBoxController extends Controller
{
    /**
     * Display a listing of cash boxes.
     */
    public function index(): JsonResponse
    {
        $cashBoxes = CashBox::with(['transfersFrom', 'transfersTo'])
            ->orderBy('is_primary', 'desc')
            ->orderBy('name')
            ->get();
        
        return response()->json($cashBoxes);
    }

    /**
     * Store a newly created cash box.
     */
    public function store(Request $request): JsonResponse
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
        
        // Log initial balance
        if ($validated['current_balance'] > 0) {
            CashBalanceHistory::create([
                'cash_box_id' => $cashBox->id,
                'old_balance' => 0,
                'new_balance' => $validated['current_balance'],
                'difference' => $validated['current_balance'],
                'transaction_type' => 'adjustment',
                'reason' => 'Initial balance setup',
                'updated_by' => auth()->id(),
            ]);
        }
        
        return response()->json($cashBox, 201);
    }

    /**
     * Display the specified cash box.
     */
    public function show(CashBox $cashBox): JsonResponse
    {
        $cashBox->load([
            'transfersFrom' => function ($query) {
                $query->with(['toCashBox', 'transferredByUser'])
                    ->latest('transferred_at')
                    ->limit(10);
            },
            'transfersTo' => function ($query) {
                $query->with(['fromCashBox', 'transferredByUser'])
                    ->latest('transferred_at')
                    ->limit(10);
            },
            'balanceHistories' => function ($query) {
                $query->with('updatedByUser')
                    ->latest()
                    ->limit(20);
            }
        ]);
        
        return response()->json($cashBox);
    }

    /**
     * Update the specified cash box.
     */
    public function update(Request $request, CashBox $cashBox): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('cash_boxes', 'name')->ignore($cashBox->id)],
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
        
        return response()->json($cashBox);
    }

    /**
     * Adjust cash box balance.
     */
    public function adjustBalance(Request $request, CashBox $cashBox): JsonResponse
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
            
            return response()->json([
                'message' => 'Balance adjusted successfully',
                'cash_box' => $cashBox->fresh()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to adjust balance: ' . $e->getMessage()
            ], 422);
        }
    }

    /**
     * Remove the specified cash box.
     */
    public function destroy(CashBox $cashBox): JsonResponse
    {
        // Check if cash box has transfers
        if ($cashBox->transfersFrom()->exists() || $cashBox->transfersTo()->exists()) {
            return response()->json([
                'message' => 'Cannot delete cash box that has transfer history'
            ], 422);
        }

        // Check if it's the primary cash box
        if ($cashBox->is_primary) {
            return response()->json([
                'message' => 'Cannot delete primary cash box'
            ], 422);
        }

        $cashBox->delete();
        
        return response()->json(null, 204);
    }
}
