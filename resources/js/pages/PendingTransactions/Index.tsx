import { Head, Link, router, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Calendar, CheckCircle, Search, User, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FlashMessage } from '@/components/flash-message';
import { ConfirmDeleteModal } from '@/components/confirm-delete-modal';
import { useState } from 'react';

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
        product_id: number;
        name: string;
        quantity: number;
        unit_price: number;
        total: number;
    }>;
    items_count: number;
    subtotal: number;
    formatted_subtotal: string;
    created_by: string;
    created_at: string;
    notes: string | null;
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

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<PendingSale | null>(null);
    const [flashMessage, setFlashMessage] = useState<{
        message: string;
        type: 'success' | 'error';
        show: boolean;
    }>({ message: '', type: 'success', show: false });

    const completeForm = useForm({});
    const cancelForm = useForm({});

    const handleComplete = (transaction: PendingSale) => {
        completeForm.post(`/pending-sales/${transaction.id}/complete`, {
            onSuccess: () => {
                setFlashMessage({
                    message: `Transaction ${transaction.transaction_id} completed successfully!`,
                    type: 'success',
                    show: true,
                });
                setTimeout(() => setFlashMessage(prev => ({ ...prev, show: false })), 3000);
            },
            onError: () => {
                setFlashMessage({
                    message: 'Failed to complete transaction.',
                    type: 'error',
                    show: true,
                });
            },
        });
    };

    const handleCancel = (transaction: PendingSale) => {
        setSelectedTransaction(transaction);
        setShowCancelModal(true);
    };

    const confirmCancel = () => {
        if (!selectedTransaction) return;

        cancelForm.post(`/pending-sales/${selectedTransaction.id}/cancel`, {
            onSuccess: () => {
                setFlashMessage({
                    message: `Transaction ${selectedTransaction.transaction_id} cancelled successfully!`,
                    type: 'success',
                    show: true,
                });
                setShowCancelModal(false);
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
                    <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{pendingSales.total}</div>
                        <div className="text-sm text-gray-500">Total Pending</div>
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
                                    <TableHead>Transaction ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Items</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingSales.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                            No pending transactions found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    pendingSales.data.map((transaction) => (
                                        <TableRow key={transaction.id}>
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
                                            <TableCell>{transaction.created_by}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Calendar className="h-4 w-4" />
                                                    {format(new Date(transaction.created_at), 'MMM dd, yyyy HH:mm')}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleComplete(transaction)}
                                                        disabled={completeForm.processing}
                                                        className="bg-green-600 hover:bg-green-700"
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                        Complete
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => handleCancel(transaction)}
                                                    >
                                                        <XCircle className="h-4 w-4 mr-1" />
                                                        Cancel
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

            {/* Cancel Confirmation Modal */}
            <ConfirmDeleteModal
                isOpen={showCancelModal}
                onClose={() => {
                    setShowCancelModal(false);
                    setSelectedTransaction(null);
                }}
                onConfirm={confirmCancel}
                title="Cancel Transaction"
                description={`Are you sure you want to cancel transaction ${selectedTransaction?.transaction_id}? This will remove the pending transaction and no stock will be deducted.`}
                itemName={selectedTransaction?.transaction_id}
                isLoading={cancelForm.processing}
            />
        </AppLayout>
    );
}