import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';

interface SystemSettingsProps {
    settings: {
        credit_limit: number;
    };
}

interface FormData {
    credit_limit: number;
}

export default function System({ settings }: SystemSettingsProps) {
    const { data, setData, put, processing, errors } = useForm<FormData>({
        credit_limit: settings.credit_limit,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('settings.system.update'));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Settings',
            href: route('settings.profile.edit'),
        },
        {
            title: 'System',
            href: route('settings.system.index'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="System Settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium">System Settings</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Configure system-wide settings and limits.
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Member Credit Settings</CardTitle>
                                <CardDescription>
                                    Configure credit limits and member financial settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="credit_limit">Credit Limit (VT)</Label>
                                    <Input
                                        id="credit_limit"
                                        type="number"
                                        min="0"
                                        max="100000"
                                        value={data.credit_limit}
                                        onChange={(e) => setData('credit_limit', parseInt(e.target.value) || 0)}
                                        placeholder="Enter credit limit"
                                    />
                                    {errors.credit_limit && (
                                        <p className="text-sm text-red-600">{errors.credit_limit}</p>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                        Maximum unpaid amount allowed for all members. Members cannot make purchases
                                        when their balance reaches or exceeds this limit.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Settings'}
                            </Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}