import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ShoppingCart, User, CreditCard, Clock, Save, CheckCircle, Plus, X, Maximize, Minimize, DollarSign } from 'lucide-react';

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { sale, savePending } from '@/routes/pos';
import { type SharedData } from '@/types';

interface Product {
    id: number;
    name: string;
    selling_price: number | string;
    current_stock: number;
}

interface Member {
    id: number;
    name: string;
    balance: number | string;
}

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    subtotal: number;
}

interface Cart {
    id: string;
    member_id: string;
    items: CartItem[];
    payment_method: 'cash' | 'pay_later';
    notes: string;
    status: 'active' | 'processing';
}

interface POSPageProps {
    products: Product[];
    members: Member[];
    pendingSaleEdit?: {
        id: number;
        items: any[];
        member_id: number | null;
        subtotal: number;
        notes: string;
    };
}

const breadcrumbs = [
    {
        title: 'Point of Sale',
        href: '/pos',
    },
];

export default function POSIndex({ products: initialProducts, members, pendingSaleEdit }: POSPageProps) {
    const { flash } = usePage<SharedData & { flash?: { success?: string; error?: string; info?: string } }>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>(initialProducts);
    
    // Load carts from localStorage on mount
    const [carts, setCarts] = useState<Cart[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCarts = localStorage.getItem('pos_carts');
            return savedCarts ? JSON.parse(savedCarts) : [];
        }
        return [];
    });
    
    const [activeCartId, setActiveCartId] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('pos_active_cart_id');
        }
        return null;
    });
    
    const [isFullscreen, setIsFullscreen] = useState(false);
    const posContainerRef = useRef<HTMLDivElement>(null);
    
    // Payment popover state
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [receivedCash, setReceivedCash] = useState('');

    // Computed values for active cart
    const activeCart = carts.find(cart => cart.id === activeCartId) || null;
    const selectedMemberId = activeCart?.member_id || '';
    const paymentMethod = activeCart?.payment_method || 'cash';
    const cart = activeCart?.items || [];
    const transactionNotes = activeCart?.notes || '';

    const saleForm = useForm<{
        cart: Array<{ id: number; quantity: number }>;
        member_id: string;
        total: number;
        payment_method: 'cash' | 'pay_later';
    }>({
        cart: [],
        member_id: '',
        total: 0,
        payment_method: 'cash' as 'cash' | 'pay_later',
    });

    const saveForm = useForm({
        cart: [] as { id: number; quantity: number }[],
        member_id: '',
        total: 0,
        payment_method: 'cash' as 'cash' | 'pay_later',
        notes: '',
    });

    // Filter products based on search term
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return products;
        return products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // Function to refresh products data from server
    const refreshProducts = async () => {
        try {
            const response = await fetch('/pos/products', {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setProducts(data.products || []);
            }
        } catch (error) {
            console.error('Failed to refresh products:', error);
        }
    };

    // Calculate total
    const total = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.subtotal, 0);
    }, [cart]);

    // Check if member can pay later
    const canPayLater = useMemo(() => {
        if (!selectedMemberId) return false;
        const member = members.find(m => m.id.toString() === selectedMemberId);
        return member ? Number(member.balance) < 2000 : false;
    }, [selectedMemberId, members]);

    // Save carts to localStorage whenever they change
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('pos_carts', JSON.stringify(carts));
        }
    }, [carts]);

    // Save active cart ID to localStorage whenever it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (activeCartId) {
                localStorage.setItem('pos_active_cart_id', activeCartId);
            } else {
                localStorage.removeItem('pos_active_cart_id');
            }
        }
    }, [activeCartId]);

    // Handle pending sale edit data
    useEffect(() => {
        if (pendingSaleEdit && !activeCart) {
            // Only load edit cart if there's no active cart already
            // This prevents reloading the edit cart after we've cleared it
            
            // Convert pending sale items to cart items format
            const cartItems: CartItem[] = pendingSaleEdit.items
                .map((item: any) => {
                    const product = products.find(p => p.id === item.product_id);
                    if (!product) return null;
                    
                    return {
                        id: item.product_id,
                        product: product,
                        quantity: item.quantity,
                        subtotal: Number(item.total) || (Number(product.selling_price) * item.quantity),
                    };
                })
                .filter((item): item is CartItem => item !== null);

            // Create a new cart with the pending sale data
            const editCart: Cart = {
                id: `edit-cart-${pendingSaleEdit.id}`,
                member_id: pendingSaleEdit.member_id?.toString() || '',
                items: cartItems,
                payment_method: 'cash', // Default, can be changed by user
                notes: pendingSaleEdit.notes || '',
                status: 'active',
            };

            setCarts([editCart]);
            setActiveCartId(editCart.id);
            
            // Clear the session data after loading (commented out to avoid CSRF issues)
            // fetch('/pos/clear-edit-session', { method: 'POST' }).catch(() => {});
        }
    }, [pendingSaleEdit, products, activeCart]);

    // Cart management functions
    const createNewCart = (memberId: string = '') => {
        const newCart: Cart = {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            member_id: memberId,
            items: [],
            payment_method: 'cash',
            notes: '',
            status: 'active',
        };
        setCarts(prev => [...prev, newCart]);
        setActiveCartId(newCart.id);
    };

    const switchToCart = (cartId: string) => {
        setActiveCartId(cartId);
    };

    const removeCart = (cartId: string) => {
        setCarts(prev => prev.filter(cart => cart.id !== cartId));
        if (activeCartId === cartId) {
            const remainingCarts = carts.filter(cart => cart.id !== cartId);
            setActiveCartId(remainingCarts.length > 0 ? remainingCarts[0].id : null);
        }
    };

    const clearAllCarts = () => {
        setCarts([]);
        setActiveCartId(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('pos_carts');
            localStorage.removeItem('pos_active_cart_id');
        }
    };

    const updateActiveCart = (updates: Partial<Cart>) => {
        if (!activeCartId) return;
        setCarts(prev => prev.map(cart =>
            cart.id === activeCartId ? { ...cart, ...updates } : cart
        ));
    };

    // Initialize with first cart if none exists - REMOVED to prevent auto-creation
    // useEffect(() => {
    //     if (carts.length === 0) {
    //         createNewCart();
    //     }
    // }, []);

    // Update form when active cart changes
    useEffect(() => {
        if (activeCart) {
            saleForm.setData({
                cart: activeCart.items.map(item => ({
                    id: item.product.id,
                    quantity: item.quantity,
                })),
                member_id: activeCart.member_id,
                total: total,
                payment_method: activeCart.payment_method,
            });
        }
    }, [activeCart, total]);

    const addToCart = (product: Product) => {
        if (!activeCart) {
            alert('Please create a cart first by selecting a member');
            return;
        }

        const existingItem = activeCart.items.find(item => item.product.id === product.id);

        if (existingItem) {
            if (existingItem.quantity >= product.current_stock) {
                alert(`Only ${product.current_stock} items available in stock`);
                return;
            }
            updateQuantity(product.id, existingItem.quantity + 1);
        } else {
            if (product.current_stock < 1) {
                alert('Product is out of stock');
                return;
            }
            const newItem: CartItem = {
                id: Date.now(), // temporary ID for cart
                product,
                quantity: 1,
                subtotal: Number(product.selling_price),
            };
            updateActiveCart({
                items: [...activeCart.items, newItem]
            });
        }
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (!activeCart) return;

        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }

        const product = products.find(p => p.id === productId);
        if (product && newQuantity > product.current_stock) {
            alert(`Only ${product.current_stock} items available in stock`);
            return;
        }

        const updatedItems = activeCart.items.map(item => {
            if (item.product.id === productId) {
                return {
                    ...item,
                    quantity: newQuantity,
                    subtotal: Number(item.product.selling_price) * newQuantity,
                };
            }
            return item;
        });

        updateActiveCart({ items: updatedItems });
    };

    const removeFromCart = (productId: number) => {
        if (!activeCart) return;

        const updatedItems = activeCart.items.filter(item => item.product.id !== productId);
        updateActiveCart({ items: updatedItems });
    };

    const clearActiveCart = () => {
        if (!activeCart) return;

        updateActiveCart({
            items: [],
            member_id: '',
            payment_method: 'cash',
            notes: ''
        });
    };

    const saveForLater = () => {
        if (!activeCart || activeCart.items.length === 0) {
            alert('Please add items to cart');
            return;
        }

        // Transform cart items to the format backend expects
        const cartData = activeCart.items.map(item => ({
            id: item.product.id,
            quantity: item.quantity,
        }));

        const formData = {
            cart: cartData,
            member_id: activeCart.member_id || '',
            total: Number(total), // Ensure total is a number
            payment_method: activeCart.payment_method,
            notes: activeCart.notes,
        };

        console.log('Saving for later with data:', formData);

        router.post(savePending().url, formData, {
            onSuccess: () => {
                removeCart(activeCart.id);
                refreshProducts(); // Refresh products after saving
            },
            onError: (errors) => {
                console.error('Save for later failed:', errors);
                alert('Failed to save transaction. Please try again.');
            },
        });
    };

    // Check if current cart is in edit mode
    const isEditMode = activeCart?.id.startsWith('edit-cart-') || false;

    const updatePendingTransaction = () => {
        if (!activeCart || activeCart.items.length === 0) {
            alert('Please add items to cart');
            return;
        }

        // Extract the original pending transaction ID from the cart ID
        const originalId = activeCart.id.replace('edit-cart-', '');
        
        // Transform cart items to the format backend expects
        const cartData = activeCart.items.map(item => ({
            id: item.product.id,
            quantity: item.quantity,
        }));

        const formData = {
            cart: cartData,
            member_id: activeCart.member_id || '',
            total: Number(total),
            payment_method: activeCart.payment_method,
            notes: activeCart.notes,
        };

        console.log('Updating pending transaction:', originalId, formData);

        router.post(`/pending-sales/${originalId}/update`, formData, {
            onSuccess: () => {
                // Clear the active cart and remove it from the list
                removeCart(activeCart.id);
                refreshProducts();
                // The session will be cleared on the backend, so no need to do it here
            },
            onError: (errors) => {
                console.error('Update failed:', errors);
                alert('Failed to update transaction. Please try again.');
            },
        });
    };

    const openPaymentDialog = () => {
        setReceivedCash('');
        setShowPaymentDialog(true);
    };

    const closePaymentDialog = () => {
        setShowPaymentDialog(false);
        setReceivedCash('');
    };

    const completeCashSale = () => {
        if (!activeCart || activeCart.items.length === 0) {
            alert('Please add items to cart');
            return;
        }

        const receivedAmount = parseFloat(receivedCash);
        if (isNaN(receivedAmount) || receivedAmount < total) {
            alert('Received cash must be at least the total amount');
            return;
        }

        updateActiveCart({ status: 'processing' });

        saleForm.setData({
            cart: activeCart.items.map(item => ({
                id: item.product.id,
                quantity: item.quantity,
            })),
            member_id: activeCart.member_id,
            total: total,
            payment_method: 'cash',
        });

        saleForm.post(sale().url, {
            onSuccess: () => {
                removeCart(activeCart.id);
                refreshProducts();
                closePaymentDialog();
            },
            onError: () => {
                updateActiveCart({ status: 'active' });
                closePaymentDialog();
            },
        });
    };

    const processSale = () => {
        if (!activeCart || activeCart.items.length === 0) {
            alert('Please add items to cart');
            return;
        }

        if (activeCart.payment_method === 'pay_later' && !activeCart.member_id) {
            alert('Please select a member for pay later option');
            return;
        }

        updateActiveCart({ status: 'processing' });

        saleForm.setData({
            cart: activeCart.items.map(item => ({
                id: item.product.id,
                quantity: item.quantity,
            })),
            member_id: activeCart.member_id,
            total: total,
            payment_method: activeCart.payment_method,
        });

        saleForm.post(sale().url, {
            onSuccess: () => {
                removeCart(activeCart.id);
                refreshProducts(); // Refresh products after sale
            },
            onError: () => {
                updateActiveCart({ status: 'active' });
            },
        });
    };

    const setSelectedMemberId = (memberId: string) => {
        updateActiveCart({ member_id: memberId });
    };

    const setPaymentMethod = (method: 'cash' | 'pay_later') => {
        updateActiveCart({ payment_method: method });
    };

    const setTransactionNotes = (notes: string) => {
        updateActiveCart({ notes });
    };

    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `${numAmount.toFixed(2)} VT`;
    };

    // Fullscreen functionality
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            // Target the POS content container instead of the entire document
            if (posContainerRef.current) {
                posContainerRef.current.requestFullscreen().then(() => {
                    setIsFullscreen(true);
                }).catch(err => {
                    console.error('Error attempting to enable fullscreen:', err);
                });
            }
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            }).catch(err => {
                console.error('Error attempting to exit fullscreen:', err);
            });
        }
    };

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            // Check if our POS container is in fullscreen
            setIsFullscreen(document.fullscreenElement === posContainerRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point of Sale" />

            <div ref={posContainerRef} className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Heading
                        title="Point of Sale"
                        description="Process sales and manage transactions"
                    />
                    <Button
                        onClick={toggleFullscreen}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                    >
                        {isFullscreen ? (
                            <>
                                <Minimize className="h-4 w-4" />
                                Exit Fullscreen
                            </>
                        ) : (
                            <>
                                <Maximize className="h-4 w-4" />
                                Fullscreen
                            </>
                        )}
                    </Button>
                </div>

                {/* Cart Management */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Active Carts</CardTitle>
                                <CardDescription>Manage multiple customer transactions</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                {carts.length > 0 && (
                                    <Button onClick={clearAllCarts} variant="outline" size="sm">
                                        <X className="h-4 w-4 mr-2" />
                                        Clear All
                                    </Button>
                                )}
                                <Button onClick={() => createNewCart()} variant="outline">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Cart
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {carts.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>No active carts. Create a new cart to start.</p>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {carts.map((cart) => {
                                    const member = members.find(m => m.id.toString() === cart.member_id);
                                    const cartTotal = cart.items.reduce((sum, item) => sum + item.subtotal, 0);
                                    const isActive = cart.id === activeCartId;

                                    return (
                                        <div
                                            key={cart.id}
                                            className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                isActive
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => switchToCart(cart.id)}
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span className="font-medium">
                                                        {member ? member.name : 'Walk-in'}
                                                    </span>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeCart(cart.id);
                                                    }}
                                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {cart.items.length} items • {formatCurrency(cartTotal)}
                                            </div>
                                            {cart.status === 'processing' && (
                                                <div className="text-xs text-orange-600 mt-1">Processing...</div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {activeCart && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Products Section */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Search */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Products Grid */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Products ({filteredProducts.length})</CardTitle>
                                <CardDescription>Click on products to add to cart</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => addToCart(product)}
                                        >
                                            <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                                            <p className="text-lg font-bold text-green-600 mb-2">
                                                {formatCurrency(product.selling_price)}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Stock: {product.current_stock}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                {filteredProducts.length === 0 && (
                                    <p className="text-center text-gray-500 py-8">No products found</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Cart & Checkout Section */}
                    <div className="space-y-4">
                        {/* Shopping Cart */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShoppingCart className="h-5 w-5" />
                                    {activeCart ? `Cart (${cart.length})` : 'No Active Cart'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {!activeCart ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p>No active cart. Create a new cart to start adding items.</p>
                                        <Button onClick={() => createNewCart()} className="mt-4">
                                            <Plus className="h-4 w-4 mr-2" />
                                            New Cart
                                        </Button>
                                    </div>
                                ) : cart.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4">Cart is empty</p>
                                ) : (
                                    <>
                                        <div className="space-y-2 max-h-64 overflow-y-auto">
                                            {cart.map((item) => (
                                                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">{item.product.name}</p>
                                                        <p className="text-xs text-gray-500">{formatCurrency(item.product.selling_price)} each</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                        >
                                                            -
                                                        </Button>
                                                        <span className="w-8 text-center">{item.quantity}</span>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => removeFromCart(item.product.id)}
                                                        >
                                                            ×
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center font-bold">
                                            <span>Total:</span>
                                            <span className="text-lg text-green-600">{formatCurrency(total)}</span>
                                        </div>
                                        <Button
                                            variant="outline"
                                            onClick={clearActiveCart}
                                            className="w-full"
                                        >
                                            Clear Cart
                                        </Button>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Member Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Member
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="member">Select Member (Optional)</Label>
                                    <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Walk-in customer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {members.map((member) => {
                                                const balance = typeof member.balance === 'string' ? parseFloat(member.balance) : member.balance;
                                                const isOverLimit = balance >= 2000;
                                                return (
                                                    <SelectItem
                                                        key={member.id}
                                                        value={member.id.toString()}
                                                        className={isOverLimit ? 'text-red-600 bg-red-50' : ''}
                                                    >
                                                        <div className="flex items-center justify-between w-full">
                                                            <span>{member.name}</span>
                                                            <span className={`text-xs ${isOverLimit ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                                                                {formatCurrency(member.balance)} unpaid
                                                            </span>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedMemberId && (
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <p className="text-sm font-medium">Selected Member:</p>
                                        <p className="text-sm">
                                            {members.find(m => m.id.toString() === selectedMemberId)?.name}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Current balance: {formatCurrency(members.find(m => m.id.toString() === selectedMemberId)?.balance || 0)}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Payment Method, Notes & Actions - Only show when there's an active cart */}
                        {activeCart && (
                            <>
                                {!isEditMode && (
                                    <>
                                        {/* Payment Method - Only show in normal mode */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <CreditCard className="h-5 w-5" />
                                                    Payment Method
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="space-y-4">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <Button
                                                        variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                                                        onClick={() => setPaymentMethod('cash')}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <CreditCard className="h-4 w-4" />
                                                        Cash
                                                    </Button>
                                                    <Button
                                                        variant={paymentMethod === 'pay_later' ? 'default' : 'outline'}
                                                        onClick={() => setPaymentMethod('pay_later')}
                                                        disabled={!selectedMemberId || !canPayLater}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Clock className="h-4 w-4" />
                                                        Pay Later
                                                    </Button>
                                                </div>

                                                {paymentMethod === 'pay_later' && selectedMemberId && !canPayLater && (
                                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                                        <p className="text-sm text-red-600 font-medium">
                                                            Member cannot use "Pay Later" option
                                                        </p>
                                                        <p className="text-xs text-red-600">
                                                            Unpaid amount is 2000 VT or more
                                                        </p>
                                                    </div>
                                                )}

                                                {paymentMethod === 'pay_later' && !selectedMemberId && (
                                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                                        <p className="text-sm text-yellow-600 font-medium">
                                                            Select a member to use "Pay Later"
                                                        </p>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </>
                                )}

                                {/* Transaction Notes */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Transaction Notes (Optional)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <textarea
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Add notes for this transaction..."
                                            value={transactionNotes}
                                            onChange={(e) => setTransactionNotes(e.target.value)}
                                            rows={2}
                                        />
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <Card>
                                    <CardContent className="pt-6 space-y-3">
                                        {isEditMode ? (
                                            // Edit Mode - Show Update button only
                                            <div className="text-center space-y-3">
                                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                                                    <p className="text-sm text-blue-600 font-medium">
                                                        Editing Pending Transaction #{activeCart.id.replace('edit-cart-', '')}
                                                    </p>
                                                    <p className="text-xs text-blue-600">
                                                        Payment method: {activeCart.payment_method === 'pay_later' ? 'Pay Later' : 'Cash'}
                                                    </p>
                                                </div>
                                                <Button
                                                    onClick={updatePendingTransaction}
                                                    disabled={cart.length === 0}
                                                    size="lg"
                                                    className="flex items-center gap-2"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    Update Transaction
                                                </Button>
                                                <p className="text-xs text-gray-500">
                                                    Update the pending transaction with your changes
                                                </p>
                                            </div>
                                        ) : paymentMethod === 'pay_later' ? (
                                            // Normal Mode - Pay Later
                                            <div className="text-center space-y-3">
                                                <Button
                                                    onClick={saveForLater}
                                                    disabled={cart.length === 0 || saveForm.processing}
                                                    size="lg"
                                                    className="flex items-center gap-2"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    {saveForm.processing ? 'Saving...' : 'Save for Later'}
                                                </Button>
                                                <p className="text-xs text-gray-500">
                                                    Items will be handed over, payment collected later
                                                </p>
                                            </div>
                                        ) : paymentMethod === 'cash' ? (
                                            // Normal Mode - Cash Payment
                                            <div className="text-center space-y-3">
                                                <Button
                                                    onClick={openPaymentDialog}
                                                    disabled={cart.length === 0}
                                                    size="lg"
                                                    className="flex items-center gap-2"
                                                >
                                                    <DollarSign className="h-4 w-4" />
                                                    Pay Now
                                                </Button>
                                                <p className="text-xs text-gray-500">
                                                    Process cash payment and calculate change
                                                </p>
                                            </div>
                                        ) : (
                                            // Normal Mode - No payment method selected
                                            <div className="text-center space-y-3">
                                                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                    <p className="text-sm text-gray-600">
                                                        Select a payment method to continue
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {flash?.success && (
                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-600">{flash.success}</p>
                                    </div>
                                )}

                                {flash?.error && (
                                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{flash.error}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                )}
            </div>

            {/* Payment Dialog */}
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Cash Payment
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="total-amount">Total Amount</Label>
                            <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(total)}
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="received-cash">Received Cash</Label>
                            <Input
                                id="received-cash"
                                type="number"
                                step="0.01"
                                placeholder="Enter received cash amount"
                                value={receivedCash}
                                onChange={(e) => setReceivedCash(e.target.value)}
                                className="text-lg"
                                autoFocus
                            />
                        </div>

                        {receivedCash && parseFloat(receivedCash) >= total && (
                            <div className="space-y-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Change to return:</span>
                                    <span className="text-xl font-bold text-blue-600">
                                        {formatCurrency(parseFloat(receivedCash) - total)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {receivedCash && parseFloat(receivedCash) < total && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">
                                    Insufficient amount. Need at least {formatCurrency(total)}
                                </p>
                            </div>
                        )}
                    </div>
                    
                    <DialogFooter className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={closePaymentDialog}
                            disabled={saleForm.processing}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={completeCashSale}
                            disabled={!receivedCash || parseFloat(receivedCash) < total || saleForm.processing}
                            className="flex items-center gap-2"
                        >
                            <CheckCircle className="h-4 w-4" />
                            {saleForm.processing ? 'Processing...' : 'Complete Transaction'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}