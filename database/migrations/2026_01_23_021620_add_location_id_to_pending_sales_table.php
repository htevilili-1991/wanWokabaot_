<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, add the column as nullable
        Schema::table('pending_sales', function (Blueprint $table) {
            $table->foreignId('location_id')->nullable()->after('id')->constrained()->onDelete('cascade');
            $table->index(['location_id']);
            $table->index(['location_id', 'status']);
        });

        // Assign existing pending sales to the default location
        $defaultLocation = DB::table('locations')->where('name', 'Main Store')->first();
        if ($defaultLocation) {
            DB::table('pending_sales')->whereNull('location_id')->update(['location_id' => $defaultLocation->id]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pending_sales', function (Blueprint $table) {
            $table->dropForeign(['location_id']);
            $table->dropColumn('location_id');
        });
    }
};
