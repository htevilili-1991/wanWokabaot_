import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface RecentSale {
    id: number;
    member_name: string;
    total: number | string;
    completed_at: string;
    cashier: string;
}

interface LowStockItem {
    id: number;
    name: string;
    current_stock: number;
    minimum_stock: number;
    category: string;
}

interface TopProduct {
    id: number;
    name: string;
    current_stock: number;
    selling_price: number | string;
    category: string;
}

interface SummaryTablesProps {
    recentSales: RecentSale[];
    lowStockItems: LowStockItem[];
    topProducts: TopProduct[];
}

export function SummaryTables({ recentSales, lowStockItems, topProducts }: SummaryTablesProps) {
    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `VT ${numAmount.toFixed(2)}`;
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Sales */}
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>Latest completed transactions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Member</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Cashier</TableHead>
                                <TableHead>Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentSales.map((sale) => (
                                <TableRow key={sale.id}>
                                    <TableCell className="font-medium">{sale.member_name}</TableCell>
                                    <TableCell>{formatCurrency(sale.total)}</TableCell>
                                    <TableCell>{sale.cashier}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {sale.completed_at}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {recentSales.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        No recent sales
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Low Stock Alert
                        {lowStockItems.length > 0 && (
                            <Badge variant="destructive" className="text-xs">
                                {lowStockItems.length}
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription>Items below minimum stock</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lowStockItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-muted-foreground">{item.category}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={item.current_stock === 0 ? "destructive" : "secondary"}>
                                            {item.current_stock}/{item.minimum_stock}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {lowStockItems.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center text-muted-foreground">
                                        All items in stock
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Top Products */}
            <Card className="md:col-span-3">
                <CardHeader>
                    <CardTitle>Top Products</CardTitle>
                    <CardDescription>Products with highest stock levels</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{formatCurrency(product.selling_price)}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.current_stock}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}