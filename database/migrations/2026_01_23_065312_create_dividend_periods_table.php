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
        Schema::create('dividend_periods', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "2026 Dividend Period"
            $table->date('start_date');
            $table->date('end_date');
            $table->decimal('total_profit', 15, 2)->default(0); // Total profit for the period
            $table->decimal('dividend_rate', 5, 2)->default(0); // Percentage rate (e.g., 5.00 for 5%)
            $table->decimal('total_dividends', 15, 2)->default(0); // Calculated total dividends
            $table->enum('status', ['draft', 'calculated', 'approved', 'paid'])->default('draft');
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->timestamp('calculated_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['start_date', 'end_date']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dividend_periods');
    }
};
