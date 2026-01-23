<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(RoleSeeder::class);
        $this->call(SettingsSeeder::class);
        $this->call(LocationSeeder::class);
        $this->call(MemberSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(PendingSaleSeeder::class);
        $this->call(UserRoleSeeder::class);
        $this->call(UserLocationSeeder::class);

        // Create Super Admin user if it doesn't exist
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@wanwokabaot.com'],
            [
                'name' => 'Super Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
                'email_verified_at' => now(),
            ]
        );

        // Assign Super Admin role
        if (! $superAdmin->hasRole('Super Admin')) {
            $superAdmin->assignRole('Super Admin');
        }
    }
}
