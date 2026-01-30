<?php

namespace App\Http\Controllers;

use App\Models\CashTransfer;
use App\Models\CashBox;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class CashTransferController extends Controller
{
    /**
     * Display a listing of cash transfers.
     */
    public function index(Request $request): JsonResponse
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
        
        return response()->json($transfers);
    }

    /**
     * Store a newly created cash transfer.
     */
    public function store(Request $request): JsonResponse
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
            return response()->json([
                'message' => 'Insufficient funds in source cash box',
                'available_balance' => $fromCashBox->current_balance
            ], 422);
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
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Failed to complete transfer: ' . $e->getMessage()
                ], 422);
            }
        }

        return response()->json($transfer->load(['fromCashBox', 'toCashBox', 'transferredByUser']), 201);
    }

    /**
     * Display the specified cash transfer.
     */
    public function show(CashTransfer $cashTransfer): JsonResponse
    {
        $cashTransfer->load(['fromCashBox', 'toCashBox', 'transferredByUser', 'approvedByUser']);
        
        return response()->json($cashTransfer);
    }

    /**
     * Complete a pending cash transfer.
     */
    public function complete(CashTransfer $cashTransfer): JsonResponse
    {
        if ($cashTransfer->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending transfers can be completed'
            ], 422);
        }

        try {
            $cashTransfer->complete();
            $cashTransfer->approved_by = auth()->id();
            $cashTransfer->save();
            
            return response()->json([
                'message' => 'Transfer completed successfully',
                'transfer' => $cashTransfer->fresh()->load(['fromCashBox', 'toCashBox', 'transferredByUser', 'approvedByUser'])
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to complete transfer: ' . $e->getMessage()
            ], 422);
        }
    }

    /**
     * Cancel a pending cash transfer.
     */
    public function cancel(Request $request, CashTransfer $cashTransfer): JsonResponse
    {
        if ($cashTransfer->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending transfers can be cancelled'
            ], 422);
        }

        $validated = $request->validate([
            'reason' => ['required', 'string'],
        ]);

        $cashTransfer->cancel($validated['reason']);
        
        return response()->json([
            'message' => 'Transfer cancelled successfully',
            'transfer' => $cashTransfer->fresh()
        ]);
    }

    /**
     * Remove the specified cash transfer.
     */
    public function destroy(CashTransfer $cashTransfer): JsonResponse
    {
        if ($cashTransfer->status === 'completed') {
            return response()->json([
                'message' => 'Cannot delete completed transfers'
            ], 422);
        }

        $cashTransfer->delete();
        
        return response()->json(null, 204);
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
