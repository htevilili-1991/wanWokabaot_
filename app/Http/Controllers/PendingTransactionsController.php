<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Product;
use App\Models\PendingSale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PendingTransactionsController extends Controller
{
    /**
     * Display a listing of pending transactions.
     */
    public function index(Request $request)
    {
        $query = PendingSale::with(['member', 'creator', 'location'])
            ->pending()
            ->latest();

        // Restrict to user's assigned locations if not Admin
        if ($request->has('assigned_location_ids')) {
            $query->whereIn('location_id', $request->assigned_location_ids);
        }

        // Apply filters
        if ($request->filled('member_id')) {
            $query->where('member_id', $request->member_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('transaction_id', 'like', "%{$search}%")
                    ->orWhereHas('member', function ($memberQuery) use ($search) {
                        $memberQuery->where('name', 'like', "%{$search}%");
                    });
            });
        }

        $pendingSales = $query->paginate(15)->through(function ($pendingSale) {
            return [
                'id' => $pendingSale->id,
                'transaction_id' => $pendingSale->transaction_id,
                'member' => $pendingSale->member,
                'member_name' => $pendingSale->member_name,
                'items' => $pendingSale->items,
                'items_count' => $pendingSale->items_count,
                'subtotal' => $pendingSale->subtotal,
                'total_paid' => $pendingSale->total_paid,
                'remaining_balance' => $pendingSale->remaining_balance,
                'formatted_subtotal' => $pendingSale->formatted_subtotal,
                'created_by' => $pendingSale->creator->name,
                'created_at' => $pendingSale->created_at,
                'notes' => $pendingSale->notes,
                'payment_history' => $pendingSale->payment_history,
            ];
        });

        // Get active members for filter dropdown
        $members = \App\Models\Member::select('id', 'name')
            ->where('status', 'Active')
            ->orderBy('name')
            ->get();

        return Inertia::render('PendingTransactions/Index', [
            'pendingSales' => $pendingSales,
            'members' => $members,
            'filters' => $request->only(['search', 'member_id']),
        ]);
    }

    /**
     * Add payment to a pending transaction.
     */
    public function addPayment(Request $request, PendingSale $pendingSale): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|in:cash,bank_transfer,card',
            'notes' => 'nullable|string|max:255',
        ]);

        if (!$pendingSale->isPending()) {
            return back()->with('error', 'This transaction has already been completed.');
        }

        if ($request->amount > $pendingSale->remaining_balance) {
            return back()->with('error', 'Payment amount cannot exceed remaining balance.');
        }

        $success = $pendingSale->addPayment(
            $request->amount,
            $request->payment_method,
            $request->notes
        );

        if ($success) {
            // Update member balance if it's a member transaction
            if ($pendingSale->member) {
                $pendingSale->member->decrement('balance', $request->amount);
            }

            $message = $pendingSale->isFullyPaid()
                ? "Transaction {$pendingSale->transaction_id} completed successfully!"
                : "Payment of {$request->amount} VT added to transaction {$pendingSale->transaction_id}.";

            return back()->with('success', $message);
        } else {
            return back()->with('error', 'Failed to add payment.');
        }
    }

    /**
     * Reopen transaction in POS for editing.
     */
    public function update(PendingSale $pendingSale): \Illuminate\Http\RedirectResponse
    {
        if (!$pendingSale->isPending()) {
            return back()->with('error', 'This transaction has already been completed.');
        }

        // Store pending sale data in session for POS to pick up
        session([
            'pending_sale_edit' => [
                'id' => $pendingSale->id,
                'items' => $pendingSale->items,
                'member_id' => $pendingSale->member_id,
                'subtotal' => $pendingSale->subtotal,
                'notes' => $pendingSale->notes,
            ]
        ]);

        return redirect()->route('pos.index')->with('info', 'Transaction opened for editing in POS.');
    }

    /**
     * Update pending transaction with new items and details.
     */
    public function updateTransaction(Request $request, PendingSale $pendingSale): \Illuminate\Http\RedirectResponse
    {
        if (!$pendingSale->isPending()) {
            return back()->with('error', 'This transaction has already been completed.');
        }

        $request->validate([
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'member_id' => 'nullable|exists:members,id',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,pay_later',
            'notes' => 'nullable|string|max:500',
        ]);

        // Calculate new subtotal from cart items
        $newSubtotal = 0;
        $updatedItems = [];

        foreach ($request->cart as $item) {
            $product = Product::find($item['id']);
            if (!$product) {
                return back()->with('error', 'Product not found.');
            }

            $itemTotal = $product->selling_price * $item['quantity'];
            $newSubtotal += $itemTotal;

            $updatedItems[] = [
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'unit_price' => $product->selling_price,
                'total' => $itemTotal,
            ];
        }

        // Update the pending sale
        $pendingSale->update([
            'member_id' => $request->member_id,
            'subtotal' => $newSubtotal,
            'total' => $newSubtotal, // For pending transactions, total equals subtotal
            'notes' => $request->notes,
            'payment_method' => $request->payment_method,
            'items' => $updatedItems, // Update items as JSON array
        ]);

        // Clear the edit session data to prevent the cart from staying loaded in POS
        session()->forget('pending_sale_edit');

        return redirect()->route('pending-transactions.index')->with('success', 'Transaction updated successfully!');
    }

    /**
     * Delete/cancel a pending transaction.
     */
    public function destroy(Request $request, PendingSale $pendingSale = null): \Illuminate\Http\RedirectResponse
    {
        $transactionsToDelete = collect();

        if ($pendingSale) {
            // Single deletion
            $transactionsToDelete->push($pendingSale);
        } else {
            // Bulk deletion
            $validated = $request->validate([
                'ids' => ['required', 'array'],
                'ids.*' => ['required', 'integer', 'exists:pending_sales,id'],
            ]);
            $transactionsToDelete = PendingSale::whereIn('id', $validated['ids'])->get();
        }

        foreach ($transactionsToDelete as $transaction) {
            if (!$transaction->isPending()) {
                // Skip already completed transactions for bulk delete, or return error for single
                if ($pendingSale) { // If it's a single deletion, return error
                    return back()->with('error', 'This transaction has already been completed and cannot be cancelled.');
                }
                continue; // For bulk, just skip this one
            }

            // Restore stock for all items
            foreach ($transaction->items as $item) {
                // Corrected: Use 'product_id' if available, otherwise fallback to 'id' if 'id' refers to product id
                $productId = $item['product_id'] ?? $item['id'];
                $product = \App\Models\Product::find($productId);
                if ($product) {
                    $product->increment('current_stock', $item['quantity']);
                }
            }

            // If member transaction and payments were made, refund to member balance
            if ($transaction->member && $transaction->total_paid > 0) {
                $transaction->member->increment('balance', $transaction->total_paid);
            }

            $transaction->delete();
        }

        $message = $pendingSale ?
            "Transaction {$pendingSale->transaction_id} cancelled and items returned to inventory." :
            "Selected pending transactions cancelled and items returned to inventory.";

        return back()->with('success', $message);
    }
}
