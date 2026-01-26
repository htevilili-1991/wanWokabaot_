import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState, useMemo, FormEventHandler } from 'react';
import { ChevronDown, ChevronUp, Search, Trash2 } from 'lucide-react';

import { Checkbox } from '@/components/ui/checkbox';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteConfirmationPopover } from '@/components/delete-confirmation-popover';
import { destroy, index, store, update } from '@/routes/members';
import { type BreadcrumbItem, type SharedData } from '@/types';

interface Member {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    member_code: string | null;
    join_date: string;
    status: 'Active' | 'Inactive' | 'Suspended';
    notes: string | null;
    total_spent: number | string;
    balance: number | string;
    unpaid_total: string;
    created_at: string;
    updated_at: string;
}

interface MembersPageProps {
    members: {
        data: Member[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search: string;
        sort_by: string;
        sort_direction: string;
        per_page: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: index().url,
    },
];

export default function MembersIndex({ members, filters }: MembersPageProps) {
    const { flash } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
    const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

    const isAllSelected = useMemo(() => {
        return members.data.length > 0 && selectedMembers.length === members.data.length;
    }, [members.data, selectedMembers]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedMembers(members.data.map((member) => member.id));
        } else {
            setSelectedMembers([]);
        }
    };

    const handleSelectMember = (memberId: number, checked: boolean) => {
        setSelectedMembers((prevSelected) =>
            checked
                ? [...prevSelected, memberId]
                : prevSelected.filter((id) => id !== memberId)
        );
    };

    const bulkDeleteMembers = () => {
        router.delete(destroy().url, {
            data: { ids: selectedMembers },
            onSuccess: () => {
                setSelectedMembers([]);
                setDeletePopoverOpen(false); // Close the bulk delete confirmation if it's open
                router.reload(); // Reload members list
            },
            onError: () => {
                setDeletePopoverOpen(false);
            },
        });
    };

    const triggerBulkDelete = () => {
        setDeletePopoverOpen(true); // Open the general delete confirmation for bulk delete
        // The confirmDelete function will need to be adapted for bulk delete as well
    };

    const createForm = useForm({
        name: '',
        email: '',
        phone: '',
        member_code: '',
        join_date: '',
        status: 'Active',
        notes: '',
        total_spent: '',
        balance: '',
    });

    const editForm = useForm({
        id: '',
        name: '',
        email: '',
        phone: '',
        member_code: '',
        join_date: '',
        status: 'Active',
        notes: '',
        total_spent: '',
        balance: '',
    });

    // Debounced search
    const debouncedSearch = useMemo(() => {
        let timeoutId: NodeJS.Timeout;
        return (value: string) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                router.get(index().url, {
                    search: value,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    per_page: perPage,
                }, {
                    preserveState: true,
                    replace: true,
                });
            }, 300);
        };
    }, [sortBy, sortDirection, perPage]);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleSort = (column: string) => {
        const newDirection = sortBy === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDirection(newDirection);

        router.get(index().url, {
            search: searchTerm,
            sort_by: column,
            sort_direction: newDirection,
            per_page: perPage,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePerPageChange = (value: string) => {
        const newPerPage = parseInt(value);
        setPerPage(newPerPage);

        router.get(index().url, {
            search: searchTerm,
            sort_by: sortBy,
            sort_direction: sortDirection,
            per_page: newPerPage,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const submitCreate: FormEventHandler = (e) => {
        e.preventDefault();

        createForm.post(store(), {
            onFinish: () => {
                createForm.reset();
                setIsCreateDialogOpen(false);
            },
        });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();

        editForm.put(update(editForm.data.id), {
            onSuccess: () => {
                editForm.reset();
                setIsEditDialogOpen(false);
            },
        });
    };

    const deleteMember = (member: Member) => {
        setMemberToDelete(member);
        setDeletePopoverOpen(true);
    };

    const confirmDelete = () => {
        if (selectedMembers.length > 0) {
            // Bulk delete
            router.delete(destroy().url, {
                data: { ids: selectedMembers },
                onSuccess: () => {
                    setSelectedMembers([]);
                    setDeletePopoverOpen(false);
                    router.reload();
                },
                onError: () => {
                    setDeletePopoverOpen(false);
                },
            });
        } else if (memberToDelete) {
            // Single delete
            router.delete(destroy(memberToDelete.id).url, {
                onSuccess: () => {
                    setDeletePopoverOpen(false);
                    setMemberToDelete(null);
                },
                onError: () => {
                    setDeletePopoverOpen(false);
                    setMemberToDelete(null);
                },
            });
        }
    };

    const startEdit = (member: Member) => {
        editForm.setData({
            id: member.id,
            name: member.name,
            email: member.email,
            phone: member.phone || '',
            member_code: member.member_code || '',
            join_date: member.join_date,
            status: member.status,
            notes: member.notes || '',
            total_spent: (member.total_spent ?? 0).toString(),
            balance: (member.balance ?? 0).toString(),
        });
        setIsEditDialogOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Inactive':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Suspended':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getBalanceColor = (balance: number) => {
        return balance >= 2000 ? 'bg-red-100 text-red-800 font-semibold px-2 py-1 rounded-md border border-red-200' : 'text-gray-900';
    };


    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `${numAmount.toFixed(2)} VT`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Members" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Members"
                        description="Manage member information, balances, and status"
                    />

                        <div className="flex gap-2">
                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>Add Member</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Add New Member</DialogTitle>
                                        <DialogDescription>
                                            Create a new member record with their details.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={submitCreate} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Name *</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={createForm.data.name}
                                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={createForm.data.email}
                                                    onChange={(e) => createForm.setData('email', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="phone">Phone</Label>
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    value={createForm.data.phone}
                                                    onChange={(e) => createForm.setData('phone', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="member_code">Member Code</Label>
                                                <Input
                                                    id="member_code"
                                                    type="text"
                                                    value={createForm.data.member_code}
                                                    onChange={(e) => createForm.setData('member_code', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="join_date">Join Date *</Label>
                                                <Input
                                                    id="join_date"
                                                    type="date"
                                                    value={createForm.data.join_date}
                                                    onChange={(e) => createForm.setData('join_date', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="status">Status *</Label>
                                                <Select
                                                    value={createForm.data.status}
                                                    onValueChange={(value) => createForm.setData('status', value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Active">Active</SelectItem>
                                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                                        <SelectItem value="Suspended">Suspended</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <Label htmlFor="notes">Notes</Label>
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    value={createForm.data.notes}
                                                    onChange={(e) => createForm.setData('notes', e.target.value)}
                                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="total_spent">Total Spent (VT)</Label>
                                                <Input
                                                    id="total_spent"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={createForm.data.total_spent}
                                                    onChange={(e) => createForm.setData('total_spent', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="balance">Balance (VT)</Label>
                                                <Input
                                                    id="balance"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={createForm.data.balance}
                                                    onChange={(e) => createForm.setData('balance', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">Create Member</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            {selectedMembers.length > 0 && (
                                <Button
                                    variant="destructive"
                                    onClick={() => setDeletePopoverOpen(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Selected ({selectedMembers.length})
                                </Button>
                            )}
                        </div>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="per-page">Show:</Label>
                                <Select value={perPage.toString()} onValueChange={handlePerPageChange}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Members Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Members ({members.total})</CardTitle>
                        <CardDescription>
                            {members.from}-{members.to} of {members.total} members
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16">
                                        <Checkbox
                                            checked={isAllSelected}
                                            onCheckedChange={handleSelectAll}
                                            aria-label="Select all members"
                                        />
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Name
                                            {sortBy === 'name' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Email
                                            {sortBy === 'email' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('phone')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Phone
                                            {sortBy === 'phone' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('status')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Status
                                            {sortBy === 'status' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('balance')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Total Unpaid (VT)
                                            {sortBy === 'balance' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('total_spent')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Total Spent (VT)
                                            {sortBy === 'total_spent' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.data.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedMembers.includes(member.id)}
                                                onCheckedChange={(checked) => handleSelectMember(member.id, checked as boolean)}
                                                aria-label={`Select member ${member.name}`}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{member.name}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>{member.phone || '-'}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(member.status)}`}>
                                                {member.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className={getBalanceColor(member.balance)}>
                                                {member.unpaid_total} VT
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(member.total_spent)} VT
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline" onClick={() => startEdit(member)}>
                                                            Edit
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Member</DialogTitle>
                                                            <DialogDescription>
                                                                Update member information and details.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <form onSubmit={submitEdit} className="space-y-4">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label htmlFor="edit-name">Name *</Label>
                                                                    <Input
                                                                        id="edit-name"
                                                                        type="text"
                                                                        value={editForm.data.name}
                                                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-email">Email *</Label>
                                                                    <Input
                                                                        id="edit-email"
                                                                        type="email"
                                                                        value={editForm.data.email}
                                                                        onChange={(e) => editForm.setData('email', e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-phone">Phone</Label>
                                                                    <Input
                                                                        id="edit-phone"
                                                                        type="tel"
                                                                        value={editForm.data.phone}
                                                                        onChange={(e) => editForm.setData('phone', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-member-code">Member Code</Label>
                                                                    <Input
                                                                        id="edit-member-code"
                                                                        type="text"
                                                                        value={editForm.data.member_code}
                                                                        onChange={(e) => editForm.setData('member_code', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-join-date">Join Date *</Label>
                                                                    <Input
                                                                        id="edit-join-date"
                                                                        type="date"
                                                                        value={editForm.data.join_date}
                                                                        onChange={(e) => editForm.setData('join_date', e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-status">Status *</Label>
                                                                    <Select
                                                                        value={editForm.data.status}
                                                                        onValueChange={(value) => editForm.setData('status', value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Active">Active</SelectItem>
                                                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                                                            <SelectItem value="Suspended">Suspended</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="md:col-span-2">
                                                                    <Label htmlFor="edit-notes">Notes</Label>
                                                                    <textarea
                                                                        id="edit-notes"
                                                                        value={editForm.data.notes}
                                                                        onChange={(e) => editForm.setData('notes', e.target.value)}
                                                                        className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                        rows={3}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-total-spent">Total Spent (VT)</Label>
                                                                    <Input
                                                                        id="edit-total-spent"
                                                                        type="number"
                                                                        step="0.01"
                                                                        min="0"
                                                                        value={editForm.data.total_spent}
                                                                        onChange={(e) => editForm.setData('total_spent', e.target.value)}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label htmlFor="edit-balance">Balance (VT)</Label>
                                                                    <Input
                                                                        id="edit-balance"
                                                                        type="number"
                                                                        step="0.01"
                                                                        min="0"
                                                                        value={editForm.data.balance}
                                                                        onChange={(e) => editForm.setData('balance', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" disabled={editForm.processing}>
                                                                    Update Member
                                                                </Button>
                                                            </DialogFooter>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => deleteMember(member)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {members.last_page > 1 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-2">
                                    {Array.from({ length: members.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`${index().url}?page=${page}&search=${searchTerm}&sort_by=${sortBy}&sort_direction=${sortDirection}&per_page=${perPage}`}
                                            className={`px-3 py-2 rounded ${
                                                page === members.current_page
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted hover:bg-muted/80'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <DeleteConfirmationPopover
                isOpen={deletePopoverOpen}
                onClose={() => {
                    setDeletePopoverOpen(false);
                    setMemberToDelete(null);
                }}
                onConfirm={confirmDelete}
                itemName={memberToDelete?.name || ''}
            />
        </AppLayout>
    );
}