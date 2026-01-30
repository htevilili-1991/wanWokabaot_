import { Head } from '@inertiajs/react';
import { Users, Package, CreditCard, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

import { KpiCard } from '@/components/dashboard/kpi-card';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { InventoryChart } from '@/components/dashboard/inventory-chart';
import { MemberChart } from '@/components/dashboard/member-chart';
import { SummaryTables } from '@/components/dashboard/summary-tables';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    kpis?: {
        total_members: number;
        active_members: number;
        total_products: number;
        total_inventory_value: number | string;
        pending_transactions: number;
        total_unpaid_amount: number | string;
        total_sales: number | string;
    };
    salesChart?: {
        categories: string[];
        data: number[];
    };
    annualSalesChart?: {
        categories: string[];
        data: number[];
    };
    inventoryChart?: {
        categories: string[];
        data: number[];
    };
    memberChart?: {
        growth: {
            categories: string[];
            data: number[];
        };
        balance_distribution: {
            categories: string[];
            data: number[];
        };
    };
    recentSales?: Array<{
        id: number;
        member_name: string;
        total: number | string;
        completed_at: string;
        cashier: string;
    }>;
    lowStockItems?: Array<{
        id: number;
        name: string;
        current_stock: number;
        minimum_stock: number;
        category: string;
    }>;
    topProducts?: Array<{
        id: number;
        name: string;
        current_stock: number;
        selling_price: number | string;
        category: string;
    }>;
}

export default function Dashboard({
    kpis,
    salesChart,
    annualSalesChart,
    inventoryChart,
    memberChart,
    recentSales,
    lowStockItems,
    topProducts,
}: DashboardProps) {
    // Provide default values if kpis is undefined
    const defaultKpis = {
        total_members: 0,
        active_members: 0,
        total_products: 0,
        total_inventory_value: 0,
        pending_transactions: 0,
        total_unpaid_amount: 0,
        total_sales: 0,
    };

    const safeKpis = kpis || defaultKpis;

    // Provide default values for chart data
    const defaultChartData = { categories: [], data: [] };
    const safeSalesChart = salesChart || defaultChartData;
    const safeInventoryChart = inventoryChart || defaultChartData;
    const safeMemberChart = memberChart || {
        growth: defaultChartData,
        balance_distribution: defaultChartData,
    };
    const safeRecentSales = recentSales || [];
    const safeLowStockItems = lowStockItems || [];
    const safeTopProducts = topProducts || [];

    const formatCurrency = (amount: number | string) => {
        const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
        return `VT ${(isNaN(numAmount) ? '0.00' : numAmount.toFixed(2))}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                {/* KPI Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <KpiCard
                        title="Total Members"
                        value={safeKpis.total_members}
                        icon={Users}
                        description={`${safeKpis.active_members} active`}
                        trend={{ value: 12, isPositive: true }}
                    />
                    <KpiCard
                        title="Inventory Value"
                        value={formatCurrency(safeKpis.total_inventory_value)}
                        icon={Package}
                        description={`${safeKpis.total_products} products`}
                        trend={{ value: 8, isPositive: true }}
                    />
                    <KpiCard
                        title="Total Sales"
                        value={formatCurrency(safeKpis.total_sales)}
                        icon={DollarSign}
                        description="Completed transactions"
                        trend={{ value: 15, isPositive: true }}
                    />
                    <KpiCard
                        title="Total Unpaid"
                        value={formatCurrency(safeKpis.total_unpaid_amount)}
                        icon={AlertTriangle}
                        description={`${safeKpis.pending_transactions} pending`}
                        trend={{ value: -5, isPositive: false }}
                    />
                </div>

                {/* Charts Row */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="md:col-span-2">
                        <SalesChart data={safeSalesChart} annualData={annualSalesChart} />
                    </div>
                    <div>
                        <InventoryChart data={safeInventoryChart} />
                    </div>
                </div>

                {/* Member Chart */}
                <div className="grid gap-6 md:grid-cols-1">
                    <MemberChart data={safeMemberChart} />
                </div>

                {/* Summary Tables */}
                <SummaryTables
                    recentSales={safeRecentSales}
                    lowStockItems={safeLowStockItems}
                    topProducts={safeTopProducts}
                />
            </div>
        </AppLayout>
    );
}
