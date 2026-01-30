<?php

namespace App\Http\Controllers;

use App\Models\CashTransfer;
use App\Models\CashBox;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CashTransferWebController extends Controller
{
    /**
     * Display a listing of cash transfers.
     */
    public function index(Request $request)
    {
        $query = CashTransfer::with(['fromCashBox', 'toCashBox', 'transferredByUser', 'approvedByUser'])
            ->latest('transferred_at');

        // Filter by cash box
        if ($request->has('cash_box_id')) {
            $query->where(function ($q) use ($request) {
                $q->where('from_cash_box_id', $request->cash_box_id)
                  ->orWhere('to_cash_box_id', $request->cash_box_id);
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('transferred_at', '>=', $request->date_from);
        }
        if ($request->has('date_to')) {
            $query->whereDate('transferred_at', '<=', $request->date_to);
        }

        $transfers = $query->paginate($request->get('per_page', 20));
        $cashBoxes = CashBox::where('is_active', true)->orderBy('name')->get();

        return Inertia::render('cash-transfers/index', [
            'transfers' => $transfers,
            'cashBoxes' => $cashBoxes,
            'filters' => [
                'cash_box_id' => $request->cash_box_id,
                'status' => $request->status,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
                'per_page' => $request->per_page,
            ],
        ]);
    }

    /**
     * Store a newly created cash transfer.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'from_cash_box_id' => ['required', 'exists:cash_boxes,id'],
            'to_cash_box_id' => ['required', 'exists:cash_boxes,id', 'different:from_cash_box_id'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'reason' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
            'transferred_at' => ['nullable', 'date'],
        ]);

        // Check if source cash box has sufficient funds
        $fromCashBox = CashBox::findOrFail($validated['from_cash_box_id']);
        if ($fromCashBox->current_balance < $validated['amount']) {
            return back()->with('error', 'Insufficient funds in source cash box');
        }

        // Create the transfer (pending status)
        $transfer = CashTransfer::create([
            'from_cash_box_id' => $validated['from_cash_box_id'],
            'to_cash_box_id' => $validated['to_cash_box_id'],
            'amount' => $validated['amount'],
            'reason' => $validated['reason'] ?? 'Cash transfer',
            'notes' => $validated['notes'],
            'transferred_by' => auth()->id(),
            'transferred_at' => $validated['transferred_at'] ?? now(),
            'status' => 'pending',
        ]);

        // Auto-complete if user has permission or amount is below threshold
        $autoCompleteThreshold = config('cash.auto_complete_threshold', 1000);
        if ($validated['amount'] <= $autoCompleteThreshold || $this->canAutoComplete()) {
            try {
                $transfer->complete();
                return redirect()->route('cash-transfers.index')->with('success', 'Transfer completed successfully.');
            } catch (\Exception $e) {
                return back()->with('error', 'Failed to complete transfer: ' . $e->getMessage());
            }
        }

        return redirect()->route('cash-transfers.index')->with('success', 'Transfer created successfully. Awaiting approval.');
    }

    /**
     * Complete a pending cash transfer.
     */
    public function complete(Request $request, CashTransfer $cashTransfer)
    {
        if ($cashTransfer->status !== 'pending') {
            return back()->with('error', 'Only pending transfers can be completed');
        }

        try {
            $cashTransfer->complete();
            $cashTransfer->approved_by = auth()->id();
            $cashTransfer->save();
            
            return redirect()->route('cash-transfers.index')->with('success', 'Transfer completed successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to complete transfer: ' . $e->getMessage());
        }
    }

    /**
     * Cancel a pending cash transfer.
     */
    public function cancel(Request $request, CashTransfer $cashTransfer)
    {
        if ($cashTransfer->status !== 'pending') {
            return back()->with('error', 'Only pending transfers can be cancelled');
        }

        $validated = $request->validate([
            'reason' => ['required', 'string'],
        ]);

        $cashTransfer->cancel($validated['reason']);
        
        return redirect()->route('cash-transfers.index')->with('success', 'Transfer cancelled successfully.');
    }

    /**
     * Remove the specified cash transfer.
     */
    public function destroy(CashTransfer $cashTransfer)
    {
        if ($cashTransfer->status === 'completed') {
            return back()->with('error', 'Cannot delete completed transfers');
        }

        $cashTransfer->delete();
        
        return redirect()->route('cash-transfers.index')->with('success', 'Transfer deleted successfully.');
    }

    /**
     * Check if user can auto-complete transfers
     */
    private function canAutoComplete(): bool
    {
        // Super Admin and Admin can auto-complete
        return auth()->user()->roles->pluck('name')->intersect(['Super Admin', 'Admin'])->isNotEmpty();
    }
}
