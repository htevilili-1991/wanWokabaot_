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
        Schema::create('dividend_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dividend_calculation_id')->constrained()->onDelete('cascade');
            $table->enum('payment_method', ['cash', 'credit', 'bank_transfer'])->default('cash');
            $table->decimal('amount', 15, 2);
            $table->date('payment_date');
            $table->string('reference')->nullable(); // Bank reference, transaction ID, etc.
            $table->text('notes')->nullable();
            $table->foreignId('processed_by')->constrained('users');
            $table->timestamps();

            $table->index(['dividend_calculation_id']);
            $table->index('payment_date');
            $table->index('payment_method');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dividend_payments');
    }
};
