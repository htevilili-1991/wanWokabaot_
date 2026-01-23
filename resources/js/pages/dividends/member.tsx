import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, Calendar, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Dividend {
    id: number;
    dividend_period: {
        name: string;
        start_date: string;
        end_date: string;
        dividend_rate: number;
    };
    total_purchases: number;
    calculated_dividend: number;
    paid_amount: number;
    status: 'pending' | 'approved' | 'paid' | 'cancelled';
    approved_at: string | null;
    paid_at: string | null;
    payments: Array<{
        id: number;
        payment_method: string;
        amount: number;
        payment_date: string;
        reference: string | null;
        processed_by: {
            name: string;
        };
    }>;
}

interface MemberDividendsProps {
    dividends: Dividend[];
    message?: string;
}

export default function MemberDividends({ dividends, message }: MemberDividendsProps) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'My Dividends', href: route('dividends.member') },
    ];

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'secondary',
            approved: 'warning',
            paid: 'success',
            cancelled: 'destructive'
        } as const;

        const labels = {
            pending: 'Pending',
            approved: 'Approved',
            paid: 'Paid',
            cancelled: 'Cancelled'
        };

        return (
            <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
                {labels[status as keyof typeof labels] || status}
            </Badge>
        );
    };

    const getPaymentMethodLabel = (method: string) => {
        const labels = {
            cash: 'Cash',
            credit: 'Credit to Account',
            bank_transfer: 'Bank Transfer'
        };
        return labels[method as keyof typeof labels] || method;
    };

    const formatCurrency = (amount: number) => {
        return `VT ${amount.toLocaleString('en-VU', { minimumFractionDigits: 2 })}`;
    };

    const totalEarned = dividends.reduce((sum, dividend) => sum + dividend.calculated_dividend, 0);
    const totalPaid = dividends.reduce((sum, dividend) => sum + dividend.paid_amount, 0);
    const totalPending = totalEarned - totalPaid;

    if (message) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="My Dividends" />

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Dividends</h1>
                        <p className="text-muted-foreground">
                            View your dividend history and earnings from the cooperative.
                        </p>
                    </div>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-medium">{message}</h3>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head title="My Dividends" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Dividends</h1>
                    <p className="text-muted-foreground">
                        View your dividend history and earnings from the cooperative.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalEarned)}</div>
                            <p className="text-xs text-muted-foreground">
                                All-time dividend earnings
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalPaid)}</div>
                            <p className="text-xs text-muted-foreground">
                                Amount received so far
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{formatCurrency(totalPending)}</div>
                            <p className="text-xs text-muted-foreground">
                                Amount awaiting payment
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Dividend History</CardTitle>
                        <CardDescription>
                            Your dividend earnings from different periods.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Date Range</TableHead>
                                    <TableHead>Your Purchases</TableHead>
                                    <TableHead>Earned</TableHead>
                                    <TableHead>Paid</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dividends.map((dividend) => (
                                    <TableRow key={dividend.id}>
                                        <TableCell className="font-medium">
                                            {dividend.dividend_period.name}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(dividend.dividend_period.start_date).toLocaleDateString()} - {new Date(dividend.dividend_period.end_date).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>{formatCurrency(dividend.total_purchases)}</TableCell>
                                        <TableCell className="text-green-600 font-medium">
                                            {formatCurrency(dividend.calculated_dividend)}
                                        </TableCell>
                                        <TableCell className="text-blue-600">
                                            {formatCurrency(dividend.paid_amount)}
                                        </TableCell>
                                        <TableCell>{getStatusBadge(dividend.status)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {dividends.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-medium">No dividend history yet</h3>
                                <p>Your dividend earnings will appear here once calculated for upcoming periods.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {dividends.some(d => d.payments.length > 0) && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment History</CardTitle>
                            <CardDescription>
                                Details of dividend payments you've received.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Period</TableHead>
                                        <TableHead>Payment Date</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Reference</TableHead>
                                        <TableHead>Processed By</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dividends
                                        .filter(d => d.payments.length > 0)
                                        .flatMap(dividend =>
                                            dividend.payments.map(payment => ({
                                                ...payment,
                                                period: dividend.dividend_period.name
                                            }))
                                        )
                                        .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())
                                        .map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell>{payment.period}</TableCell>
                                                <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                                                <TableCell>{getPaymentMethodLabel(payment.payment_method)}</TableCell>
                                                <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                                                <TableCell>{payment.reference || '-'}</TableCell>
                                                <TableCell>{payment.processed_by.name}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
}