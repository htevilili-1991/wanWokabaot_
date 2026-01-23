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
        Schema::table('pending_sales', function (Blueprint $table) {
            $table->decimal('total_paid', 10, 2)->default(0)->after('subtotal');
            $table->json('payment_history')->nullable()->after('total_paid');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pending_sales', function (Blueprint $table) {
            $table->dropColumn(['total_paid', 'payment_history']);
        });
    }
};
