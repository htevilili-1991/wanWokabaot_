<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\InventoryImport; # Will create this class later
use App\Exports\ProductsExport; # Will create this class later

class InventoryController extends Controller
{
    /**
     * Display a listing of products.
     */
    public function index(Request $request)
    {
        $query = Product::with('location');

        // Restrict to user's assigned locations if not Admin
        if ($request->has('assigned_location_ids')) {
            $query->whereIn('location_id', $request->assigned_location_ids);
        }

        // Handle search
        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Handle sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if (in_array($sortBy, ['name', 'category', 'cost_price', 'selling_price', 'current_stock', 'minimum_stock', 'created_at'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $products = $query->paginate($request->get('per_page', 10));

        return Inertia::render('inventory/index', [
            'products' => $products,
            'categories' => Category::orderBy('name')->get(),
            'filters' => [
                'search' => $request->search,
                'sort_by' => $sortBy,
                'sort_direction' => $sortDirection,
                'per_page' => $request->per_page,
            ],
        ]);
    }

    /**
     * Return low stock items for notifications.
     */
    public function lowStock(Request $request)
    {
        $limit = (int) $request->get('limit', 5);

        $query = Product::query();

        // Restrict to user's assigned locations if not Admin
        if ($request->has('assigned_location_ids')) {
            $query->whereIn('location_id', $request->assigned_location_ids);
        }

        $items = $query
            ->whereColumn('current_stock', '<=', 'minimum_stock')
            ->orderBy('current_stock', 'asc')
            ->limit($limit)
            ->get(['id', 'name', 'current_stock', 'minimum_stock', 'category']);

        return response()->json([
            'items' => $items,
            'count' => $items->count(),
        ]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('inventory/create');
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'cost_price' => ['required', 'numeric', 'min:0'],
            'selling_price' => ['required', 'numeric', 'min:0'],
            'current_stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $user = $request->user();
        $locationId = null;

        if ($user->hasRole('Admin')) {
            // Admin can choose location, default to their primary location
            $locationId = $user->primaryLocation()?->id ?? $user->locations()->first()?->id;
        } else {
            // For Cashiers/Treasurers, use their primary location
            $locationId = $user->primaryLocation()?->id ?? $user->locations()->first()?->id;
        }

        if (!$locationId) {
            return Redirect::back()->with('error', 'You must be assigned to a location to create products.');
        }

        Product::create(array_merge($validated, ['location_id' => $locationId]));

        return Redirect::route('inventory.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        return Inertia::render('inventory/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        return Inertia::render('inventory/edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'cost_price' => ['required', 'numeric', 'min:0'],
            'selling_price' => ['required', 'numeric', 'min:0'],
            'current_stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['required', 'integer', 'min:0'],
            'description' => ['nullable', 'string'],
        ]);

        $product->update($validated);

        return Redirect::route('inventory.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product.
     */
    public function destroy(Request $request, Product $product = null)
    {
        // If a single product is passed via route model binding
        if ($product) {
            $product->delete();
            return Redirect::route('inventory.index')->with('success', 'Product deleted successfully.');
        }

        // Handle bulk deletion
        $validated = $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['required', 'integer', 'exists:products,id'],
        ]);

        Product::whereIn('id', $validated['ids'])->delete();

        return Redirect::route('inventory.index')->with('success', 'Selected products deleted successfully.');
    }

    /**
     * Import products from an Excel file.
     */
    public function importExcel(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        try {
            Excel::import(new InventoryImport, $request->file('file'));

            return Redirect::back()->with('success', 'Inventory imported successfully!');
        } catch (\Exception $e) {
            return Redirect::back()->with('error', 'Error importing inventory: ' . $e->getMessage());
        }
    }

    /**
     * Export a sample Excel file for inventory import.
     */
    public function exportSampleExcel()
    {
        return Excel::download(new ProductsExport, 'inventory_sample.xlsx');
    }
}
