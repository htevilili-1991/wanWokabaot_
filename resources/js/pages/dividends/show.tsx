import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calculator, CheckCircle, CreditCard, DollarSign, Eye, User } from 'lucide-react';
import { index, edit, calculate, approve } from '@/routes/dividends';
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';

interface DividendCalculation {
    id: number;
    member: {
        id: number;
        name: string;
        member_code: string;
    };
    total_purchases: number;
    calculated_dividend: number;
    paid_amount: number;
    status: 'pending' | 'approved' | 'paid' | 'cancelled';
    approved_at: string | null;
    paid_at: string | null;
    notes: string | null;
}

interface DividendPeriod {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    total_profit: number;
    dividend_rate: number;
    total_dividends: number;
    status: 'draft' | 'calculated' | 'approved' | 'paid';
    notes: string | null;
    created_by: {
        name: string;
    };
    created_at: string;
}

interface DividendPeriodShowProps {
    dividendPeriod: DividendPeriod;
    calculations: {
        data: DividendCalculation[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function DividendPeriodShow({ dividendPeriod, calculations }: DividendPeriodShowProps) {
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Dividends', href: index() },
        { title: dividendPeriod.name, href: '' },
    ];

    const [selectedCalculation, setSelectedCalculation] = useState<DividendCalculation | null>(null);
    const [paymentData, setPaymentData] = useState({
        payment_method: 'cash',
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        reference: '',
        notes: '',
    });

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

    const formatCurrency = (amount: number) => {
        return `VT ${amount.toLocaleString('en-VU', { minimumFractionDigits: 2 })}`;
    };

    const handleCalculate = () => {
        if (confirm('Calculate dividends for all members based on their purchases during this period?')) {
            router.post(calculate(dividendPeriod.id), {}, {
                onSuccess: () => {
                    window.location.reload();
                }
            });
        }
    };

    const handleApprove = () => {
        if (confirm('Approve this dividend period for payout?')) {
            router.post(approve(dividendPeriod.id), {}, {
                onSuccess: () => {
                    window.location.reload();
                }
            });
        }
    };

    const handleApproveCalculation = (calculationId: number) => {
        router.post(route('dividend-calculations.approve', calculationId), {}, {
            onSuccess: () => {
                window.location.reload();
            }
        });
    };

    const handlePaymentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCalculation) return;

        router.post(route('dividend-calculations.pay', selectedCalculation.id), paymentData, {
            onSuccess: () => {
                setSelectedCalculation(null);
                setPaymentData({
                    payment_method: 'cash',
                    amount: '',
                    payment_date: new Date().toISOString().split('T')[0],
                    reference: '',
                    notes: '',
                });
                window.location.reload();
            }
        });
    };

    const getRemainingAmount = (calculation: DividendCalculation) => {
        return calculation.calculated_dividend - calculation.paid_amount;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Dividend Period: ${dividendPeriod.name}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href={index()}>
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Dividend Periods
                            </Link>
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        {dividendPeriod.status === 'draft' && (
                            <Button variant="outline" asChild>
                                <Link href={edit(dividendPeriod.id)}>
                                    Edit Period
                                </Link>
                            </Button>
                        )}

                        {dividendPeriod.status === 'draft' && (
                            <Button onClick={handleCalculate}>
                                <Calculator className="h-4 w-4 mr-2" />
                                Calculate Dividends
                            </Button>
                        )}

                        {dividendPeriod.status === 'calculated' && (
                            <Button onClick={handleApprove}>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve for Payout
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Period Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{getStatusBadge(dividendPeriod.status)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(dividendPeriod.total_profit)}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Dividend Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dividendPeriod.dividend_rate}%</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Dividends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(dividendPeriod.total_dividends)}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Period Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label className="text-sm font-medium">Period Name</Label>
                                <p className="text-sm text-muted-foreground">{dividendPeriod.name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Date Range</Label>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(dividendPeriod.start_date).toLocaleDateString()} - {new Date(dividendPeriod.end_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Created By</Label>
                                <p className="text-sm text-muted-foreground">{dividendPeriod.created_by.name}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium">Created Date</Label>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(dividendPeriod.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        {dividendPeriod.notes && (
                            <div>
                                <Label className="text-sm font-medium">Notes</Label>
                                <p className="text-sm text-muted-foreground">{dividendPeriod.notes}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {dividendPeriod.status !== 'draft' && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Dividend Calculations</CardTitle>
                            <CardDescription>
                                Member dividend calculations based on their purchases during this period.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Member</TableHead>
                                        <TableHead>Total Purchases</TableHead>
                                        <TableHead>Calculated Dividend</TableHead>
                                        <TableHead>Paid Amount</TableHead>
                                        <TableHead>Remaining</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {calculations.data.map((calculation) => (
                                        <TableRow key={calculation.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{calculation.member.name}</div>
                                                    <div className="text-sm text-muted-foreground">{calculation.member.member_code}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{formatCurrency(calculation.total_purchases)}</TableCell>
                                            <TableCell>{formatCurrency(calculation.calculated_dividend)}</TableCell>
                                            <TableCell>{formatCurrency(calculation.paid_amount)}</TableCell>
                                            <TableCell>{formatCurrency(getRemainingAmount(calculation))}</TableCell>
                                            <TableCell>{getStatusBadge(calculation.status)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {calculation.status === 'pending' && dividendPeriod.status === 'calculated' && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleApproveCalculation(calculation.id)}
                                                        >
                                                            Approve
                                                        </Button>
                                                    )}

                                                    {calculation.status === 'approved' && getRemainingAmount(calculation) > 0 && (
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setSelectedCalculation(calculation);
                                                                        setPaymentData(prev => ({
                                                                            ...prev,
                                                                            amount: getRemainingAmount(calculation).toString()
                                                                        }));
                                                                    }}
                                                                >
                                                                    <DollarSign className="h-4 w-4 mr-2" />
                                                                    Pay
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>Process Dividend Payment</DialogTitle>
                                                                    <DialogDescription>
                                                                        Pay dividend to {calculation.member.name}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                                                                    <div className="grid gap-4 md:grid-cols-2">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="payment_method">Payment Method</Label>
                                                                            <Select
                                                                                value={paymentData.payment_method}
                                                                                onValueChange={(value) => setPaymentData(prev => ({ ...prev, payment_method: value }))}
                                                                            >
                                                                                <SelectTrigger>
                                                                                    <SelectValue />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                    <SelectItem value="cash">Cash</SelectItem>
                                                                                    <SelectItem value="credit">Credit to Account</SelectItem>
                                                                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="amount">Amount (VT)</Label>
                                                                            <Input
                                                                                id="amount"
                                                                                type="number"
                                                                                step="0.01"
                                                                                value={paymentData.amount}
                                                                                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                                                                                max={getRemainingAmount(calculation)}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="payment_date">Payment Date</Label>
                                                                        <Input
                                                                            id="payment_date"
                                                                            type="date"
                                                                            value={paymentData.payment_date}
                                                                            onChange={(e) => setPaymentData(prev => ({ ...prev, payment_date: e.target.value }))}
                                                                            required
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="reference">Reference (Optional)</Label>
                                                                        <Input
                                                                            id="reference"
                                                                            value={paymentData.reference}
                                                                            onChange={(e) => setPaymentData(prev => ({ ...prev, reference: e.target.value }))}
                                                                            placeholder="Transaction ID, receipt number, etc."
                                                                        />
                                                                    </div>

                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="notes">Notes (Optional)</Label>
                                                                        <textarea
                                                                            name="notes"
                                                                            value={paymentData.notes}
                                                                            onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                                                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                            rows={3}
                                                                        />
                                                                    </div>

                                                                    <div className="flex justify-end gap-4">
                                                                        <Button type="button" variant="outline" onClick={() => setSelectedCalculation(null)}>
                                                                            Cancel
                                                                        </Button>
                                                                        <Button type="submit">
                                                                            Process Payment
                                                                        </Button>
                                                                    </div>
                                                                </form>
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {calculations.data.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <h3 className="text-lg font-medium">No dividend calculations yet</h3>
                                    <p>Calculate dividends to see member entitlement amounts.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}