<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = Location::all();

        if ($locations->isEmpty()) {
            return; // Skip if no locations exist
        }

        // Assign Super Admin to all locations
        $superAdmin = User::where('email', 'admin@wanwokabaot.com')->first();
        if ($superAdmin) {
            foreach ($locations as $location) {
                $superAdmin->assignToLocation($location->id, $location->name === 'Main Store');
            }
        }

        // For existing users, assign them to the Main Store by default
        // (This is for backward compatibility with existing users)
        $users = User::where('email', '!=', 'admin@wanwokabaot.com')->get();
        $mainStore = Location::where('name', 'Main Store')->first();

        if ($mainStore) {
            foreach ($users as $user) {
                // Only assign if user doesn't already have locations
                if ($user->locations()->count() === 0) {
                    $user->assignToLocation($mainStore->id, true);
                }
            }
        }

        // Note: Members (users with 'Member' role) will be assigned locations
        // when they are promoted to staff roles like 'Cashier'
    }
}
