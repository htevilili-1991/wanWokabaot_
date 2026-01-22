<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create Super Admin role if it doesn't exist
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);

        // Create Super Admin user if it doesn't exist
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@wanwokabaot.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Assign Super Admin role to the user
        if (! $superAdmin->hasRole('Super Admin')) {
            $superAdmin->assignRole($superAdminRole);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove Super Admin role from user (but don't delete the user)
        $superAdmin = User::where('email', 'admin@wanwokabaot.com')->first();
        if ($superAdmin && $superAdmin->hasRole('Super Admin')) {
            $superAdmin->removeRole('Super Admin');
        }

        // Optionally remove the role itself
        $role = Role::where('name', 'Super Admin')->first();
        if ($role) {
            $role->delete();
        }
    }
};
