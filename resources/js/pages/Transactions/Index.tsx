import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, ArrowLeft, Clock, CheckCircle, User, Calendar, CreditCard, Edit } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface Transaction {
    id: number;
    transaction_id: string;
    member: {
        id: number;
        name: string;
    } | null;
    member_name: string;
    items_count: number;
    subtotal: number;
    total_paid: number;
    formatted_subtotal: string;
    created_by: string;
    completed_by?: string;
    created_at: string;
    completed_at?: string;
    notes: string | null;
    payment_method: string;
    status: string;
    remaining_balance?: number;
}

interface Member {
    id: number;
    name: string;
}

interface TransactionsPageProps {
    transactions: {
        data: Transaction[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    members: Member[];
    years: number[];
    filters: {
        search?: string;
        member_id?: string;
        status?: string;
        year?: string;
        month?: string;
    };
    currentStatus: string;
}

const TransactionsIndex: React.FC<TransactionsPageProps> = ({
    transactions,
    members,
    years,
    filters,
    currentStatus,
}) => {
    const [search, setSearch] = React.useState(filters.search || '');
    const [memberFilter, setMemberFilter] = React.useState(filters.member_id || 'all');
    const [yearFilter, setYearFilter] = React.useState(filters.year || 'all');
    const [monthFilter, setMonthFilter] = React.useState(filters.month || 'all');
    const [status, setStatus] = React.useState(currentStatus);

    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `${numAmount.toFixed(2)} VT`;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/transactions', {
            search,
            member_id: memberFilter === 'all' ? '' : memberFilter,
            year: yearFilter === 'all' ? '' : yearFilter,
            month: monthFilter === 'all' ? '' : monthFilter,
            status,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setMemberFilter('all');
        setYearFilter('all');
        setMonthFilter('all');
        setStatus('completed');
        router.get('/transactions', { status: 'completed' });
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        router.get('/transactions', {
            search,
            member_id: memberFilter === 'all' ? '' : memberFilter,
            year: yearFilter === 'all' ? '' : yearFilter,
            month: monthFilter === 'all' ? '' : monthFilter,
            status: newStatus,
        });
    };

    const getStatusBadge = (transactionStatus: string) => {
        if (transactionStatus === 'pending') {
            return <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Pending
            </Badge>;
        } else if (transactionStatus === 'completed') {
            return <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Completed
            </Badge>;
        }
        return <Badge variant="outline">{transactionStatus}</Badge>;
    };

    const getMonths = () => [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' },
    ];

    return (
        <AppLayout>
            <Head title="Transactions" />
            
            <div className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Link href="/pos">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to POS
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold">Transactions</h1>
                            <p className="text-gray-600">View and manage all sales transactions</p>
                        </div>
                    </div>
                    <Badge variant="default" className="flex items-center gap-1">
                        {status === 'pending' ? <Clock className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                        {transactions.data.length} {status === 'pending' ? 'Pay Later' : 'Completed'}
                    </Badge>
                </div>

                {/* Status Toggle */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <div className="flex gap-2">
                            <Button
                                variant={status === 'completed' ? 'default' : 'outline'}
                                onClick={() => handleStatusChange('completed')}
                            >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Completed
                            </Button>
                            <Button
                                variant={status === 'pending' ? 'default' : 'outline'}
                                onClick={() => handleStatusChange('pending')}
                            >
                                <Clock className="h-4 w-4 mr-2" />
                                Pay Later
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Filters */}
                <Card className="mb-6">
                    <CardContent className="p-4">
                        <form onSubmit={handleSearch}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <Input
                                    placeholder="Search transaction ID..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Select value={memberFilter} onValueChange={setMemberFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Member" />
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
                                <Select value={yearFilter} onValueChange={setYearFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Years</SelectItem>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={monthFilter} onValueChange={setMonthFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Months</SelectItem>
                                        {getMonths().map((month) => (
                                            <SelectItem key={month.value} value={month.value}>
                                                {month.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <div className="flex gap-2">
                                    <Button type="submit">Search</Button>
                                    <Button type="button" variant="outline" onClick={clearFilters}>Clear</Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Transactions Table */}
                <Card>
                    <CardContent className="p-0">
                        {transactions.data.length === 0 ? (
                            <div className="text-center py-12">
                                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No {status === 'pending' ? 'Pay Later' : 'Completed'} transactions
                                </h3>
                                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Transaction ID</TableHead>
                                        <TableHead>Member</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Items</TableHead>
                                        <TableHead>Subtotal</TableHead>
                                        {status === 'pending' && <TableHead>Paid</TableHead>}
                                        {status === 'pending' && <TableHead>Balance</TableHead>}
                                        <TableHead>Date</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.data.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">{transaction.transaction_id}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div>{transaction.member_name}</div>
                                                    {transaction.notes && (
                                                        <div className="text-xs text-gray-500">{transaction.notes}</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                            <TableCell>{transaction.items_count}</TableCell>
                                            <TableCell className="font-medium">{transaction.formatted_subtotal}</TableCell>
                                            {status === 'pending' && (
                                                <TableCell className="font-medium text-blue-600">
                                                    {formatCurrency(transaction.total_paid)}
                                                </TableCell>
                                            )}
                                            {status === 'pending' && (
                                                <TableCell className="font-medium text-orange-600">
                                                    {formatCurrency(transaction.remaining_balance || 0)}
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                {status === 'completed' && transaction.completed_at
                                                    ? new Date(transaction.completed_at).toLocaleDateString()
                                                    : new Date(transaction.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.status === 'pending' && (
                                                    <Link href={`/pending-sales/${transaction.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Update
                                                        </Button>
                                                    </Link>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {transactions.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-1">
                            {transactions.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded-md text-sm ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : link.url
                                            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default TransactionsIndex;
