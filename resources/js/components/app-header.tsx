import { Link, router, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Menu, Search, Settings, ShoppingCart, Bell, Sun, Moon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserMenuContent } from '@/components/user-menu-content';
import { useActiveUrl } from '@/hooks/use-active-url';
import { useAppearance } from '@/hooks/use-appearance';
import { useInitials } from '@/hooks/use-initials';
import { cn, toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import { index as inventoryIndex } from '@/routes/inventory';
import { index as posIndex } from '@/routes/pos';
import { edit as profileEdit } from '@/routes/profile';
import { index as systemIndex } from '@/routes/system';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';

import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { urlIsActive } = useActiveUrl();

    const { resolvedAppearance, updateAppearance } = useAppearance();

    const [pendingCartCount, setPendingCartCount] = useState(0);
    const [lowStockItems, setLowStockItems] = useState<Array<{ id: number; name: string; current_stock: number; minimum_stock: number; category: string }>>([]);

    const lowStockCount = lowStockItems.length;

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
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'pos_carts') computePending();
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
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
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-[34px] w-[34px]"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation Menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={toUrl(item.href)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="relative flex h-full items-center"
                                    >
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                urlIsActive(item.href) &&
                                                    activeItemStyles,
                                                'h-9 cursor-pointer px-3',
                                            )}
                                        >
                                            {item.icon && (
                                                <item.icon className="mr-2 h-4 w-4" />
                                            )}
                                            {item.title}
                                        </Link>
                                        {urlIsActive(item.href) && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="group h-9 w-9 cursor-pointer"
                            >
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button>
                            <div className="hidden lg:flex">
                                {rightNavItems.map((item) => (
                                    <TooltipProvider
                                        key={item.title}
                                        delayDuration={0}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a
                                                    href={toUrl(item.href)}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <span className="sr-only">
                                                        {item.title}
                                                    </span>
                                                    {item.icon && (
                                                        <item.icon className="size-5 opacity-80 group-hover:opacity-100" />
                                                    )}
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>

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
                                    {lowStockCount > 0 && (
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
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={toggleTheme}
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-5 opacity-80" />
                            ) : (
                                <Moon className="size-5 opacity-80" />
                            )}
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-full p-1"
                                >
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
