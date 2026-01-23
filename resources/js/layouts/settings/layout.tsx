import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useActiveUrl } from '@/hooks/use-active-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { index as rolesPermissionsIndex } from '@/routes/roles-permissions';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { index } from '@/routes/users';
import { index as systemIndex } from '@/routes/system';
import { index as locationsIndex } from '@/routes/locations';
import { type NavItem, type SharedData, type User } from '@/types';

// Define settings menu items with required permissions
const allSidebarNavItems: Array<NavItem & { permissions?: string[] }> = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
        permissions: ['edit profile'], // All authenticated users
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: null,
        permissions: ['edit profile'], // All authenticated users
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
        icon: null,
        permissions: ['edit profile'], // All authenticated users
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
        permissions: ['edit profile'], // All authenticated users
    },
    {
        title: 'User Management',
        href: index(),
        icon: null,
        permissions: ['view users'], // Super Admin only
    },
    {
        title: 'Roles & Permissions',
        href: rolesPermissionsIndex(),
        icon: null,
        permissions: ['view users'], // Super Admin only
    },
    {
        title: 'System',
        href: systemIndex(),
        icon: null,
        permissions: ['view settings'], // Admin level
    },
    {
        title: 'Locations',
        href: locationsIndex(),
        icon: null,
        permissions: ['view users'], // Super Admin only for location management
    },
];

// Helper function to check if user has required permissions
function hasPermission(user: User | undefined, requiredPermissions: string[]): boolean {
    if (!user || !user.roles) return false;

    // Super Admin has all permissions
    if (user.roles.some(role => role.name === 'Super Admin')) {
        return true;
    }

    // Check if user has any of the required permissions
    const rolePermissions: Record<string, string[]> = {
        'Admin': [
            'view dashboard', 'view members', 'create members', 'edit members', 'delete members',
            'view inventory', 'create inventory', 'edit inventory', 'delete inventory',
            'view pending transactions', 'create pending transactions', 'complete pending transactions', 'cancel pending transactions',
            'view settings', 'edit profile'
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
            'view settings', 'edit profile'
        ],
        'Member': [
            'view dashboard', 'view members', 'view inventory', 'view pending transactions',
            'view settings', 'edit profile'
        ],
    };

    return user.roles.some(role => {
        const rolePerms = rolePermissions[role.name] || [];
        return requiredPermissions.some(perm => rolePerms.includes(perm));
    });
}

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { urlIsActive } = useActiveUrl();
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    // Filter menu items based on user permissions
    const sidebarNavItems = allSidebarNavItems.filter(item => {
        // If no permissions required, show to all authenticated users
        if (!item.permissions || item.permissions.length === 0) {
            return true;
        }

        // Check if user has required permissions
        return hasPermission(user, item.permissions);
    });

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav
                        className="flex flex-col space-y-1 space-x-0"
                        aria-label="Settings"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': urlIsActive(item.href),
                                })}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="h-4 w-4" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
