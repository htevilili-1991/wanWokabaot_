import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, ArrowLeft, Clock, CheckCircle, User, Calendar, CreditCard } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

interface CompletedSale {
    id: number;
    transaction_id: string;
    member: {
        id: number;
        name: string;
    } | null;
    member_name: string;
    items: Array<{
        product_id: number;
        name: string;
        quantity: number;
        unit_price: string;
        total: string;
    }>;
    items_count: number;
    subtotal: number;
    total_paid: number;
    formatted_subtotal: string;
    created_by: string;
    completed_by: string | null;
    created_at: string;
    completed_at: string;
    notes: string | null;
    payment_method: string;
    payment_history: Array<{
        amount: number;
        payment_method: string;
        paid_at: string;
        notes?: string;
    }> | null;
}

interface Member {
    id: number;
    name: string;
}

interface CompletedTransactionsPageProps {
    completedSales: {
        data: CompletedSale[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    members: Member[];
    filters: {
        search?: string;
        member_id?: string;
    };
}

const CompletedTransactionsIndex: React.FC<CompletedTransactionsPageProps> = ({
    completedSales,
    members,
    filters,
}) => {
    const [search, setSearch] = React.useState(filters.search || '');
    const [memberFilter, setMemberFilter] = React.useState(filters.member_id || 'all');

    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `${numAmount.toFixed(2)} VT`;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/completed-transactions', {
            search,
            member_id: memberFilter === 'all' ? '' : memberFilter,
        });
    };

    const handleFilter = () => {
        router.get('/completed-transactions', {
            search,
            member_id: memberFilter === 'all' ? '' : memberFilter,
        });
    };

    const clearFilters = () => {
        setSearch('');
        setMemberFilter('all');
        router.get('/completed-transactions');
    };

    const getPaymentMethodBadge = (paymentMethod: string) => {
        const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
            cash: { variant: 'default', label: 'Cash' },
            pay_later: { variant: 'secondary', label: 'Pay Later' },
            multiple: { variant: 'outline', label: 'Multiple' },
        };
        return variants[paymentMethod] || { variant: 'secondary', label: paymentMethod };
    };

    return (
        <AppLayout>
            <Head title="Completed Transactions" />
            
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
                            <h1 className="text-2xl font-bold">Completed Transactions</h1>
                            <p className="text-gray-600">View and manage completed sales transactions</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="default" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            {completedSales.data.length} Completed
                        </Badge>
                    </div>
                </div>

                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search transaction ID or member name..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <Select value={memberFilter} onValueChange={setMemberFilter}>
                                    <SelectTrigger>
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
                                <div className="flex gap-2">
                                    <Button type="submit">
                                        <Search className="h-4 w-4 mr-2" />
                                        Search
                                    </Button>
                                    <Button type="button" variant="outline" onClick={clearFilters}>
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Transactions List */}
                <div className="space-y-4">
                    {completedSales.data.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No completed transactions</h3>
                                <p className="text-gray-600 mb-4">
                                    {search || memberFilter
                                        ? 'No transactions match your search criteria.'
                                        : 'No transactions have been completed yet.'}
                                </p>
                                {(search || memberFilter) && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear Filters
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        completedSales.data.map((sale) => (
                            <Card key={sale.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-lg">{sale.transaction_id}</h3>
                                                <Badge variant="default" className="flex items-center gap-1">
                                                    <CheckCircle className="h-3 w-3" />
                                                    Completed
                                                </Badge>
                                                {getPaymentMethodBadge(sale.payment_method) && (
                                                    <Badge variant={getPaymentMethodBadge(sale.payment_method).variant}>
                                                        {getPaymentMethodBadge(sale.payment_method).label}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center gap-1">
                                                    <User className="h-4 w-4" />
                                                    {sale.member_name}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    Created: {new Date(sale.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    Completed: {new Date(sale.completed_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-green-600">
                                                {formatCurrency(sale.subtotal)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {sale.items_count} items
                                            </div>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="mb-4">
                                        <h4 className="font-medium mb-2">Items ({sale.items_count})</h4>
                                        <div className="space-y-1">
                                            {sale.items.slice(0, 3).map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm">
                                                    <span>{item.name} x {item.quantity}</span>
                                                    <span>{formatCurrency(Number(item.total))}</span>
                                                </div>
                                            ))}
                                            {sale.items.length > 3 && (
                                                <div className="text-sm text-gray-500">
                                                    +{sale.items.length - 3} more items
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    {sale.payment_history && sale.payment_history.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="font-medium mb-2">Payment History</h4>
                                            <div className="space-y-1">
                                                {sale.payment_history.map((payment, index) => (
                                                    <div key={index} className="flex justify-between text-sm">
                                                        <span className="capitalize">{payment.payment_method}</span>
                                                        <span>{formatCurrency(payment.amount)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="text-sm text-gray-600">
                                            Created by {sale.created_by}
                                            {sale.completed_by && ` • Completed by ${sale.completed_by}`}
                                        </div>
                                        {sale.notes && (
                                            <div className="text-sm text-gray-600">
                                                Notes: {sale.notes}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {completedSales.links.length > 3 && (
                    <div className="flex justify-center mt-6">
                        <div className="flex gap-1">
                            {completedSales.links.map((link, index) => (
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

export default CompletedTransactionsIndex;
