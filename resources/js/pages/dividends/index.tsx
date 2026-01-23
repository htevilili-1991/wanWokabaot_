import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Calculator, Eye, Edit, Trash2 } from 'lucide-react';
import { index, create } from '@/routes/dividends';
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';

interface DividendPeriod {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    total_profit: number;
    dividend_rate: number;
    total_dividends: number;
    status: 'draft' | 'calculated' | 'approved' | 'paid';
    created_by: {
        name: string;
    };
    created_at: string;
}

interface DividendPeriodsPageProps {
    dividendPeriods: {
        data: DividendPeriod[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

export default function DividendPeriodsIndex({ dividendPeriods, filters }: DividendPeriodsPageProps) {
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Dividends', href: index() },
    ];

    const getStatusBadge = (status: string) => {
        const variants = {
            draft: 'secondary',
            calculated: 'warning',
            approved: 'default',
            paid: 'success'
        } as const;

        const labels = {
            draft: 'Draft',
            calculated: 'Calculated',
            approved: 'Approved',
            paid: 'Paid'
        };

        return (
            <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
                {labels[status as keyof typeof labels] || status}
            </Badge>
        );
    };

    const formatCurrency = (amount: number) => {
        return `VT ${amount.toLocaleString('en-VU', { minimumFractionDigits: 2 })}`;
    };

    const formatPercent = (rate: number) => {
        return `${rate.toFixed(2)}%`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dividend Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dividend Management</h1>
                        <p className="text-muted-foreground">
                            Manage dividend periods and distribute profits to members based on their patronage.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={create()}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Dividend Period
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Periods</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dividendPeriods.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Periods</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {dividendPeriods.data.filter(p => p.status !== 'paid').length}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Dividends Paid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(
                                    dividendPeriods.data
                                        .filter(p => p.status === 'paid')
                                        .reduce((sum, p) => sum + p.total_dividends, 0)
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {dividendPeriods.data.filter(p => p.status === 'calculated').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dividend Periods</CardTitle>
                        <CardDescription>
                            A list of all dividend periods and their current status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {dividendPeriods.data.map((period) => (
                                <div key={period.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium">{period.name}</h3>
                                            {getStatusBadge(period.status)}
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(period.start_date).toLocaleDateString()} - {new Date(period.end_date).toLocaleDateString()}
                                        </p>
                                        <div className="flex gap-4 text-sm">
                                            <span>Total Profit: {formatCurrency(period.total_profit)}</span>
                                            <span>Rate: {formatPercent(period.dividend_rate)}</span>
                                            <span>Total Dividends: {formatCurrency(period.total_dividends)}</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Created by {period.created_by.name} on {new Date(period.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('dividends.show', period.id)}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>

                                        {period.status === 'draft' && (
                                            <>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={route('dividends.edit', period.id)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this dividend period?')) {
                                                            // Handle delete
                                                        }
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}

                                        {period.status === 'draft' && (
                                            <Button
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm('Calculate dividends for this period? This will be based on member purchases.')) {
                                                        // Handle calculate
                                                    }
                                                }}
                                            >
                                                <Calculator className="h-4 w-4 mr-2" />
                                                Calculate
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {dividendPeriods.data.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium">No dividend periods yet</h3>
                                    <p>Create your first dividend period to start distributing profits to members.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}