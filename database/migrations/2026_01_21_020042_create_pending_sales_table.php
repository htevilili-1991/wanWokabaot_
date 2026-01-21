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
        Schema::create('pending_sales', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->unique(); // Unique transaction identifier
            $table->foreignId('member_id')->nullable()->constrained('members')->onDelete('cascade');
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('completed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->json('items'); // Array of {product_id, name, quantity, unit_price, total}
            $table->decimal('subtotal', 10, 2); // Total before any adjustments
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamp('completed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pending_sales');
    }
};
