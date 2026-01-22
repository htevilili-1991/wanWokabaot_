<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }

    return redirect()->route('login');
})->name('home');

// Debug routes (no auth required for testing)
Route::get('/dashboard-debug', function () {
    try {
        $data = [
            'total_members' => App\Models\Member::count(),
            'active_members' => App\Models\Member::where('status', 'Active')->count(),
            'total_products' => App\Models\Product::count(),
            'pending_transactions' => App\Models\PendingSale::where('status', 'pending')->count(),
            'total_unpaid_amount' => App\Models\Member::sum('balance') ?? 0,
            'today_sales' => App\Models\PendingSale::where('status', 'completed')->whereDate('completed_at', today())->sum('subtotal') ?? 0,
            'timestamp' => now()->toISOString(),
        ];

        \Log::info('Debug endpoint called', $data);

        return response()->json($data);
    } catch (\Exception $e) {
        \Log::error('Debug endpoint error: '.$e->getMessage());

        return response()->json([
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ], 500);
    }
});

Route::get('/test-db', function () {
    return response()->json([
        'members' => App\Models\Member::count(),
        'time' => now()->toISOString(),
    ]);
});

// Routes accessible by all authenticated users (Super Admin, Admin, Treasurer, Member)
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    // View-only member routes for Members
    Route::get('members', [App\Http\Controllers\MemberController::class, 'index'])->name('members.index');
    Route::get('members/{member}', [App\Http\Controllers\MemberController::class, 'show'])->name('members.show');

    // View-only inventory routes for Members
    Route::get('inventory', [App\Http\Controllers\InventoryController::class, 'index'])->name('inventory.index');
    Route::get('inventory/{product}', [App\Http\Controllers\InventoryController::class, 'show'])->name('inventory.show');

    // View pending transactions for Members
    Route::get('pending-transactions', [App\Http\Controllers\PendingTransactionsController::class, 'index'])->name('pending-transactions.index');
});

require __DIR__.'/settings.php';

// Admin/Treasurer only routes (full CRUD operations)
Route::middleware(['auth', 'restrict.settings'])->group(function () {
    // Full member management
    Route::get('members/create', [App\Http\Controllers\MemberController::class, 'create'])->name('members.create');
    Route::post('members', [App\Http\Controllers\MemberController::class, 'store'])->name('members.store');
    Route::get('members/{member}/edit', [App\Http\Controllers\MemberController::class, 'edit'])->name('members.edit');
    Route::put('members/{member}', [App\Http\Controllers\MemberController::class, 'update'])->name('members.update');
    Route::delete('members/{member}', [App\Http\Controllers\MemberController::class, 'destroy'])->name('members.destroy');

    // Full inventory management
    Route::get('inventory/create', [App\Http\Controllers\InventoryController::class, 'create'])->name('inventory.create');
    Route::post('inventory', [App\Http\Controllers\InventoryController::class, 'store'])->name('inventory.store');
    Route::get('inventory/{product}/edit', [App\Http\Controllers\InventoryController::class, 'edit'])->name('inventory.edit');
    Route::put('inventory/{product}', [App\Http\Controllers\InventoryController::class, 'update'])->name('inventory.update');
    Route::delete('inventory/{product}', [App\Http\Controllers\InventoryController::class, 'destroy'])->name('inventory.destroy');

    // POS operations
    Route::get('pos', [App\Http\Controllers\POSController::class, 'index'])->name('pos.index');
    Route::get('pos/products', [App\Http\Controllers\POSController::class, 'getProducts'])->name('pos.products');
    Route::post('pos/sale', [App\Http\Controllers\POSController::class, 'processSale'])->name('pos.sale');
    Route::post('pos/save-pending', [App\Http\Controllers\POSController::class, 'savePendingSale'])->name('pos.savePending');

    // Pending transaction management
    Route::post('pending-sales/{pendingSale}/complete', [App\Http\Controllers\POSController::class, 'completePendingSale'])->name('pending-sales.complete');
    Route::post('pending-sales/{pendingSale}/cancel', [App\Http\Controllers\PendingTransactionsController::class, 'cancel'])->name('pending-sales.cancel');
});
