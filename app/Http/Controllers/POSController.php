<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\PendingSale;
use App\Models\Product;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $products = Product::select('id', 'name', 'selling_price', 'current_stock')
            ->where('current_stock', '>', 0)
            ->get();

        $members = Member::select('id', 'name', 'balance')
            ->where('status', 'Active')
            ->get();

        return Inertia::render('POS/Index', [
            'products' => $products,
            'members' => $members,
        ]);
    }

    /**
     * Get products data for AJAX refresh.
     */
    public function getProducts()
    {
        $products = Product::select('id', 'name', 'selling_price', 'current_stock')
            ->where('current_stock', '>', 0)
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function processSale(Request $request): RedirectResponse
    {
        $request->validate([
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'member_id' => 'nullable|exists:members,id',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,pay_later',
        ]);

        $total = $request->input('total');
        $memberId = $request->input('member_id');
        $paymentMethod = $request->input('payment_method');

        // Check member balance if paying later
        if ($memberId && $paymentMethod === 'pay_later') {
            $member = Member::find($memberId);
            $creditLimit = Setting::getCreditLimit();
            if ($member->balance >= $creditLimit) {
                return back()->with('error', "Member cannot purchase: unpaid amount is {$creditLimit} VT or more.");
            }
            $member->balance += $total;
            $member->save();
        }

        // Update stock levels
        foreach ($request->input('cart') as $item) {
            $product = Product::find($item['id']);

            // Double check stock availability
            if ($product->current_stock < $item['quantity']) {
                return back()->with('error', "Insufficient stock for {$product->name}. Available: {$product->current_stock}");
            }

            $product->current_stock -= $item['quantity'];
            $product->save();
        }

        return back()->with('success', 'Sale processed successfully!');
    }

    /**
     * Save a pending sale transaction without processing.
     */
    public function savePendingSale(Request $request): RedirectResponse
    {
        $request->validate([
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
            'member_id' => 'nullable|exists:members,id',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,pay_later',
            'notes' => 'nullable|string|max:500',
        ]);

        $cart = $request->input('cart');
        $total = $request->input('total');
        $memberId = $request->input('member_id');
        $paymentMethod = $request->input('payment_method');

        // Validate stock availability (but don't deduct yet)
        foreach ($cart as $item) {
            $product = Product::find($item['id']);
            if ($product->current_stock < $item['quantity']) {
                return back()->with('error', "Insufficient stock for {$product->name}. Available: {$product->current_stock}");
            }
        }

        // Check member status and credit limit if specified
        if ($memberId) {
            $member = Member::find($memberId);
            if ($member->status !== 'Active') {
                return back()->with('error', 'Cannot create pending sale for inactive member.');
            }

            // Update member balance immediately for pay later transactions
            if ($paymentMethod === 'pay_later') {
                $creditLimit = Setting::getCreditLimit();
                if ($member->balance >= $creditLimit) {
                    return back()->with('error', "Member cannot purchase: unpaid amount is {$creditLimit} VT or more.");
                }
                $member->balance += $total;
                $member->save();
            }
        } elseif ($paymentMethod === 'pay_later') {
            return back()->with('error', 'Pay later option requires selecting a member.');
        }

        // Prepare items data with product details
        $items = collect($cart)->map(function ($item) {
            $product = Product::find($item['id']);

            return [
                'product_id' => $product->id,
                'name' => $product->name,
                'quantity' => $item['quantity'],
                'unit_price' => $product->selling_price,
                'total' => $product->selling_price * $item['quantity'],
            ];
        })->toArray();

        // Create pending sale
        PendingSale::create([
            'member_id' => $memberId,
            'created_by' => Auth::id(),
            'items' => $items,
            'subtotal' => $total,
            'payment_method' => $paymentMethod,
            'notes' => $request->input('notes'),
        ]);

        return back()->with('success', 'Transaction saved as pending. Items can now be handed over.');
    }

    /**
     * Complete a pending sale transaction.
     */
    public function completePendingSale(Request $request, PendingSale $pendingSale): RedirectResponse
    {
        if (! $pendingSale->isPending()) {
            return back()->with('error', 'This transaction has already been processed.');
        }

        // Attempt to complete the sale
        $success = $pendingSale->complete(Auth::user());

        if ($success) {
            return back()->with('success', 'Transaction completed successfully!');
        } else {
            return back()->with('error', 'Failed to complete transaction. Please check stock and member status.');
        }
    }
}
