<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';

// Member routes
Route::middleware(['auth', 'restrict.settings'])->group(function () {
    Route::resource('members', App\Http\Controllers\MemberController::class);
});

// Inventory routes
Route::middleware(['auth', 'restrict.settings'])->group(function () {
    Route::resource('inventory', App\Http\Controllers\InventoryController::class)->parameters([
        'inventory' => 'product',
    ]);
});

// POS routes
Route::middleware(['auth', 'restrict.settings'])->group(function () {
    Route::get('pos', [App\Http\Controllers\POSController::class, 'index'])->name('pos.index');
    Route::get('pos/products', [App\Http\Controllers\POSController::class, 'getProducts'])->name('pos.products');
    Route::post('pos/sale', [App\Http\Controllers\POSController::class, 'processSale'])->name('pos.sale');
    Route::post('pos/save-pending', [App\Http\Controllers\POSController::class, 'savePendingSale'])->name('pos.savePending');
    Route::get('pending-transactions', [App\Http\Controllers\PendingTransactionsController::class, 'index'])->name('pending-transactions.index');
    Route::post('pending-sales/{pendingSale}/complete', [App\Http\Controllers\POSController::class, 'completePendingSale'])->name('pending-sales.complete');
    Route::post('pending-sales/{pendingSale}/cancel', [App\Http\Controllers\PendingTransactionsController::class, 'cancel'])->name('pending-sales.cancel');
});
