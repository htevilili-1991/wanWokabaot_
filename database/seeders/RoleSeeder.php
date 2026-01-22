<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $treasurerRole = Role::firstOrCreate(['name' => 'Treasurer']);
        $memberRole = Role::firstOrCreate(['name' => 'Member']);

        // Create permissions
        $permissions = [
            // Dashboard permissions
            'view dashboard',

            // Member permissions
            'view members',
            'create members',
            'edit members',
            'delete members',

            // Inventory permissions
            'view inventory',
            'create inventory',
            'edit inventory',
            'delete inventory',

            // Transaction permissions
            'view pending transactions',
            'create pending transactions',
            'complete pending transactions',
            'cancel pending transactions',

            // Settings permissions
            'view settings',
            'edit profile',

            // User management (admin only)
            'view users',
            'create users',
            'edit users',
            'delete users',
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission]);
        }

        // Assign permissions to roles
        // Super Admin - all permissions
        $superAdminRole->syncPermissions($permissions);

        // Admin - most permissions except some sensitive ones
        $adminRole->syncPermissions([
            'view dashboard',
            'view members', 'create members', 'edit members', 'delete members',
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile',
            'view users', 'create users', 'edit users', 'delete users',
        ]);

        // Treasurer - financial permissions
        $treasurerRole->syncPermissions([
            'view dashboard',
            'view members', 'edit members',
            'view inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile',
        ]);

        // Member - view only permissions
        $memberRole->syncPermissions([
            'view dashboard',
            'view members',
            'view inventory',
            'view pending transactions',
            'view settings',
            'edit profile',
        ]);
    }
}
