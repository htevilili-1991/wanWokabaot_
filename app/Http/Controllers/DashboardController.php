<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\PendingSale;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $kpis = $this->getKPIs();

            // Debug: Log KPIs for troubleshooting
            \Log::info('Dashboard KPIs calculated:', $kpis);

            // Debug: Ensure kpis is not null and has expected structure
            if (! $kpis || ! is_array($kpis)) {
                \Log::warning('KPIs is null or not an array, using defaults');
                $kpis = [
                    'total_members' => 0,
                    'active_members' => 0,
                    'total_products' => 0,
                    'total_inventory_value' => 0,
                    'pending_transactions' => 0,
                    'total_unpaid_amount' => 0,
                    'total_sales' => 0,
                ];
            }

            return inertia('dashboard', [
                'kpis' => $kpis,
                'salesChart' => $this->getSalesChartData(),
                'annualSalesChart' => $this->getAnnualSalesChartData(),
                'inventoryChart' => $this->getInventoryChartData(),
                'memberChart' => $this->getMemberChartData(),
                'recentSales' => $this->getRecentSales(),
                'lowStockItems' => $this->getLowStockItems(),
                'topProducts' => $this->getTopProducts(),
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Dashboard controller error: '.$e->getMessage());
            \Log::error('Dashboard error stack trace: '.$e->getTraceAsString());

            // If there's any error, return default data
            return inertia('dashboard', [
                'kpis' => [
                    'total_members' => 0,
                    'active_members' => 0,
                    'total_products' => 0,
                    'total_inventory_value' => 0,
                    'pending_transactions' => 0,
                    'total_unpaid_amount' => 0,
                    'total_sales' => 0,
                ],
                'salesChart' => ['categories' => [], 'data' => []],
                'annualSalesChart' => ['categories' => [], 'data' => []],
                'inventoryChart' => ['categories' => [], 'data' => []],
                'memberChart' => [
                    'growth' => ['categories' => [], 'data' => []],
                    'balance_distribution' => ['categories' => [], 'data' => []],
                ],
                'recentSales' => [],
                'lowStockItems' => [],
                'topProducts' => [],
            ]);
        }
    }

    private function getKPIs()
    {
        try {
            $totalMembers = Member::count();
            $activeMembers = Member::where('status', 'Active')->count();
            $totalProducts = Product::count();
            $totalInventoryValue = Product::sum(DB::raw('cost_price * current_stock')) ?? 0;
            $pendingTransactions = PendingSale::where('status', 'pending')->count();
            $totalUnpaidAmount = Member::sum('balance') ?? 0;

            // Calculate total sales (all completed sales)
            $totalSales = PendingSale::where('status', 'completed')->sum('subtotal') ?? 0;

            $result = [
                'total_members' => $totalMembers,
                'active_members' => $activeMembers,
                'total_products' => $totalProducts,
                'total_inventory_value' => $totalInventoryValue,
                'pending_transactions' => $pendingTransactions,
                'total_unpaid_amount' => $totalUnpaidAmount,
                'total_sales' => $totalSales,
            ];

            \Log::info('KPIs calculated successfully:', $result);

            return $result;
        } catch (\Exception $e) {
            \Log::error('getKPIs error: '.$e->getMessage());

            // Return default values if database is not available
            return [
                'total_members' => 0,
                'active_members' => 0,
                'total_products' => 0,
                'total_inventory_value' => 0,
                'pending_transactions' => 0,
                'total_unpaid_amount' => 0,
                'total_sales' => 0,
            ];
        }
    }

    private function getSalesChartData()
    {
        try {
            // Get sales data for the last 30 days
            $salesData = PendingSale::where('status', 'completed')
                ->where('completed_at', '>=', Carbon::now()->subDays(30))
                ->selectRaw('DATE(completed_at) as date, SUM(subtotal) as total')
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            $categories = [];
            $data = [];

            for ($i = 29; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i)->format('Y-m-d');
                $categories[] = Carbon::now()->subDays($i)->format('M d');

                $sale = $salesData->firstWhere('date', $date);
                $data[] = $sale ? (float) $sale->total : 0;
            }

            return [
                'categories' => $categories,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'categories' => [],
                'data' => [],
            ];
        }
    }

    private function getAnnualSalesChartData()
    {
        try {
            // Get sales data for the last 12 months
            $salesData = PendingSale::where('status', 'completed')
                ->where('completed_at', '>=', Carbon::now()->subMonths(12))
                ->selectRaw('YEAR(completed_at) as year, MONTH(completed_at) as month, SUM(subtotal) as total')
                ->groupBy('year', 'month')
                ->orderBy('year')
                ->orderBy('month')
                ->get();

            $categories = [];
            $data = [];

            for ($i = 11; $i >= 0; $i--) {
                $date = Carbon::now()->subMonths($i);
                $categories[] = $date->format('M Y');
                
                $year = $date->year;
                $month = $date->month;
                
                $sale = $salesData->where('year', $year)->where('month', $month)->first();
                $data[] = $sale ? (float) $sale->total : 0;
            }

            return [
                'categories' => $categories,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'categories' => [],
                'data' => [],
            ];
        }
    }

    private function getInventoryChartData()
    {
        try {
            $inventoryData = Product::selectRaw('category, SUM(current_stock) as total_stock, COUNT(*) as product_count')
                ->where('current_stock', '>', 0)
                ->groupBy('category')
                ->get();

            return [
                'categories' => $inventoryData->pluck('category')->toArray(),
                'data' => $inventoryData->pluck('total_stock')->map(fn ($val) => (int) $val)->toArray(),
            ];
        } catch (\Exception $e) {
            return [
                'categories' => [],
                'data' => [],
            ];
        }
    }

    private function getMemberChartData()
    {
        try {
            // Member growth over time (last 30 days)
            $memberGrowth = Member::where('created_at', '>=', Carbon::now()->subDays(30))
                ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
                ->groupBy('date')
                ->orderBy('date')
                ->get();

            $growthCategories = [];
            $growthData = [];

            for ($i = 29; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i)->format('Y-m-d');
                $growthCategories[] = Carbon::now()->subDays($i)->format('M d');

                $growth = $memberGrowth->firstWhere('date', $date);
                $growthData[] = $growth ? (int) $growth->count : 0;
            }

            // Balance distribution
            $balanceRanges = [
                '0-500' => Member::whereBetween('balance', [0, 500])->count(),
                '501-1000' => Member::whereBetween('balance', [501, 1000])->count(),
                '1001-1500' => Member::whereBetween('balance', [1001, 1500])->count(),
                '1501-2000' => Member::whereBetween('balance', [1501, 2000])->count(),
                '2000+' => Member::where('balance', '>', 2000)->count(),
            ];

            return [
                'growth' => [
                    'categories' => $growthCategories,
                    'data' => $growthData,
                ],
                'balance_distribution' => [
                    'categories' => array_keys($balanceRanges),
                    'data' => array_values($balanceRanges),
                ],
            ];
        } catch (\Exception $e) {
            return [
                'growth' => [
                    'categories' => [],
                    'data' => [],
                ],
                'balance_distribution' => [
                    'categories' => [],
                    'data' => [],
                ],
            ];
        }
    }

    private function getRecentSales()
    {
        try {
            return PendingSale::with(['member', 'creator'])
                ->where('status', 'completed')
                ->orderBy('completed_at', 'desc')
                ->limit(10)
                ->get()
                ->map(function ($sale) {
                    return [
                        'id' => $sale->id,
                        'member_name' => $sale->member->name ?? 'N/A',
                        'total' => $sale->subtotal,
                        'completed_at' => $sale->completed_at->format('M d, Y H:i'),
                        'cashier' => $sale->creator->name ?? 'N/A',
                    ];
                });
        } catch (\Exception $e) {
            return [];
        }
    }

    private function getLowStockItems()
    {
        try {
            return Product::whereColumn('current_stock', '<=', 'minimum_stock')
                ->orderBy('current_stock')
                ->limit(10)
                ->get(['id', 'name', 'current_stock', 'minimum_stock', 'category']);
        } catch (\Exception $e) {
            return [];
        }
    }

    private function getTopProducts()
    {
        try {
            // This would require a proper sales items table, for now return products with highest stock
            return Product::orderBy('current_stock', 'desc')
                ->limit(5)
                ->get(['id', 'name', 'current_stock', 'selling_price', 'category']);
        } catch (\Exception $e) {
            return [];
        }
    }
}
