import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Plus, Wallet, Edit2, Trash2, ArrowUpDown, Eye, Clock, MapPin } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { formatCurrency } from '@/lib/utils';
import { index } from '@/routes/cash-boxes';
import { type SharedData } from '@/types';

interface CashBox {
    id: number;
    name: string;
    location: string | null;
    description: string | null;
    current_balance: number;
    is_active: boolean;
    is_primary: boolean;
    opening_hours: object | null;
    created_at: string;
    updated_at: string;
}

interface CashBoxesPageProps {
    cashBoxes: CashBox[];
}

const breadcrumbs = [
    {
        title: 'Cash Boxes',
        href: index().url,
    },
];

export default function CashBoxesIndex({ cashBoxes: initialCashBoxes }: CashBoxesPageProps) {
    const { flash } = usePage<SharedData>().props;
    const [cashBoxes, setCashBoxes] = useState(initialCashBoxes);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAdjustBalanceDialogOpen, setIsAdjustBalanceDialogOpen] = useState(false);
    const [selectedCashBox, setSelectedCashBox] = useState<CashBox | null>(null);
    const [loading, setLoading] = useState(false);

    const createForm = useForm({
        name: '',
        location: '',
        description: '',
        current_balance: '',
        is_active: true,
        is_primary: false,
    });

    const editForm = useForm({
        name: '',
        location: '',
        description: '',
        is_active: true,
        is_primary: false,
    });

    const adjustBalanceForm = useForm({
        new_balance: '',
        reason: '',
    });

    const handleCreate = () => {
        createForm.post('/cash-boxes', {
            onSuccess: () => {
                setIsCreateDialogOpen(false);
                createForm.reset();
            },
            onError: (errors) => {
                console.error('Create error:', errors);
            },
        });
    };

    const handleEdit = (cashBox: CashBox) => {
        setSelectedCashBox(cashBox);
        editForm.setData({
            name: cashBox.name,
            location: cashBox.location || '',
            description: cashBox.description || '',
            is_active: cashBox.is_active,
            is_primary: cashBox.is_primary,
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdate = () => {
        if (!selectedCashBox) return;

        editForm.put(`/cash-boxes/${selectedCashBox.id}`, {
            onSuccess: (page) => {
                setCashBoxes(page.props.cashBoxes as CashBox[]);
                setIsEditDialogOpen(false);
                setSelectedCashBox(null);
                editForm.reset();
            },
            onError: (errors) => {
                console.error('Update error:', errors);
            },
        });
    };

    const handleDelete = (cashBox: CashBox) => {
        if (confirm(`Are you sure you want to delete "${cashBox.name}"?`)) {
            router.delete(`/cash-boxes/${cashBox.id}`, {
                onSuccess: (page) => {
                    setCashBoxes(page.props.cashBoxes as CashBox[]);
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                },
            });
        }
    };

    const handleAdjustBalance = (cashBox: CashBox) => {
        setSelectedCashBox(cashBox);
        adjustBalanceForm.setData({
            new_balance: cashBox.current_balance.toString(),
            reason: '',
        });
        setIsAdjustBalanceDialogOpen(true);
    };

    const handleBalanceAdjustment = () => {
        if (!selectedCashBox) return;

        setLoading(true);
        router.post(`/cash-boxes/${selectedCashBox.id}/adjust-balance`, adjustBalanceForm.data, {
            onSuccess: (page) => {
                setCashBoxes(page.props.cashBoxes as CashBox[]);
                setIsAdjustBalanceDialogOpen(false);
                setSelectedCashBox(null);
                adjustBalanceForm.reset();
                setLoading(false);
            },
            onError: (errors) => {
                console.error('Balance adjustment error:', errors);
                setLoading(false);
            },
        });
    };

    const totalBalance = cashBoxes.reduce((sum, cashBox) => sum + cashBox.current_balance, 0);
    const activeCashBoxes = cashBoxes.filter(cb => cb.is_active);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cash Boxes" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="Cash Boxes" />
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Cash Box
                    </Button>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Cash Boxes</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{cashBoxes.length}</div>
                            <p className="text-xs text-muted-foreground">
                                {activeCashBoxes.length} active
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
                            <p className="text-xs text-muted-foreground">
                                Across all cash boxes
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Primary Cash Box</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {cashBoxes.find(cb => cb.is_primary)?.name || 'None'}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Main operations
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Balance</CardTitle>
                            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(cashBoxes.length > 0 ? totalBalance / cashBoxes.length : 0)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Per cash box
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Cash Boxes Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cashBoxes.map((cashBox) => (
                        <Card key={cashBox.id} className={`${!cashBox.is_active ? 'opacity-50' : ''}`}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">{cashBox.name}</CardTitle>
                                    <div className="flex items-center gap-2">
                                        {cashBox.is_primary && (
                                            <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                                                Primary
                                            </span>
                                        )}
                                        {!cashBox.is_active && (
                                            <span className="rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-600">
                                                Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <CardDescription className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {cashBox.location || 'No location'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Current Balance</p>
                                        <p className="text-2xl font-bold">{formatCurrency(cashBox.current_balance)}</p>
                                    </div>
                                    
                                    {cashBox.description && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">Description</p>
                                            <p className="text-sm">{cashBox.description}</p>
                                        </div>
                                    )}

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleAdjustBalance(cashBox)}
                                        >
                                            <ArrowUpDown className="mr-1 h-3 w-3" />
                                            Adjust
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleEdit(cashBox)}
                                        >
                                            <Edit2 className="mr-1 h-3 w-3" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleDelete(cashBox)}
                                            disabled={cashBox.is_primary}
                                        >
                                            <Trash2 className="mr-1 h-3 w-3" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Cash Box</DialogTitle>
                        <DialogDescription>
                            Create a new cash box for managing physical cash.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={createForm.data.name}
                                onChange={(e) => createForm.setData('name', e.target.value)}
                                placeholder="e.g., Kitchen Cash Box"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={createForm.data.location}
                                onChange={(e) => createForm.setData('location', e.target.value)}
                                placeholder="e.g., Kitchen"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={createForm.data.description}
                                onChange={(e) => createForm.setData('description', e.target.value)}
                                placeholder="Optional description"
                            />
                        </div>
                        <div>
                            <Label htmlFor="current_balance">Initial Balance (VT)</Label>
                            <Input
                                id="current_balance"
                                type="number"
                                step="0.01"
                                min="0"
                                value={createForm.data.current_balance}
                                onChange={(e) => createForm.setData('current_balance', e.target.value)}
                                placeholder="0.00"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={createForm.data.is_active}
                                onCheckedChange={(checked) => createForm.setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_primary"
                                checked={createForm.data.is_primary}
                                onCheckedChange={(checked) => createForm.setData('is_primary', checked)}
                            />
                            <Label htmlFor="is_primary">Primary Cash Box</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate} disabled={createForm.processing}>
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Cash Box</DialogTitle>
                        <DialogDescription>
                            Update the cash box details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-name">Name *</Label>
                            <Input
                                id="edit-name"
                                value={editForm.data.name}
                                onChange={(e) => editForm.setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-location">Location</Label>
                            <Input
                                id="edit-location"
                                value={editForm.data.location}
                                onChange={(e) => editForm.setData('location', e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                value={editForm.data.description}
                                onChange={(e) => editForm.setData('description', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="edit-is_active"
                                checked={editForm.data.is_active}
                                onCheckedChange={(checked) => editForm.setData('is_active', checked)}
                            />
                            <Label htmlFor="edit-is_active">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="edit-is_primary"
                                checked={editForm.data.is_primary}
                                onCheckedChange={(checked) => editForm.setData('is_primary', checked)}
                            />
                            <Label htmlFor="edit-is_primary">Primary Cash Box</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleUpdate} disabled={editForm.processing}>
                            Update
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Adjust Balance Dialog */}
            <Dialog open={isAdjustBalanceDialogOpen} onOpenChange={setIsAdjustBalanceDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adjust Balance</DialogTitle>
                        <DialogDescription>
                            Adjust the balance for {selectedCashBox?.name}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="new_balance">New Balance (VT) *</Label>
                            <Input
                                id="new_balance"
                                type="number"
                                step="0.01"
                                min="0"
                                value={adjustBalanceForm.data.new_balance}
                                onChange={(e) => adjustBalanceForm.setData('new_balance', e.target.value)}
                                required
                            />
                            {selectedCashBox && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Current balance: {formatCurrency(selectedCashBox.current_balance)}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="reason">Reason *</Label>
                            <Textarea
                                id="reason"
                                value={adjustBalanceForm.data.reason}
                                onChange={(e) => adjustBalanceForm.setData('reason', e.target.value)}
                                placeholder="e.g., Cash count, correction, etc."
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAdjustBalanceDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleBalanceAdjustment} disabled={loading || adjustBalanceForm.processing}>
                            Adjust Balance
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
