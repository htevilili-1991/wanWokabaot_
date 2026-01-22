import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type BreadcrumbItem } from '@/types';

interface Role {
    id: number;
    name: string;
    permissions: Permission[];
}

interface Permission {
    id: number;
    name: string;
}

interface Props {
    roles: Role[];
    permissions: Record<string, Permission[]>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Settings',
        href: '/settings/profile',
    },
    {
        title: 'Roles & Permissions',
        href: '/settings/roles-permissions',
    },
];

export default function RolesPermissions({ roles, permissions }: Props) {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const createForm = useForm({
        name: '',
        permissions: [] as string[],
    });

    const editForm = useForm({
        name: '',
        permissions: [] as string[],
    });

    const handleCreateRole = () => {
        createForm.post('/settings/roles-permissions', {
            onSuccess: () => {
                setCreateDialogOpen(false);
                createForm.reset();
            },
        });
    };

    const handleEditRole = (role: Role) => {
        setEditingRole(role);
        editForm.setData({
            name: role.name,
            permissions: role.permissions.map(p => p.name),
        });
        setSelectedPermissions(role.permissions.map(p => p.name));
        setEditDialogOpen(true);
    };

    const handleUpdateRole = () => {
        if (!editingRole) return;

        editForm.put(`/settings/roles-permissions/${editingRole.id}`, {
            onSuccess: () => {
                setEditDialogOpen(false);
                setEditingRole(null);
                editForm.reset();
            },
        });
    };

    const handleDeleteRole = (role: Role) => {
        if (confirm(`Are you sure you want to delete the "${role.name}" role? This action cannot be undone.`)) {
            router.delete(`/settings/roles-permissions/${role.id}`);
        }
    };

    const togglePermission = (permissionName: string, isChecked: boolean) => {
        const currentPermissions = createDialogOpen ? createForm.data.permissions : editForm.data.permissions;

        if (isChecked) {
            const newPermissions = [...currentPermissions, permissionName];
            if (createDialogOpen) {
                createForm.setData('permissions', newPermissions);
            } else {
                editForm.setData('permissions', newPermissions);
            }
        } else {
            const newPermissions = currentPermissions.filter(p => p !== permissionName);
            if (createDialogOpen) {
                createForm.setData('permissions', newPermissions);
            } else {
                editForm.setData('permissions', newPermissions);
            }
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles & Permissions" />

            <h1 className="sr-only">Roles & Permissions</h1>

            <SettingsLayout>
                <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title="Roles & Permissions"
                        description="Manage user roles and their permissions"
                    />

                    <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Create Role
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh]">
                            <DialogHeader>
                                <DialogTitle>Create New Role</DialogTitle>
                                <DialogDescription>
                                    Define a new role and assign permissions to it.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Role Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        className="col-span-3"
                                        placeholder="e.g., Manager, Auditor"
                                    />
                                </div>

                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label className="text-right pt-2">Permissions</Label>
                                    <div className="col-span-3 h-64 border rounded-md p-4 overflow-y-auto">
                                        <div className="space-y-4">
                                            {Object.entries(permissions).map(([category, perms]) => (
                                                <div key={category}>
                                                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                                                        {category.replace('_', ' ')}
                                                    </h4>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {perms.map((permission) => (
                                                            <div key={permission.id} className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    id={`create-${permission.name}`}
                                                                    checked={createForm.data.permissions.includes(permission.name)}
                                                                    onCheckedChange={(checked) =>
                                                                        togglePermission(permission.name, checked as boolean)
                                                                    }
                                                                />
                                                                <Label
                                                                    htmlFor={`create-${permission.name}`}
                                                                    className="text-sm font-normal"
                                                                >
                                                                    {permission.name.replace('_', ' ')}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {category !== Object.keys(permissions)[Object.keys(permissions).length - 1] && (
                                                        <Separator className="mt-4" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleCreateRole}
                                    disabled={createForm.processing}
                                >
                                    {createForm.processing ? 'Creating...' : 'Create Role'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                        <Card key={role.id}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    {role.name}
                                </CardTitle>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditRole(role)}
                                        disabled={role.name === 'Super Admin'}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDeleteRole(role)}
                                        disabled={role.name === 'Super Admin'}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{role.permissions.length}</div>
                                <p className="text-xs text-muted-foreground">
                                    permissions assigned
                                </p>
                                <div className="mt-4 flex flex-wrap gap-1">
                                    {role.permissions.slice(0, 3).map((permission) => (
                                        <Badge key={permission.id} variant="secondary" className="text-xs">
                                            {permission.name.split(' ')[0]}
                                        </Badge>
                                    ))}
                                    {role.permissions.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{role.permissions.length - 3} more
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Edit Role Dialog */}
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="max-w-2xl max-h-[80vh]">
                        <DialogHeader>
                            <DialogTitle>Edit Role</DialogTitle>
                            <DialogDescription>
                                Modify the role name and permissions.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                    Role Name
                                </Label>
                                <Input
                                    id="edit-name"
                                    value={editForm.data.name}
                                    onChange={(e) => editForm.setData('name', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>

                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">Permissions</Label>
                                <div className="col-span-3 h-64 border rounded-md p-4 overflow-y-auto">
                                    <div className="space-y-4">
                                        {Object.entries(permissions).map(([category, perms]) => (
                                            <div key={category}>
                                                <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                                                    {category.replace('_', ' ')}
                                                </h4>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {perms.map((permission) => (
                                                        <div key={permission.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`edit-${permission.name}`}
                                                                checked={editForm.data.permissions.includes(permission.name)}
                                                                onCheckedChange={(checked) =>
                                                                    togglePermission(permission.name, checked as boolean)
                                                                }
                                                            />
                                                            <Label
                                                                htmlFor={`edit-${permission.name}`}
                                                                className="text-sm font-normal"
                                                            >
                                                                {permission.name.replace('_', ' ')}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                                {category !== Object.keys(permissions)[Object.keys(permissions).length - 1] && (
                                                    <Separator className="mt-4" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleUpdateRole}
                                disabled={editForm.processing}
                            >
                                {editForm.processing ? 'Updating...' : 'Update Role'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}