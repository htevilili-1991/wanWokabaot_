import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { index } from '@/routes/locations';
import { update } from '@/routes/locations';
import { type BreadcrumbItem } from '@/types';

const DAYS_OF_WEEK = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

interface Location {
    id: number;
    name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    is_active: boolean;
    manager_name: string | null;
    opening_hours: Record<string, string> | null;
}

interface LocationEditProps {
    location: Location;
}

export default function LocationEdit({ location }: LocationEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: location.name,
        address: location.address || '',
        phone: location.phone || '',
        email: location.email || '',
        manager_name: location.manager_name || '',
        is_active: location.is_active,
        opening_hours: location.opening_hours || {},
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(update(location.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: '/settings/profile',
        },
        {
            title: 'Locations',
            href: index(),
        },
        {
            title: location.name,
            href: `/settings/locations/${location.id}`,
        },
        {
            title: 'Edit',
            href: `/settings/locations/${location.id}/edit`,
        },
    ];

    const updateOpeningHour = (day: string, hours: string) => {
        setData('opening_hours', {
            ...data.opening_hours,
            [day]: hours,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${location.name}`} />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium">Edit Location</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Update information for {location.name}.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>
                                        Essential details about the location
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Location Name *</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Main Store, Downtown Branch"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="manager_name">Manager Name</Label>
                                        <Input
                                            id="manager_name"
                                            type="text"
                                            value={data.manager_name}
                                            onChange={(e) => setData('manager_name', e.target.value)}
                                            placeholder="Store manager's name"
                                        />
                                        {errors.manager_name && (
                                            <p className="text-sm text-red-600">{errors.manager_name}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <Label htmlFor="is_active">Active Location</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                    <CardDescription>
                                        How customers can reach this location
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Full address of the location"
                                        />
                                        {errors.address && (
                                            <p className="text-sm text-red-600">{errors.address}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+1-555-0123"
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="location@company.com"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Opening Hours */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Opening Hours</CardTitle>
                                <CardDescription>
                                    Set the operating hours for this location (optional)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {DAYS_OF_WEEK.map((day) => (
                                        <div key={day} className="flex items-center gap-4">
                                            <Label className="w-20 capitalize">{day}:</Label>
                                            <Input
                                                type="text"
                                                value={data.opening_hours[day] || ''}
                                                onChange={(e) => updateOpeningHour(day, e.target.value)}
                                                placeholder="9:00-17:00"
                                                className="flex-1"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.opening_hours && (
                                    <p className="text-sm text-red-600 mt-2">{errors.opening_hours}</p>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-4">
                            <Button type="button" variant="outline" asChild>
                                <a href={index()}>Cancel</a>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Location'}
                            </Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}