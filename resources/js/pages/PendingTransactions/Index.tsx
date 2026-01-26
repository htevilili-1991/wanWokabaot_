import { Head, Link, router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, CheckCircle, Search, User, XCircle, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlashMessage } from '@/components/flash-message';
import { ConfirmDeleteModal } from '@/components/confirm-delete-modal';
import { useState, useMemo } from 'react';
import { destroy, bulkDestroy } from '@/routes/pending-sales';

interface PendingSale {
    id: number;
    transaction_id: string;
    member: {
        id: number;
        name: string;
        balance: number;
    } | null;
    member_name: string;
    items: Array<{
        id: number;
        name: string;
        quantity: number;
        price: number;
    }>;
    items_count: number;
    subtotal: number;
    total_paid: number;
    remaining_balance: number;
    formatted_subtotal: string;
    created_by: string;
    created_at: string;
    notes: string | null;
    payment_history: Array<{
        amount: number;
        payment_method: string;
        paid_at: string;
        notes?: string;
    }> | null;
}

interface PendingTransactionsPageProps {
    pendingSales: {
        data: PendingSale[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    members: Array<{
        id: number;
        name: string;
    }>;
    filters: {
        search?: string;
        member_id?: string;
    };
}

export default function PendingTransactionsIndex({
    pendingSales,
    members,
    filters
}: PendingTransactionsPageProps) {
    const breadcrumbs = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Pending Transactions', href: '/pending-transactions' },
    ];

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<PendingSale | null>(null);
    const [selectedTransactions, setSelectedTransactions] = useState<number[]>([]);
    const [flashMessage, setFlashMessage] = useState<{
        message: string;
        type: 'success' | 'error';
        show: boolean;
    }>({ message: '', type: 'success', show: false });

    const isAllSelected = useMemo(() => {
        return pendingSales.data.length > 0 && selectedTransactions.length === pendingSales.data.length;
    }, [pendingSales.data, selectedTransactions]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedTransactions(pendingSales.data.map((sale) => sale.id));
        } else {
            setSelectedTransactions([]);
        }
    };

    const handleSelectPendingSale = (saleId: number, checked: boolean) => {
        setSelectedTransactions((prevSelected) =>
            checked
                ? [...prevSelected, saleId]
                : prevSelected.filter((id) => id !== saleId)
        );
    };

    const paymentForm = useForm({
        amount: '',
        payment_method: 'cash',
        notes: '',
    });
    const bulkDeleteForm = useForm({});

    const handleAddPayment = (transaction: PendingSale) => {
        setSelectedTransaction(transaction);
        paymentForm.reset();
        paymentForm.setData('amount', Math.min(transaction.remaining_balance, 100).toString());
        setShowPaymentModal(true);
    };

    const handleUpdate = (transaction: PendingSale) => {
        router.visit(`/pending-sales/${transaction.id}/edit`);
    };

    const handleDelete = (transaction: PendingSale) => {
        setSelectedTransaction(transaction);
        setSelectedTransactions([]); // Clear bulk selections if a single delete is initiated
        setShowDeleteModal(true);
    };

    const handleBulkDelete = () => {
        setSelectedTransaction(null); // Clear single selection if bulk delete is initiated
        if (selectedTransactions.length > 0) {
            setShowDeleteModal(true);
        }
    };

    const submitPayment = () => {
        if (!selectedTransaction) return;

        paymentForm.post(`/pending-sales/${selectedTransaction.id}/payment`, {
            onSuccess: () => {
                setShowPaymentModal(false);
                setFlashMessage({
                    message: 'Payment added successfully!',
                    type: 'success',
                    show: true,
                });
                setTimeout(() => setFlashMessage(prev => ({ ...prev, show: false })), 3000);
            },
            onError: () => {
                setFlashMessage({
                    message: 'Failed to add payment.',
                    type: 'error',
                    show: true,
                });
            },
        });
    };

    const confirmDelete = () => {
        if (selectedTransactions.length > 0) {
            // Bulk delete
            bulkDeleteForm.delete(bulkDestroy().url, {
                data: { ids: selectedTransactions },
                onSuccess: () => {
                    setFlashMessage({
                        message: `Selected transactions cancelled successfully!`,
                        type: 'success',
                        show: true,
                    });
                    setShowDeleteModal(false);
                    setSelectedTransactions([]);
                    setTimeout(() => setFlashMessage(prev => ({ ...prev, show: false })), 3000);
                },
                onError: () => {
                    setFlashMessage({
                        message: 'Failed to cancel selected transactions.',
                        type: 'error',
                        show: true,
                    });
                },
            });
        } else if (selectedTransaction) {
            // Single delete
            bulkDeleteForm.delete(destroy(selectedTransaction.id).url, {
                onSuccess: () => {
                    setFlashMessage({
                        message: `Transaction ${selectedTransaction.transaction_id} cancelled successfully!`,
                        type: 'success',
                        show: true,
                    });
                    setShowDeleteModal(false);
                    setSelectedTransaction(null);
                    setTimeout(() => setFlashMessage(prev => ({ ...prev, show: false })), 3000);
                },
                onError: () => {
                    setFlashMessage({
                        message: 'Failed to cancel transaction.',
                        type: 'error',
                        show: true,
                    });
                },
            });
        }
    };

    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `${numAmount.toFixed(2)} VT`;
    };

    const getMemberBalanceColor = (balance: number) => {
        return balance >= 2000 ? 'bg-red-100 text-red-800' : 'text-gray-900';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pending Transactions" />

            <FlashMessage
                message={flashMessage.message}
                type={flashMessage.type}
                show={flashMessage.show}
                onClose={() => setFlashMessage(prev => ({ ...prev, show: false }))}
            />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Pending Transactions</h1>
                        <p className="text-gray-600">Complete saved transactions after items are handed over</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedTransactions.length > 0 && (
                            <Button
                                variant="destructive"
                                onClick={handleBulkDelete}
                                className="flex items-center gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Selected ({selectedTransactions.length})
                            </Button>
                        )}
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{pendingSales.total}</div>
                            <div className="text-sm text-gray-500">Total Pending</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search by transaction ID or member name..."
                                        value={filters.search || ''}
                                        onChange={(e) => {
                                            router.get('/pending-transactions', {
                                                ...filters,
                                                search: e.target.value,
                                                page: 1,
                                            }, { preserveState: true });
                                        }}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select
                                value={filters.member_id || 'all'}
                                onValueChange={(value) => {
                                    router.get('/pending-transactions', {
                                        ...filters,
                                        member_id: value === 'all' ? '' : value,
                                        page: 1,
                                    }, { preserveState: true });
                                }}
                            >
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by member" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Members</SelectItem>
                                    {members.map((member) => (
                                        <SelectItem key={member.id} value={member.id.toString()}>
                                            {member.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={handleSelectAll}
                                            aria-label="Select all transactions"
                                        />
                                    </TableHead>
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Paid</TableHead>
                                    <TableHead>Remaining</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingSales.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                                            No pending transactions found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pendingSales.data.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedTransactions.includes(transaction.id)}
                                                    onCheckedChange={(checked) => handleSelectPendingSale(transaction.id, checked as boolean)}
                                                    aria-label={`Select transaction ${transaction.transaction_id}`}
                                                />
                                            </TableCell>
                                            <TableCell className="font-mono font-medium">
                                                {transaction.transaction_id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">
                                                        {transaction.member_name}
                                                    </div>
                                                    {transaction.member && (
                                                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${getMemberBalanceColor(transaction.member.balance)}`}>
                                                            Balance: {formatCurrency(transaction.member.balance)}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium">{transaction.items_count} items</div>
                                                    <div className="text-sm text-gray-500 max-w-xs truncate">
                                                        {transaction.items.map(item => item.name).join(', ')}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-green-600">
                                                {transaction.formatted_subtotal}
                                            </TableCell>
                                            <TableCell className="font-medium text-blue-600">
                                                {formatCurrency(transaction.total_paid)}
                                            </TableCell>
                                            <TableCell className="font-medium text-orange-600">
                                                {formatCurrency(transaction.remaining_balance)}
                                            </TableCell>
                                            <TableCell>{transaction.created_by}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    {format(new Date(transaction.created_at), 'MMM dd, yyyy HH:mm')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1 flex-wrap">
                                                    {transaction.member && transaction.remaining_balance > 0 && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleAddPayment(transaction)}
                                                            className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                                                        >
                                                            💰 Add Payment
                                                        </Button>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleUpdate(transaction)}
                                                        className="bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700"
                                                    >
                                                        ✏️ Update
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDelete(transaction)}
                                                        className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                                                    >
                                                        🗑️ Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {pendingSales.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {((pendingSales.current_page - 1) * pendingSales.per_page) + 1} to{' '}
                            {Math.min(pendingSales.current_page * pendingSales.per_page, pendingSales.total)} of{' '}
                            {pendingSales.total} results
                        </div>
                        <div className="flex gap-1">
                            {pendingSales.links.map((link, index) => {
                                if (link.label === '&laquo; Previous') {
                                    return link.url ? (
                                        <Link key={index} href={link.url} preserveScroll>
                                            <Button variant="outline" size="sm">
                                                Previous
                                            </Button>
                                        </Link>
                                    ) : null;
                                }
                                if (link.label === 'Next &raquo;') {
                                    return link.url ? (
                                        <Link key={index} href={link.url} preserveScroll>
                                            <Button variant="outline" size="sm">
                                                Next
                                            </Button>
                                        </Link>
                                    ) : null;
                                }
                                if (link.label === '...') {
                                    return <span key={index} className="px-3 py-2">...</span>;
                                }
                                return (
                                    <Link key={index} href={link.url || '#'} preserveScroll>
                                        <Button
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                        >
                                            {link.label}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Payment</DialogTitle>
                        <DialogDescription>
                            Add a payment to transaction {selectedTransaction?.transaction_id}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={(e) => { e.preventDefault(); submitPayment(); }}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Payment Amount (VT)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    max={selectedTransaction?.remaining_balance}
                                    value={paymentForm.data.amount}
                                    onChange={(e) => paymentForm.setData('amount', e.target.value)}
                                    placeholder="Enter payment amount"
                                    required
                                />
                                {selectedTransaction && (
                                    <p className="text-sm text-gray-500">
                                        Remaining balance: {formatCurrency(selectedTransaction.remaining_balance)}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="payment_method">Payment Method</Label>
                                <Select
                                    value={paymentForm.data.payment_method}
                                    onValueChange={(value) => paymentForm.setData('payment_method', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="card">Card</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <Input
                                    id="notes"
                                    value={paymentForm.data.notes}
                                    onChange={(e) => paymentForm.setData('notes', e.target.value)}
                                    placeholder="Payment notes"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowPaymentModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={paymentForm.processing}>
                                {paymentForm.processing ? 'Adding Payment...' : 'Add Payment'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedTransaction(null);
                }}
                onConfirm={confirmDelete}
                title="Delete Transaction"
                description={`Are you sure you want to delete transaction ${selectedTransaction?.transaction_id}? This will cancel the transaction and return all items to inventory. Any payments made will be refunded to the member's balance.`}
                itemName={selectedTransaction?.transaction_id}
                isLoading={bulkDeleteForm.processing}
            />
        </AppLayout>
    );
}