import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { index } from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DeleteConfirmationPopover } from '@/components/delete-confirmation-popover';
import { destroy, store, update } from '@/routes/users';
import { type SharedData } from '@/types';

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    id: number;
    name: string;
    address: string | null;
    is_active: boolean;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles: Role[];
    locations: Location[];
}

interface UsersPageProps {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    roles: Role[];
    locations: Location[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Management',
        href: index().url,
    },
];

export default function Users({ users, roles, locations }: UsersPageProps) {
    const { auth } = usePage<SharedData>().props;

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const createForm = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        locations: [] as number[],
        primary_location: null as number | null,
    });

    const editForm = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        locations: [] as number[],
        primary_location: null as number | null,
    });

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
            onFinish: () => {
                editForm.reset();
                setIsEditDialogOpen(false);
            },
        });
    };

    const deleteUser = (user: User) => {
        setUserToDelete(user);
        setDeletePopoverOpen(true);
    };

    const confirmDelete = () => {
        if (!userToDelete) return;

        router.delete(destroy(userToDelete.id).url, {
            onSuccess: () => {
                setDeletePopoverOpen(false);
                setUserToDelete(null);
            },
            onError: () => {
                setDeletePopoverOpen(false);
                setUserToDelete(null);
            },
        });
    };

    const startEdit = (user: User) => {
        editForm.setData({
            id: user.id,
            name: user.name,
            email: user.email,
            password: '',
            role: user.roles[0]?.name || '',
            locations: user.locations.map(location => location.id),
            primary_location: null, // Will be set if user has locations
        });
        setIsEditDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <h1 className="sr-only">User Management</h1>

            <SettingsLayout>
                <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="User Management"
                        description="Create, edit, and manage user accounts and their roles"
                    />

                    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Add User</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Create New User</DialogTitle>
                                <DialogDescription>
                                    Add a new user to the system with the appropriate role.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submitCreate} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={createForm.data.name}
                                            onChange={(e) => createForm.setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={createForm.data.email}
                                            onChange={(e) => createForm.setData('email', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={createForm.data.password}
                                            onChange={(e) => createForm.setData('password', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="role">Role</Label>
                                        <Select
                                            value={createForm.data.role}
                                            onValueChange={(value) => createForm.setData('role', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role.id} value={role.name}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Locations</Label>
                                        <div className="space-y-2 mt-2">
                                            {locations.map((location) => (
                                                <div key={location.id} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`create-location-${location.id}`}
                                                        checked={createForm.data.locations.includes(location.id)}
                                                        onChange={(e) => {
                                                            const currentLocations = [...createForm.data.locations];
                                                            if (e.target.checked) {
                                                                currentLocations.push(location.id);
                                                            } else {
                                                                const index = currentLocations.indexOf(location.id);
                                                                if (index > -1) {
                                                                    currentLocations.splice(index, 1);
                                                                }
                                                                // Remove from primary if unchecked
                                                                if (createForm.data.primary_location === location.id) {
                                                                    createForm.setData('primary_location', null);
                                                                }
                                                            }
                                                            createForm.setData('locations', currentLocations);
                                                        }}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <Label htmlFor={`create-location-${location.id}`} className="text-sm">
                                                        {location.name}
                                                        {location.address && (
                                                            <span className="text-gray-500 ml-1">({location.address})</span>
                                                        )}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {createForm.data.locations.length > 1 && (
                                            <div className="mt-3">
                                                <Label htmlFor="create-primary-location">Primary Location</Label>
                                                <Select
                                                    value={createForm.data.primary_location?.toString() || ''}
                                                    onValueChange={(value) => createForm.setData('primary_location', value ? parseInt(value) : null)}
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Select primary location" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {locations
                                                            .filter(location => createForm.data.locations.includes(location.id))
                                                            .map((location) => (
                                                                <SelectItem key={location.id} value={location.id.toString()}>
                                                                    {location.name}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={createForm.processing}>
                                        Create User
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Edit User Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                            <DialogDescription>
                                Update user information and role.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                        id="edit-name"
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                        id="edit-email"
                                        type="email"
                                        value={editForm.data.email}
                                        onChange={(e) => editForm.setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-password">New Password (leave blank to keep current)</Label>
                                    <Input
                                        id="edit-password"
                                        type="password"
                                        value={editForm.data.password}
                                        onChange={(e) => editForm.setData('password', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="edit-role">Role</Label>
                                    <Select
                                        value={editForm.data.role}
                                        onValueChange={(value) => editForm.setData('role', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map((role) => (
                                                <SelectItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Locations</Label>
                                    <div className="space-y-2 mt-2">
                                        {locations.map((location) => (
                                            <div key={location.id} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id={`edit-location-${location.id}`}
                                                    checked={editForm.data.locations.includes(location.id)}
                                                    onChange={(e) => {
                                                        const currentLocations = [...editForm.data.locations];
                                                        if (e.target.checked) {
                                                            currentLocations.push(location.id);
                                                        } else {
                                                            const index = currentLocations.indexOf(location.id);
                                                            if (index > -1) {
                                                                currentLocations.splice(index, 1);
                                                            }
                                                            // Remove from primary if unchecked
                                                            if (editForm.data.primary_location === location.id) {
                                                                editForm.setData('primary_location', null);
                                                            }
                                                        }
                                                        editForm.setData('locations', currentLocations);
                                                    }}
                                                    className="rounded border-gray-300"
                                                />
                                                <Label htmlFor={`edit-location-${location.id}`} className="text-sm">
                                                    {location.name}
                                                    {location.address && (
                                                        <span className="text-gray-500 ml-1">({location.address})</span>
                                                    )}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {editForm.data.locations.length > 1 && (
                                        <div className="mt-3">
                                            <Label htmlFor="edit-primary-location">Primary Location</Label>
                                            <Select
                                                value={editForm.data.primary_location?.toString() || ''}
                                                onValueChange={(value) => editForm.setData('primary_location', value ? parseInt(value) : null)}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select primary location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {locations
                                                        .filter(location => editForm.data.locations.includes(location.id))
                                                        .map((location) => (
                                                            <SelectItem key={location.id} value={location.id.toString()}>
                                                                {location.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        editForm.reset();
                                        setIsEditDialogOpen(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={editForm.processing}>
                                    Update User
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Users List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Users ({users.total})</CardTitle>
                        <CardDescription>
                            Manage existing user accounts.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Locations</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.roles.length > 0 ? user.roles[0].name : 'No Role'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.locations.length > 0 ? (
                                                    user.locations.map((location) => (
                                                        <span
                                                            key={location.id}
                                                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                                                        >
                                                            {location.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-sm">No locations</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => startEdit(user)}
                                                >
                                                    Edit
                                                </Button>
                                                {user.id !== auth.user.id && (
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteUser(user)}
                                                    >
                                                        Delete
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-2">
                                    {Array.from({ length: users.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`/settings/users?page=${page}`}
                                            className={`px-3 py-2 rounded ${
                                                page === users.current_page
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
                        setUserToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                    itemName={userToDelete?.name || ''}
                />
            </SettingsLayout>
        </AppLayout>
    );
}