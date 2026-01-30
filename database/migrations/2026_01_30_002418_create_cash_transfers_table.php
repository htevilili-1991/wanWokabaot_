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
        Schema::create('cash_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from_cash_box_id')->constrained('cash_boxes');
            $table->foreignId('to_cash_box_id')->constrained('cash_boxes');
            $table->decimal('amount', 15, 2);
            $table->string('reference_number')->unique(); // For tracking
            $table->text('reason')->nullable(); // e.g., "End of day transfer", "Security transfer"
            $table->foreignId('transferred_by')->constrained('users'); // Who made the transfer
            $table->foreignId('approved_by')->nullable()->constrained('users'); // Who approved (if required)
            $table->timestamp('transferred_at');
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_transfers');
    }
};
