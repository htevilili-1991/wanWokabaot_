<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create permissions
        $permissions = [
            // Dashboard
            'view dashboard',

            // Member management
            'view members',
            'create members',
            'edit members',
            'delete members',

            // Inventory management
            'view inventory',
            'create inventory',
            'edit inventory',
            'delete inventory',

            // Transaction management
            'view pending transactions',
            'create pending transactions',
            'complete pending transactions',
            'cancel pending transactions',

            // Settings/Profile
            'view settings',
            'edit profile',

            // System settings (Admin+ only)
            'view system',
            'edit system',

            // User management (Super Admin only)
            'view users',
            'create users',
            'edit users',
            'delete users',

            // Role management (Super Admin only)
            'view roles',
            'create roles',
            'edit roles',
            'delete roles',

            // Location management (Super Admin only)
            'view locations',
            'create locations',
            'edit locations',
            'delete locations',
            'toggle locations',

            // Reports
            'view reports',
            'generate reports',

            // Dividends
            'view dividends',
            'create dividends',
            'edit dividends',
            'delete dividends',
            'calculate dividends',
            'approve dividends',
            'pay dividends',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create roles and assign permissions
        $this->createRolesAndAssignPermissions();
    }

    /**
     * Create roles and assign appropriate permissions.
     */
    private function createRolesAndAssignPermissions(): void
    {
        // Ensure Super Admin role exists with all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        $allPermissions = Permission::all();
        $superAdminRole->syncPermissions($allPermissions);

        // Ensure Admin role exists
        $adminRole = Role::firstOrCreate(['name' => 'Admin']);
        $adminPermissions = [
            'view dashboard',
            'view members', 'create members', 'edit members', 'delete members',
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile',
            'view system', 'edit system',
            'view reports', 'generate reports',
            'view dividends', 'create dividends', 'edit dividends', 'delete dividends', 'calculate dividends', 'approve dividends', 'pay dividends',
        ];
        $adminRole->syncPermissions($adminPermissions);

        // Create Treasurer role
        $treasurerRole = Role::firstOrCreate(['name' => 'Treasurer']);
        $treasurerPermissions = [
            'view dashboard',
            'view members', 'edit members', // Can view and edit member info
            'view inventory', // Can view inventory levels
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions', // Full transaction management
            'view settings', 'edit profile',
            'view reports', 'generate reports', // Can generate financial reports
            'view dividends', 'create dividends', 'edit dividends', 'calculate dividends', 'approve dividends', 'pay dividends', // Full dividend management
        ];
        $treasurerRole->syncPermissions($treasurerPermissions);

        // Create Cashier role
        $cashierRole = Role::firstOrCreate(['name' => 'Cashier']);
        $cashierPermissions = [
            'view dashboard',
            'view members', 'edit members', // Can view and edit member info for transactions
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory', // Full inventory management
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions', // Full transaction processing
            'view settings', 'edit profile',
        ];
        $cashierRole->syncPermissions($cashierPermissions);

        // Create Member role
        $memberRole = Role::firstOrCreate(['name' => 'Member']);
        $memberPermissions = [
            'view dashboard',
            'view members', // Can view their own member info
            'view inventory', // Can view available products
            'view pending transactions', // Can view their own transactions
            'view settings', 'edit profile', // Can manage their profile
            'view dividends', // Can view their own dividend history
        ];
        $memberRole->syncPermissions($memberPermissions);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove roles
        Role::whereIn('name', ['Treasurer', 'Cashier', 'Member'])->delete();

        // Remove permissions (optional - only remove the ones we created)
        $permissionsToRemove = [
            'view dashboard', 'view members', 'create members', 'edit members', 'delete members',
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile', 'view system', 'edit system',
            'view users', 'create users', 'edit users', 'delete users',
            'view roles', 'create roles', 'edit roles', 'delete roles',
            'view locations', 'create locations', 'edit locations', 'delete locations', 'toggle locations',
            'view reports', 'generate reports',
            'view dividends', 'create dividends', 'edit dividends', 'delete dividends', 'calculate dividends', 'approve dividends', 'pay dividends',
        ];

        foreach ($permissionsToRemove as $permission) {
            Permission::where('name', $permission)->delete();
        }
    }
};
