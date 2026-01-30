import { router, usePage } from '@inertiajs/react';
import { Bell, Moon, Settings, ShoppingCart, Sun, User } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { index as inventoryIndex } from '@/routes/inventory';
import { index as posIndex } from '@/routes/pos';
import { edit as profileEdit } from '@/routes/profile';
import { index as systemIndex } from '@/routes/system';
import { logout } from '@/routes';
import { type BreadcrumbItem as BreadcrumbItemType, type SharedData } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const getInitials = useInitials();

    const [pendingCartCount, setPendingCartCount] = useState(0);
    const [lowStockItems, setLowStockItems] = useState<
        Array<{ id: number; name: string; current_stock: number; minimum_stock: number; category: string }>
    >([]);

    const inventoryOutOfStockFirstUrl = useMemo(() => {
        return inventoryIndex({
            query: {
                sort_by: 'current_stock',
                sort_direction: 'asc',
            },
        }).url;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const computePending = () => {
            try {
                const raw = localStorage.getItem('pos_carts');
                const carts = raw ? JSON.parse(raw) : [];
                const count = Array.isArray(carts)
                    ? carts.filter((c: any) => Array.isArray(c?.items) && c.items.length > 0).length
                    : 0;
                setPendingCartCount(count);
            } catch {
                setPendingCartCount(0);
            }
        };

        computePending();

        // Also refresh periodically (same-tab updates don't trigger storage events)
        const t = window.setInterval(computePending, 2_000);

        const onStorage = (e: StorageEvent) => {
            if (e.key === 'pos_carts') computePending();
        };
        window.addEventListener('storage', onStorage);

        return () => {
            window.clearInterval(t);
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const fetchLowStock = async () => {
            try {
                const res = await fetch('/inventory/low-stock?limit=6', {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        Accept: 'application/json',
                    },
                });
                if (!res.ok) return;
                const json = await res.json();
                setLowStockItems(Array.isArray(json?.items) ? json.items : []);
            } catch {
                // ignore
            }
        };

        fetchLowStock();
        const t = window.setInterval(fetchLowStock, 60_000);
        return () => window.clearInterval(t);
    }, []);

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 min-w-0">
                <SidebarTrigger className="-ml-1 h-9 w-9 rounded-lg border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 shadow-sm hover:shadow-md" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-1">
                {/* Settings Gear */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-9 w-9">
                            <Settings className="size-5 opacity-80" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <button
                            type="button"
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded"
                            onClick={() => router.visit(profileEdit().url)}
                        >
                            Profile Settings
                        </button>
                        <button
                            type="button"
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-accent rounded"
                            onClick={() => router.visit(systemIndex().url)}
                        >
                            System Settings
                        </button>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Pending carts (POS) */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9"
                    onClick={() => router.visit(posIndex().url)}
                >
                    <ShoppingCart className="size-5 opacity-80" />
                    {pendingCartCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] leading-4 text-center">
                            {pendingCartCount > 9 ? '9+' : pendingCartCount}
                        </span>
                    )}
                </Button>

                {/* Low stock notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-9 w-9">
                            <Bell className="size-5 opacity-80" />
                            {lowStockItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80" align="end">
                        <div className="px-2 py-1.5 text-sm font-medium">Low stock</div>
                        <div className="max-h-64 overflow-auto">
                            {lowStockItems.length === 0 ? (
                                <div className="px-2 py-4 text-sm text-muted-foreground">
                                    No low stock items
                                </div>
                            ) : (
                                lowStockItems.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded"
                                        onClick={() => router.visit(inventoryOutOfStockFirstUrl)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{p.name}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {p.current_stock}/{p.minimum_stock}
                                            </span>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{p.category}</div>
                                    </button>
                                ))
                            )}
                        </div>
                        <div className="border-t border-border mt-1 pt-1">
                            <button
                                type="button"
                                className="w-full text-left px-2 py-2 text-sm hover:bg-accent rounded"
                                onClick={() => router.visit(inventoryOutOfStockFirstUrl)}
                            >
                                View inventory (out of stock first)
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme toggle */}
                <Button variant="ghost" size="icon" className="h-9 w-9" onClick={toggleTheme}>
                    {resolvedAppearance === 'dark' ? (
                        <Sun className="size-5 opacity-80" />
                    ) : (
                        <Moon className="size-5 opacity-80" />
                    )}
                </Button>

                {/* Profile dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-9 w-9">
                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white text-lg">
                                    {user?.avatar || (user?.name ? getInitials(user.name) : <User className="h-4 w-4" />)}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <div className="px-2 py-1.5 text-sm font-medium">
                            {user?.name}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.visit(profileEdit().url)}>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full cursor-pointer"
                                onClick={() => router.visit(logout().url)}
                            >
                                Log out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
