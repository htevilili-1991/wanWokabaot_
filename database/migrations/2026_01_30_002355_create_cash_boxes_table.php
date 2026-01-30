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
        Schema::create('cash_boxes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., "Kitchen Cash Box", "Main Vault"
            $table->string('location')->nullable(); // e.g., "Kitchen", "Office"
            $table->text('description')->nullable();
            $table->decimal('current_balance', 15, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_primary')->default(false); // Primary cash box for daily operations
            $table->json('opening_hours')->nullable(); // For when cash is accessible
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cash_boxes');
    }
};
