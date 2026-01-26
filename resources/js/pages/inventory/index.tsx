import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState, useMemo } from 'react';
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
import { destroy, index, store, update } from '@/routes/inventory';
import inventory from '@/routes/inventory';
import { type SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    category: string;
    cost_price: number | string;
    selling_price: number | string;
    current_stock: number;
    minimum_stock: number;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface InventoryPageProps {
    products: {
        data: Product[];
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

const breadcrumbs = [
    {
        title: 'Inventory',
        href: index().url,
    },
];

export default function InventoryIndex({ products, filters }: InventoryPageProps) {
    const { flash } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
    const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const isAllSelected = useMemo(() => {
        return products.data.length > 0 && selectedProducts.length === products.data.length;
    }, [products.data, selectedProducts]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedProducts(products.data.map((product) => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId: number, checked: boolean) => {
        setSelectedProducts((prevSelected) =>
            checked
                ? [...prevSelected, productId]
                : prevSelected.filter((id) => id !== productId)
        );
    };

    const createForm = useForm({
        name: '',
        category: '',
        cost_price: '',
        selling_price: '',
        current_stock: '',
        minimum_stock: '',
        description: '',
    });

    const editForm = useForm({
        id: '',
        name: '',
        category: '',
        cost_price: '',
        selling_price: '',
        current_stock: '',
        minimum_stock: '',
        description: '',
    });

    const importForm = useForm({
        file: null as File | null,
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
            onFinish: () => {
                editForm.reset();
                setIsEditDialogOpen(false);
            },
        });
    };

    const deleteProduct = (product: Product) => {
        setProductToDelete(product);
        setDeletePopoverOpen(true);
    };

    const confirmDelete = () => {
        if (selectedProducts.length > 0) {
            // Bulk delete
            router.delete(destroy().url, {
                data: { ids: selectedProducts },
                onSuccess: () => {
                    setSelectedProducts([]);
                    setDeletePopoverOpen(false);
                    router.reload();
                },
                onError: () => {
                    setDeletePopoverOpen(false);
                },
            });
        } else if (productToDelete) {
            // Single delete
            router.delete(destroy(productToDelete.id).url, {
                onSuccess: () => {
                    setDeletePopoverOpen(false);
                    setProductToDelete(null);
                },
                onError: () => {
                    setDeletePopoverOpen(false);
                    setProductToDelete(null);
                },
            });
        }
    };

    const startEdit = (product: Product) => {
        editForm.setData({
            id: product.id,
            name: product.name,
            category: product.category,
            cost_price: product.cost_price.toString(),
            selling_price: product.selling_price.toString(),
            current_stock: product.current_stock.toString(),
            minimum_stock: product.minimum_stock.toString(),
            description: product.description || '',
        });
        setIsEditDialogOpen(true);
    };

    const handleExcelImport: FormEventHandler = (e) => {
        e.preventDefault();

        importForm.post(inventory.importMethod().url, {
            onSuccess: () => {
                importForm.reset();
                setIsImportDialogOpen(false);
                router.reload();
            },
            onError: () => {
                // Errors will be displayed automatically by Inertia
            },
        });
    };

    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `${numAmount.toFixed(2)} VT`;
    };

    const getStockStatus = (product: Product) => {
        if (product.current_stock <= 0) {
            return { status: 'Out of Stock', color: 'text-red-600 bg-red-50' };
        }
        if (product.current_stock <= product.minimum_stock) {
            return { status: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
        }
        return { status: 'In Stock', color: 'text-green-600 bg-green-50' };
    };

    const getStockColor = (product: Product) => {
        if (product.current_stock <= 0) {
            return 'text-red-600 font-semibold';
        }
        if (product.current_stock <= product.minimum_stock) {
            return 'text-orange-600 font-semibold';
        }
        return 'text-gray-900';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />

            <div className="space-y-6 p-6">
                    <div className="flex items-center justify-between">
                        <Heading
                            title="Inventory Management"
                            description="Manage products, pricing, and stock levels"
                        />

                        <div className="flex gap-2">
                            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button>Add Product</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Add New Product</DialogTitle>
                                        <DialogDescription>
                                            Create a new product with pricing and stock information.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={submitCreate} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="md:col-span-2">
                                                <Label htmlFor="name">Product Name *</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={createForm.data.name}
                                                    onChange={(e) => createForm.setData('name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="category">Category *</Label>
                                                <Input
                                                    id="category"
                                                    type="text"
                                                    value={createForm.data.category}
                                                    onChange={(e) => createForm.setData('category', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="cost_price">Cost Price (VT) *</Label>
                                                <Input
                                                    id="cost_price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={createForm.data.cost_price}
                                                    onChange={(e) => createForm.setData('cost_price', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="selling_price">Selling Price (VT) *</Label>
                                                <Input
                                                    id="selling_price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={createForm.data.selling_price}
                                                    onChange={(e) => createForm.setData('selling_price', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="current_stock">Current Stock *</Label>
                                                <Input
                                                    id="current_stock"
                                                    type="number"
                                                    min="0"
                                                    value={createForm.data.current_stock}
                                                    onChange={(e) => createForm.setData('current_stock', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="minimum_stock">Minimum Stock *</Label>
                                                <Input
                                                    id="minimum_stock"
                                                    type="number"
                                                    min="0"
                                                    value={createForm.data.minimum_stock}
                                                    onChange={(e) => createForm.setData('minimum_stock', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <Label htmlFor="description">Description</Label>
                                                <textarea
                                                    id="description"
                                                    value={createForm.data.description}
                                                    onChange={(e) => createForm.setData('description', e.target.value)}
                                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={createForm.processing}>
                                                Create Product
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline">Import Excel</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Import Products from Excel</DialogTitle>
                                        <DialogDescription>
                                            Upload an Excel file (.xlsx or .xls) to import or update products.
                                        </DialogDescription>
                                        <p className="text-sm text-gray-500 mt-2">
                                            <a
                                                href={inventory.exportSample().url}
                                                target="_blank"
                                                className="text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Download sample Excel format
                                            </a>
                                            before uploading.
                                        </p>
                                    </DialogHeader>
                                    <form
                                        onSubmit={handleExcelImport}
                                        className="grid gap-4 py-4"
                                        encType="multipart/form-data"
                                    >
                                        <div className="grid items-center gap-4">
                                            <Label htmlFor="excel_file" className="text-left">
                                                Excel File
                                            </Label>
                                            <Input
                                                id="excel_file"
                                                type="file"
                                                accept=".xlsx, .xls"
                                                onChange={(e) => importForm.setData('file', e.target.files ? e.target.files[0] : null)}
                                                required
                                            />
                                            {importForm.errors.file && <div className="text-red-500 text-sm">{importForm.errors.file}</div>}
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" disabled={importForm.processing}>Import</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            {selectedProducts.length > 0 && (
                                <Button
                                    variant="destructive"
                                    onClick={() => setDeletePopoverOpen(true)}
                                    className="flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete Selected ({selectedProducts.length})
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
                                    placeholder="Search products..."
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

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Products ({products.total})</CardTitle>
                        <CardDescription>
                            {products.from}-{products.to} of {products.total} products
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
                                            aria-label="Select all products"
                                        />
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Product Name
                                            {sortBy === 'name' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('category')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Category
                                            {sortBy === 'category' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('cost_price')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Cost Price
                                            {sortBy === 'cost_price' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('selling_price')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Selling Price
                                            {sortBy === 'selling_price' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead
                                        className="cursor-pointer hover:bg-gray-50"
                                        onClick={() => handleSort('current_stock')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Stock
                                            {sortBy === 'current_stock' && (
                                                sortDirection === 'asc' ?
                                                    <ChevronUp className="h-4 w-4" /> :
                                                    <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.data.map((product) => {
                                    const stockStatus = getStockStatus(product);
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedProducts.includes(product.id)}
                                                    onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                                                    aria-label={`Select product ${product.name}`}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>{formatCurrency(product.cost_price)}</TableCell>
                                            <TableCell>{formatCurrency(product.selling_price)}</TableCell>
                                            <TableCell className={getStockColor(product)}>
                                                {product.current_stock} / {product.minimum_stock}
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                                                    {stockStatus.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button size="sm" variant="outline" onClick={() => startEdit(product)}>
                                                                Edit
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Product</DialogTitle>
                                                                <DialogDescription>
                                                                    Update product information, pricing, and stock levels.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <form onSubmit={submitEdit} className="space-y-4">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                    <div className="md:col-span-2">
                                                                        <Label htmlFor="edit-name">Product Name *</Label>
                                                                        <Input
                                                                            id="edit-name"
                                                                            type="text"
                                                                            value={editForm.data.name}
                                                                            onChange={(e) => editForm.setData('name', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="edit-category">Category *</Label>
                                                                        <Input
                                                                            id="edit-category"
                                                                            type="text"
                                                                            value={editForm.data.category}
                                                                            onChange={(e) => editForm.setData('category', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="edit-cost_price">Cost Price (VT) *</Label>
                                                                        <Input
                                                                            id="edit-cost_price"
                                                                            type="number"
                                                                            step="0.01"
                                                                            min="0"
                                                                            value={editForm.data.cost_price}
                                                                            onChange={(e) => editForm.setData('cost_price', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="edit-selling_price">Selling Price (VT) *</Label>
                                                                        <Input
                                                                            id="edit-selling_price"
                                                                            type="number"
                                                                            step="0.01"
                                                                            min="0"
                                                                            value={editForm.data.selling_price}
                                                                            onChange={(e) => editForm.setData('selling_price', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="edit-current_stock">Current Stock *</Label>
                                                                        <Input
                                                                            id="edit-current_stock"
                                                                            type="number"
                                                                            min="0"
                                                                            value={editForm.data.current_stock}
                                                                            onChange={(e) => editForm.setData('current_stock', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <Label htmlFor="edit-minimum_stock">Minimum Stock *</Label>
                                                                        <Input
                                                                            id="edit-minimum_stock"
                                                                            type="number"
                                                                            min="0"
                                                                            value={editForm.data.minimum_stock}
                                                                            onChange={(e) => editForm.setData('minimum_stock', e.target.value)}
                                                                            required
                                                                        />
                                                                    </div>
                                                                    <div className="md:col-span-2">
                                                                        <Label htmlFor="edit-description">Description</Label>
                                                                        <textarea
                                                                            id="edit-description"
                                                                            value={editForm.data.description}
                                                                            onChange={(e) => editForm.setData('description', e.target.value)}
                                                                            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                                            rows={3}
                                                                        />
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
                                                                        Update Product
                                                                    </Button>
                                                                </DialogFooter>
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => deleteProduct(product)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {products.last_page > 1 && (
                            <div className="flex justify-center mt-4">
                                <div className="flex gap-2">
                                    {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={`${index().url}?page=${page}&search=${searchTerm}&sort_by=${sortBy}&sort_direction=${sortDirection}&per_page=${perPage}`}
                                            className={`px-3 py-2 rounded ${
                                                page === products.current_page
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
                    setProductToDelete(null);
                }}
                onConfirm={confirmDelete}
                itemName={productToDelete?.name || ''}
            />
        </AppLayout>
    );
}