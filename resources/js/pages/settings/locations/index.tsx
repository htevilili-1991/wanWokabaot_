import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { index as locationsIndex } from '@/routes/locations';
import { create } from '@/routes/locations';
import { edit } from '@/routes/locations';
import { show } from '@/routes/locations';
import { toggle } from '@/routes/locations';
import { destroy } from '@/routes/locations';
import { edit as profileEdit } from '@/routes/profile';
import { DeleteConfirmationPopover } from '@/components/delete-confirmation-popover';
import { type BreadcrumbItem } from '@/types';
import { Plus, Eye, Edit, Trash2, ToggleLeft, ToggleRight, MapPin, Package, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Location {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    manager_name: string | null;
    products_count: number;
    pending_sales_count: number;
    created_at: string;
}

interface LocationsIndexProps {
    locations: Location[];
}

export default function LocationsIndex({ locations }: LocationsIndexProps) {
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState<Location | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: profileEdit(),
        },
        {
            title: 'Locations',
            href: locationsIndex(),
        },
    ];

    const handleDelete = (location: Location) => {
        setLocationToDelete(location);
        setDeletePopoverOpen(true);
    };

    const confirmDelete = () => {
        if (locationToDelete) {
            router.delete(destroy(locationToDelete.id).url, {
                onSuccess: () => {
                    setDeletePopoverOpen(false);
                    setLocationToDelete(null);
                },
                onError: () => {
                    setDeletePopoverOpen(false);
                    setLocationToDelete(null);
                },
            });
        }
    };

    const handleToggle = (location: Location) => {
        router.patch(toggle(location.id).url, {}, {
            onSuccess: () => {
                // Status will be updated via page refresh
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Locations Management" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-medium">Store Locations</h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Manage multiple store locations and their inventory.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href={create()}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Location
                            </Link>
                        </Button>
                    </div>

                    {locations.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-medium mb-2">No locations yet</h3>
                                <p className="text-muted-foreground text-center mb-4">
                                    Get started by adding your first store location.
                                </p>
                                <Button asChild>
                                    <Link href={create()}>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add First Location
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {locations.map((location) => (
                                <Card key={location.id} className="relative">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-base">{location.name}</CardTitle>
                                                <CardDescription className="mt-1">
                                                    {location.address || 'No address specified'}
                                                </CardDescription>
                                            </div>
                                            <Badge variant={location.is_active ? 'default' : 'secondary'}>
                                                {location.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center text-muted-foreground">
                                                <Package className="h-4 w-4 mr-1" />
                                                {location.products_count} products
                                            </div>
                                            <div className="flex items-center text-muted-foreground">
                                                <ShoppingCart className="h-4 w-4 mr-1" />
                                                {location.pending_sales_count} sales
                                            </div>
                                        </div>

                                        {(location.phone || location.email) && (
                                            <div className="text-sm text-muted-foreground">
                                                {location.phone && <div>📞 {location.phone}</div>}
                                                {location.email && <div>✉️ {location.email}</div>}
                                            </div>
                                        )}

                                        {location.manager_name && (
                                            <div className="text-sm text-muted-foreground">
                                                👤 Manager: {location.manager_name}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <div className="flex space-x-1">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={show(location.id)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={edit(location.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleToggle(location)}
                                                >
                                                    {location.is_active ? (
                                                        <ToggleRight className="h-4 w-4 text-green-600" />
                                                    ) : (
                                                        <ToggleLeft className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </Button>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDelete(location)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </SettingsLayout>

            <DeleteConfirmationPopover
                isOpen={deletePopoverOpen}
                onClose={() => {
                    setDeletePopoverOpen(false);
                    setLocationToDelete(null);
                }}
                onConfirm={confirmDelete}
                itemName={locationToDelete?.name || ''}
            />
        </AppLayout>
    );
}