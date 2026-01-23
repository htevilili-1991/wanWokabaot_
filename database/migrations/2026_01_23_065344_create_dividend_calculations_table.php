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
        Schema::create('dividend_calculations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dividend_period_id')->constrained()->onDelete('cascade');
            $table->foreignId('member_id')->constrained()->onDelete('cascade');
            $table->decimal('total_purchases', 15, 2)->default(0); // Member's total purchases in period
            $table->decimal('calculated_dividend', 15, 2)->default(0); // Calculated dividend amount
            $table->decimal('paid_amount', 15, 2)->default(0); // Amount actually paid
            $table->enum('status', ['pending', 'approved', 'paid', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->unique(['dividend_period_id', 'member_id']); // One calculation per member per period
            $table->index(['member_id', 'status']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dividend_calculations');
    }
};
