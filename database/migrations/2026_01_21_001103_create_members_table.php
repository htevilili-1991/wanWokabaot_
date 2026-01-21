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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable()->unique();
            $table->string('member_code')->nullable()->unique();
            $table->date('join_date');
            $table->string('status'); // Active, Inactive, Suspended
            $table->text('notes')->nullable();
            $table->decimal('total_spent', 10, 2)->default(0);
            $table->decimal('balance', 10, 2)->default(0); // Unpaid amount
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
