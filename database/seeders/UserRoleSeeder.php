<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Assign Member role to all users who correspond to members
        $members = Member::all();

        foreach ($members as $member) {
            $user = User::where('email', $member->email)->first();

            if ($user && ! $user->hasRole('Member')) {
                $user->assignRole('Member');
            }
        }

        // Ensure Super Admin has the correct role
        $superAdmin = User::where('email', 'admin@wanwokabaot.com')->first();
        if ($superAdmin && ! $superAdmin->hasRole('Super Admin')) {
            $superAdmin->assignRole('Super Admin');
        }
    }
}
