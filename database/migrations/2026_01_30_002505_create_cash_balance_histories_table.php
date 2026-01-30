<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cash_balance_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cash_box_id')->constrained('cash_boxes');
            $table->decimal('old_balance', 15, 2);
            $table->decimal('new_balance', 15, 2);
            $table->decimal('difference', 15, 2); // Positive for increase, negative for decrease
            $table->string('transaction_type'); // 'transfer_in', 'transfer_out', 'sale', 'expense', 'adjustment'
            $table->text('reason')->nullable();
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->morphs('transactionable'); // Polymorphic relation to any model (CashTransfer, Sale, etc.)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_balance_histories');
    }
};
