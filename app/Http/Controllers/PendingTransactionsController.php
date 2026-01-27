<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\PendingSale;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PendingTransactionsController extends Controller
{
    /**
     * Display a unified transactions page with toggle between pending and completed.
     */
    public function transactions(Request $request)
    {
        $status = $request->get('status', 'completed'); // Default to completed
        
        $query = PendingSale::with(['member', 'creator', 'location']);
        
        if ($status === 'pending') {
            // Only show pay_later transactions as pending
            $query->where('payment_method', 'pay_later')->pending()->latest();
        } elseif ($status === 'completed') {
            // Show all completed transactions (cash and pay_later that are completed)
            $query->completed()->latest('completed_at');
        } else {
            $query->latest(); // All transactions
        }

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

        // Year and Month filtering
        if ($request->filled('year')) {
            $query->whereYear($status === 'completed' ? 'completed_at' : 'created_at', $request->year);
        }

        if ($request->filled('month')) {
            $query->whereMonth($status === 'completed' ? 'completed_at' : 'created_at', $request->month);
        }

        $transactions = $query->paginate(15)->through(function ($sale) use ($status) {
            $baseData = [
                'id' => $sale->id,
                'transaction_id' => $sale->transaction_id,
                'member' => $sale->member,
                'member_name' => $sale->member_name,
                'items_count' => $sale->items_count,
                'subtotal' => $sale->subtotal,
                'formatted_subtotal' => $sale->formatted_subtotal,
                'created_by' => $sale->creator->name,
                'created_at' => $sale->created_at,
                'notes' => $sale->notes,
                'payment_method' => $sale->payment_method,
                'status' => $sale->status,
            ];

            if ($status === 'pending') {
                return array_merge($baseData, [
                    'total_paid' => $sale->total_paid,
                    'remaining_balance' => $sale->remaining_balance,
                ]);
            } else {
                return array_merge($baseData, [
                    'total_paid' => $sale->total_paid,
                    'completed_by' => $sale->completer?->name,
                    'completed_at' => $sale->completed_at,
                ]);
            }
        });

        // Get active members for filter dropdown
        $members = \App\Models\Member::select('id', 'name')
            ->where('status', 'Active')
            ->orderBy('name')
            ->get();

        // Get available years for filter
        $years = PendingSale::selectRaw('DISTINCT EXTRACT(YEAR FROM '.($status === 'completed' ? 'completed_at' : 'created_at').') as year')
            ->where($status === 'completed' ? 'completed_at' : 'created_at', '!=', null)
            ->orderBy('year', 'desc')
            ->pluck('year');

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'members' => $members,
            'years' => $years,
            'filters' => $request->only(['search', 'member_id', 'status', 'year', 'month']),
            'currentStatus' => $status,
        ]);
    }

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
     * Display a listing of completed transactions.
     */
    public function completed(Request $request)
    {
        $query = PendingSale::with(['member', 'creator', 'location', 'completer'])
            ->completed()
            ->latest('completed_at');

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

        $completedSales = $query->paginate(15)->through(function ($sale) {
            return [
                'id' => $sale->id,
                'transaction_id' => $sale->transaction_id,
                'member' => $sale->member,
                'member_name' => $sale->member_name,
                'items' => $sale->items,
                'items_count' => $sale->items_count,
                'subtotal' => $sale->subtotal,
                'total_paid' => $sale->total_paid,
                'formatted_subtotal' => $sale->formatted_subtotal,
                'created_by' => $sale->creator->name,
                'completed_by' => $sale->completer?->name,
                'created_at' => $sale->created_at,
                'completed_at' => $sale->completed_at,
                'notes' => $sale->notes,
                'payment_method' => $sale->payment_method,
                'payment_history' => $sale->payment_history,
            ];
        });

        // Get active members for filter dropdown
        $members = \App\Models\Member::select('id', 'name')
            ->where('status', 'Active')
            ->orderBy('name')
            ->get();

        return Inertia::render('CompletedTransactions/Index', [
            'completedSales' => $completedSales,
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

        return DB::transaction(function () use ($request, $pendingSale) {
            $oldItems = collect($pendingSale->items ?? [])->mapWithKeys(function ($item) {
                $productId = $item['product_id'] ?? $item['id'] ?? null;
                if (!$productId) {
                    return [];
                }
                return [(int) $productId => (int) ($item['quantity'] ?? 0)];
            });

            $newItemsByProduct = collect($request->cart)->mapWithKeys(function ($item) {
                return [(int) $item['id'] => (int) $item['quantity']];
            });

            $allProductIds = $oldItems->keys()->merge($newItemsByProduct->keys())->unique();

            foreach ($allProductIds as $productId) {
                $oldQty = (int) ($oldItems[$productId] ?? 0);
                $newQty = (int) ($newItemsByProduct[$productId] ?? 0);
                $delta = $newQty - $oldQty;

                if ($delta === 0) {
                    continue;
                }

                $product = Product::lockForUpdate()->find($productId);
                if (!$product) {
                    return back()->with('error', 'Product not found.');
                }

                if ($delta > 0) {
                    if ($product->current_stock < $delta) {
                        return back()->with('error', "Insufficient stock for {$product->name}. Available: {$product->current_stock}");
                    }
                    $product->current_stock -= $delta;
                } else {
                    $product->current_stock += abs($delta);
                }

                $product->save();
            }

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
                'total' => $newSubtotal,
                'notes' => $request->notes,
                'payment_method' => $request->payment_method,
                'items' => $updatedItems,
            ]);

            // Clear the edit session data to prevent the cart from staying loaded in POS
            session()->forget('pending_sale_edit');

            return redirect()->route('pending-transactions.index')->with('success', 'Transaction updated successfully!');
        });

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
