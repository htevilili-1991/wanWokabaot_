import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, MapPin, Phone, Mail, User, Package, ShoppingCart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { show as locationsIndex } from '@/routes/locations';
import { edit } from '@/routes/locations';
import { type BreadcrumbItem } from '@/types';

interface Location {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    manager_name: string | null;
    opening_hours: Record<string, string> | null;
    products_count: number;
    pending_sales_count: number;
    created_at: string;
    updated_at: string;
    products: Array<{
        id: number;
        name: string;
        category: string;
        current_stock: number;
        selling_price: number;
    }>;
    users: Array<{
        id: number;
        name: string;
        email: string;
        roles: Array<{
            name: string;
        }>;
        pivot: {
            is_primary: boolean;
        };
    }>;
}

interface LocationShowProps {
    location: Location;
}

export default function LocationShow({ location }: LocationShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: '/settings/profile',
        },
        {
            title: 'Locations',
            href: locationsIndex(),
        },
        {
            title: location.name,
            href: `/settings/locations/${location.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${location.name} - Location Details`} />

            <SettingsLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">{location.name}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Location details and assigned resources
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" asChild>
                                <a href={edit(location.id)}>
                                    Edit Location
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Location Info Cards */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Basic Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Location Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Address</label>
                                    <p className="text-sm">{location.address || 'No address specified'}</p>
                                </div>

                                {location.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">{location.phone}</span>
                                    </div>
                                )}

                                {location.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-400" />
                                        <span className="text-sm">{location.email}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <Badge variant={location.is_active ? 'default' : 'secondary'}>
                                        {location.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Manager & Hours */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Management & Hours
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {location.manager_name && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Manager</label>
                                        <p className="text-sm">{location.manager_name}</p>
                                    </div>
                                )}

                                {location.opening_hours && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Opening Hours</label>
                                        <div className="mt-1 space-y-1">
                                            {Object.entries(location.opening_hours).map(([day, hours]) => (
                                                <div key={day} className="flex justify-between text-sm">
                                                    <span className="capitalize">{day}:</span>
                                                    <span>{hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Statistics */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <Package className="h-8 w-8 text-blue-600" />
                                <div>
                                    <p className="text-2xl font-bold">{location.products_count}</p>
                                    <p className="text-sm text-muted-foreground">Products</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <ShoppingCart className="h-8 w-8 text-green-600" />
                                <div>
                                    <p className="text-2xl font-bold">{location.pending_sales_count}</p>
                                    <p className="text-sm text-muted-foreground">Pending Sales</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="flex items-center gap-4 p-6">
                                <User className="h-8 w-8 text-purple-600" />
                                <div>
                                    <p className="text-2xl font-bold">{location.users.length}</p>
                                    <p className="text-sm text-muted-foreground">Assigned Users</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Assigned Users */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Assigned Users</CardTitle>
                            <CardDescription>
                                Users who have access to this location
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {location.users.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No users assigned to this location.</p>
                            ) : (
                                <div className="space-y-3">
                                    {location.users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-muted-foreground">{user.email}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant={user.pivot.is_primary ? 'default' : 'outline'}>
                                                    {user.pivot.is_primary ? 'Primary' : 'Secondary'}
                                                </Badge>
                                                <div className="flex gap-1">
                                                    {user.roles.map((role) => (
                                                        <Badge key={role.name} variant="outline" className="text-xs">
                                                            {role.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Products */}
                    {location.products.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Products at this Location</CardTitle>
                                <CardDescription>
                                    Recent products available at {location.name}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {location.products.slice(0, 10).map((product) => (
                                        <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-sm text-muted-foreground">{product.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">${product.selling_price}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Stock: {product.current_stock}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {location.products.length > 10 && (
                                        <p className="text-sm text-muted-foreground text-center">
                                            And {location.products.length - 10} more products...
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Timestamps */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                <span>Created: {format(new Date(location.created_at), 'PPP')}</span>
                                <Separator orientation="vertical" className="h-4" />
                                <span>Updated: {format(new Date(location.updated_at), 'PPP')}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}