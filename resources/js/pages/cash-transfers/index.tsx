import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Plus, ArrowRightLeft, CheckCircle, XCircle, Clock, Filter, Calendar } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { index } from '@/routes/cash-transfers';
import { type SharedData } from '@/types';

interface CashTransfer {
    id: number;
    from_cash_box_id: number;
    to_cash_box_id: number;
    amount: number;
    reference_number: string;
    reason: string | null;
    notes: string | null;
    transferred_by: number;
    approved_by: number | null;
    transferred_at: string;
    status: 'pending' | 'completed' | 'cancelled';
    from_cash_box: {
        id: number;
        name: string;
    };
    to_cash_box: {
        id: number;
        name: string;
    };
    transferred_by_user: {
        id: number;
        name: string;
    };
    approved_by_user?: {
        id: number;
        name: string;
    };
}

interface CashBox {
    id: number;
    name: string;
    current_balance: number;
}

interface CashTransfersPageProps {
    transfers: {
        data: CashTransfer[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number | null;
        to: number | null;
    };
    cashBoxes: CashBox[];
    filters: {
        cash_box_id: string | null;
        status: string | null;
        date_from: string | null;
        date_to: string | null;
        per_page: number;
    };
}

const breadcrumbs = [
    {
        title: 'Cash Transfers',
        href: index().url,
    },
];

export default function CashTransfersIndex({ transfers, cashBoxes, filters }: CashTransfersPageProps) {
    const { flash } = usePage<SharedData>().props;
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const createForm = useForm({
        from_cash_box_id: '',
        to_cash_box_id: '',
        amount: '',
        reason: '',
        notes: '',
        transferred_at: '',
    });

    const handleCreate = () => {
        createForm.post('/cash-transfers', {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                createForm.reset();
            },
            onError: (errors) => {
                console.error('Create error:', errors);
            },
        });
    };

    const handleComplete = (transfer: CashTransfer) => {
        if (confirm(`Are you sure you want to complete this transfer of ${formatCurrency(transfer.amount)}?`)) {
            router.post(`/cash-transfers/${transfer.id}/complete`, {}, {
                onSuccess: () => {
                    // Page will reload automatically
                },
                onError: (errors) => {
                    console.error('Complete error:', errors);
                },
            });
        }
    };

    const handleCancel = (transfer: CashTransfer) => {
        const reason = prompt('Please provide a reason for cancellation:');
        if (reason) {
            router.post(`/cash-transfers/${transfer.id}/cancel`, { reason }, {
                onSuccess: () => {
                    // Page will reload automatically
                },
                onError: (errors) => {
                    console.error('Cancel error:', errors);
                },
            });
        }
    };

    const handleDelete = (transfer: CashTransfer) => {
        if (confirm(`Are you sure you want to delete this transfer?`)) {
            router.delete(`/cash-transfers/${transfer.id}`, {
                onSuccess: () => {
                    // Page will reload automatically
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                },
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'cancelled':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle className="h-4 w-4" />;
            case 'pending':
                return <Clock className="h-4 w-4" />;
            case 'cancelled':
                return <XCircle className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const totalTransferred = transfers.data.reduce((sum, transfer) => 
        transfer.status === 'completed' ? sum + transfer.amount : sum, 0
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cash Transfers" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="Cash Transfers" />
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                        <Button onClick={() => setIsCreateDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Transfer
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
                            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{transfers.total}</div>
                            <p className="text-xs text-muted-foreground">
                                All time
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completed</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {transfers.data.filter(t => t.status === 'completed').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Successful transfers
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {transfers.data.filter(t => t.status === 'pending').length}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Awaiting approval
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalTransferred)}</div>
                            <p className="text-xs text-muted-foreground">
                                Completed transfers
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                {showFilters && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Filters</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                                <div>
                                    <Label>Cash Box</Label>
                                    <Select value={filters.cash_box_id || ''} onValueChange={(value) => {
                                        const url = new URL(window.location.href);
                                        if (value) {
                                            url.searchParams.set('cash_box_id', value);
                                        } else {
                                            url.searchParams.delete('cash_box_id');
                                        }
                                        window.location.href = url.toString();
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All cash boxes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All cash boxes</SelectItem>
                                            {cashBoxes.map((cashBox) => (
                                                <SelectItem key={cashBox.id} value={cashBox.id.toString()}>
                                                    {cashBox.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Status</Label>
                                    <Select value={filters.status || ''} onValueChange={(value) => {
                                        const url = new URL(window.location.href);
                                        if (value) {
                                            url.searchParams.set('status', value);
                                        } else {
                                            url.searchParams.delete('status');
                                        }
                                        window.location.href = url.toString();
                                    }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All statuses" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">All statuses</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>From Date</Label>
                                    <Input
                                        type="date"
                                        value={filters.date_from || ''}
                                        onChange={(e) => {
                                            const url = new URL(window.location.href);
                                            if (e.target.value) {
                                                url.searchParams.set('date_from', e.target.value);
                                            } else {
                                                url.searchParams.delete('date_from');
                                            }
                                            window.location.href = url.toString();
                                        }}
                                    />
                                </div>
                                <div>
                                    <Label>To Date</Label>
                                    <Input
                                        type="date"
                                        value={filters.date_to || ''}
                                        onChange={(e) => {
                                            const url = new URL(window.location.href);
                                            if (e.target.value) {
                                                url.searchParams.set('date_to', e.target.value);
                                            } else {
                                                url.searchParams.delete('date_to');
                                            }
                                            window.location.href = url.toString();
                                        }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Transfers Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Transfer History</CardTitle>
                        <CardDescription>
                            Showing {transfers.from} to {transfers.to} of {transfers.total} transfers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {transfers.data.map((transfer) => (
                                <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{transfer.from_cash_box.name}</span>
                                                <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{transfer.to_cash_box.name}</span>
                                            </div>
                                            <div className="text-lg font-bold">{formatCurrency(transfer.amount)}</div>
                                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(transfer.status)}`}>
                                                {getStatusIcon(transfer.status)}
                                                {transfer.status}
                                            </div>
                                        </div>
                                        <div className="mt-2 text-sm text-muted-foreground">
                                            <div>Ref: {transfer.reference_number}</div>
                                            <div>By: {transfer.transferred_by_user.name}</div>
                                            {transfer.approved_by_user && (
                                                <div>Approved by: {transfer.approved_by_user.name}</div>
                                            )}
                                            {transfer.reason && (
                                                <div>Reason: {transfer.reason}</div>
                                            )}
                                            <div>Date: {new Date(transfer.transferred_at).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {transfer.status === 'pending' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleComplete(transfer)}
                                                >
                                                    <CheckCircle className="mr-1 h-3 w-3" />
                                                    Complete
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleCancel(transfer)}
                                                >
                                                    <XCircle className="mr-1 h-3 w-3" />
                                                    Cancel
                                                </Button>
                                            </>
                                        )}
                                        {transfer.status !== 'completed' && (
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(transfer)}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create Transfer Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Cash Transfer</DialogTitle>
                        <DialogDescription>
                            Transfer funds between cash boxes.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="from_cash_box">From Cash Box *</Label>
                            <Select value={createForm.data.from_cash_box_id} onValueChange={(value) => createForm.setData('from_cash_box_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select source cash box" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cashBoxes.map((cashBox) => (
                                        <SelectItem key={cashBox.id} value={cashBox.id.toString()}>
                                            {cashBox.name} ({formatCurrency(cashBox.current_balance)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="to_cash_box">To Cash Box *</Label>
                            <Select value={createForm.data.to_cash_box_id} onValueChange={(value) => createForm.setData('to_cash_box_id', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select destination cash box" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cashBoxes.map((cashBox) => (
                                        <SelectItem key={cashBox.id} value={cashBox.id.toString()}>
                                            {cashBox.name} ({formatCurrency(cashBox.current_balance)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount (VT) *</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={createForm.data.amount}
                                onChange={(e) => createForm.setData('amount', e.target.value)}
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="reason">Reason</Label>
                            <Input
                                id="reason"
                                value={createForm.data.reason}
                                onChange={(e) => createForm.setData('reason', e.target.value)}
                                placeholder="e.g., End of day transfer"
                            />
                        </div>
                        <div>
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                value={createForm.data.notes}
                                onChange={(e) => createForm.setData('notes', e.target.value)}
                                placeholder="Additional notes (optional)"
                            />
                        </div>
                        <div>
                            <Label htmlFor="transferred_at">Transfer Date</Label>
                            <Input
                                id="transferred_at"
                                type="date"
                                value={createForm.data.transferred_at}
                                onChange={(e) => createForm.setData('transferred_at', e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} disabled={createForm.processing}>
                            Create Transfer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
