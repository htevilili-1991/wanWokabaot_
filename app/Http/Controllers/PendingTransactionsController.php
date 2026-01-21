<?php

namespace App\Http\Controllers;

use App\Models\PendingSale;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PendingTransactionsController extends Controller
{
    /**
     * Display a listing of pending transactions.
     */
    public function index(Request $request)
    {
        $query = PendingSale::with(['member', 'creator'])
            ->pending()
            ->latest();

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
                'formatted_subtotal' => $pendingSale->formatted_subtotal,
                'created_by' => $pendingSale->creator->name,
                'created_at' => $pendingSale->created_at,
                'notes' => $pendingSale->notes,
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
     * Complete a pending transaction.
     */
    public function complete(PendingSale $pendingSale): RedirectResponse
    {
        if (! $pendingSale->isPending()) {
            return back()->with('error', 'This transaction has already been processed.');
        }

        $success = $pendingSale->complete(auth()->user());

        if ($success) {
            return back()->with('success', "Transaction {$pendingSale->transaction_id} completed successfully!");
        } else {
            return back()->with('error', "Failed to complete transaction {$pendingSale->transaction_id}. Please check stock and member status.");
        }
    }

    /**
     * Cancel a pending transaction.
     */
    public function cancel(PendingSale $pendingSale): RedirectResponse
    {
        if (! $pendingSale->isPending()) {
            return back()->with('error', 'This transaction has already been processed.');
        }

        $success = $pendingSale->cancel();

        if ($success) {
            return back()->with('success', "Transaction {$pendingSale->transaction_id} cancelled successfully!");
        } else {
            return back()->with('error', "Failed to cancel transaction {$pendingSale->transaction_id}.");
        }
    }
}
