import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CreditCard, Clock, CheckCircle, DollarSign, Home, LayoutGrid, Package, Users } from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as membersIndex } from '@/routes/members';
import { index as inventoryIndex } from '@/routes/inventory';
import { index as posIndex } from '@/routes/pos';
import { index as transactionsIndex } from '@/routes/transactions';
import { index as reportsIndex } from '@/routes/reports';
import { index as dividendsIndex, member as dividendsMember } from '@/routes/dividends';
import { type NavItem, type SharedData, type User } from '@/types';

import AppLogo from './app-logo';

// Define menu items with required permissions
const allMainNavItems: Array<NavItem & { permissions?: string[] }> = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
        permissions: ['view dashboard'],
    },
    {
        title: 'Members',
        href: membersIndex(),
        icon: Users,
        permissions: ['view members'],
    },
    {
        title: 'Inventory',
        href: inventoryIndex(),
        icon: Package,
        permissions: ['view inventory'],
    },
    {
        title: 'POS',
        href: posIndex(),
        icon: CreditCard,
        permissions: ['create pending transactions'], // POS requires transaction creation
    },
    {
        title: 'Transactions',
        href: transactionsIndex(), // Default to completed transactions
        icon: Clock,
        permissions: ['view pending transactions'],
    },
    {
        title: 'Reports',
        href: reportsIndex(),
        icon: BookOpen,
        permissions: ['view dashboard'], // Reports require dashboard access
    },
    {
        title: 'Dividends',
        href: dividendsIndex(),
        icon: DollarSign,
        permissions: ['view dividends'], // Admin/Treasurer dividend management
    },
    {
        title: 'My Dividends',
        href: dividendsMember(),
        icon: DollarSign,
        permissions: ['view dividends'], // Member dividend view
    },
];

const footerNavItems: NavItem[] = [
    /*{
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },*/
];

// Helper function to check if user has required permissions
function hasPermission(user: User | undefined, requiredPermissions: string[]): boolean {
    if (!user || !user.roles) {
        return false;
    }

    // Super Admin has all permissions
    const isSuperAdmin = user.roles.some(role => role.name === 'Super Admin');
    if (isSuperAdmin) {
        return true;
    }

    // Check if user has any of the required permissions
    // Note: In a real implementation, you'd check against actual permissions,
    // but for simplicity, we'll use role-based checking for common permissions
    const rolePermissions: Record<string, string[]> = {
        'Admin': [
            'view dashboard', 'view members', 'create members', 'edit members', 'delete members',
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile',
            'view dividends', 'create dividends', 'edit dividends', 'delete dividends', 'calculate dividends', 'approve dividends', 'pay dividends'
        ],
        'Cashier': [
            'view dashboard', 'view members', 'edit members',
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile'
        ],
        'Treasurer': [
            'view dashboard', 'view members', 'edit members',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile',
            'view dividends', 'create dividends', 'edit dividends', 'calculate dividends', 'approve dividends', 'pay dividends'
        ],
        'Member': [
            'view dashboard', 'view members', 'view inventory', 'view pending transactions',
            'view settings', 'edit profile', 'view dividends'
        ],
    };

    return user.roles.some(role => {
        const rolePerms = rolePermissions[role.name] || [];
        return requiredPermissions.some(perm => rolePerms.includes(perm));
    });
}

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    // Filter menu items based on user permissions
    const mainNavItems = allMainNavItems.filter(item => {
        // If no permissions required, show to all authenticated users
        if (!item.permissions || item.permissions.length === 0) {
            return true;
        }

        // Check if user has required permissions
        return hasPermission(user, item.permissions);
    });

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
