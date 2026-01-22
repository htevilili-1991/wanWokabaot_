<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\PendingSale;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ReportsController extends Controller
{
    public function index()
    {
        return inertia('reports/index');
    }

    public function generate(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:sales,inventory,members,transactions',
            'format' => 'required|string|in:csv,pdf',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'period' => 'nullable|string|in:week,month,year,all',
        ]);

        $startDate = $this->parseStartDate($request);
        $endDate = $this->parseEndDate($request);

        $method = 'generate'.ucfirst($request->type).'Report';
        $data = $this->$method($startDate, $endDate);

        if ($request->format === 'csv') {
            return $this->exportCsv($data, $request->type, $startDate, $endDate);
        } else {
            return $this->exportPdf($data, $request->type, $startDate, $endDate);
        }
    }

    private function generateSalesReport($startDate, $endDate)
    {
        $sales = PendingSale::with(['member', 'creator'])
            ->where('status', 'completed')
            ->when($startDate, fn ($q) => $q->where('completed_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->where('completed_at', '<=', $endDate))
            ->orderBy('completed_at', 'desc')
            ->get();

        return [
            'headers' => ['Date', 'Transaction ID', 'Member', 'Cashier', 'Items Count', 'Total Amount'],
            'rows' => $sales->map(function ($sale) {
                return [
                    $sale->completed_at->format('Y-m-d H:i'),
                    $sale->transaction_id ?? 'N/A',
                    $sale->member->name ?? 'N/A',
                    $sale->creator->name ?? 'N/A',
                    count($sale->items),
                    'VT '.number_format($sale->subtotal, 2),
                ];
            }),
            'summary' => [
                'Total Sales' => $sales->count(),
                'Total Revenue' => 'VT '.number_format($sales->sum('subtotal'), 2),
                'Average Sale' => $sales->count() > 0 ? 'VT '.number_format($sales->avg('subtotal'), 2) : 'VT 0.00',
            ],
        ];
    }

    private function generateInventoryReport($startDate, $endDate)
    {
        $products = Product::with('category')
            ->orderBy('category')
            ->orderBy('name')
            ->get();

        return [
            'headers' => ['Category', 'Product Name', 'Cost Price', 'Selling Price', 'Current Stock', 'Minimum Stock', 'Stock Value', 'Status'],
            'rows' => $products->map(function ($product) {
                $stockValue = $product->cost_price * $product->current_stock;
                $status = $product->current_stock <= $product->minimum_stock ? 'Low Stock' : 'In Stock';

                return [
                    $product->category,
                    $product->name,
                    'VT '.number_format($product->cost_price, 2),
                    'VT '.number_format($product->selling_price, 2),
                    $product->current_stock,
                    $product->minimum_stock,
                    'VT '.number_format($stockValue, 2),
                    $status,
                ];
            }),
            'summary' => [
                'Total Products' => $products->count(),
                'Total Stock Value' => 'VT '.number_format($products->sum(fn ($p) => $p->cost_price * $p->current_stock), 2),
                'Low Stock Items' => $products->where('current_stock', '<=', \DB::raw('minimum_stock'))->count(),
                'Out of Stock' => $products->where('current_stock', 0)->count(),
            ],
        ];
    }

    private function generateMembersReport($startDate, $endDate)
    {
        $members = Member::orderBy('status')
            ->orderBy('name')
            ->get();

        return [
            'headers' => ['Name', 'Email', 'Phone', 'Member Code', 'Status', 'Join Date', 'Total Spent', 'Current Balance'],
            'rows' => $members->map(function ($member) {
                return [
                    $member->name,
                    $member->email,
                    $member->phone ?? 'N/A',
                    $member->member_code,
                    $member->status,
                    $member->join_date->format('Y-m-d'),
                    'VT '.number_format($member->total_spent, 2),
                    'VT '.number_format($member->balance, 2),
                ];
            }),
            'summary' => [
                'Total Members' => $members->count(),
                'Active Members' => $members->where('status', 'Active')->count(),
                'Suspended Members' => $members->where('status', 'Suspended')->count(),
                'Inactive Members' => $members->where('status', 'Inactive')->count(),
                'Total Member Balances' => 'VT '.number_format($members->sum('balance'), 2),
                'Total Member Spending' => 'VT '.number_format($members->sum('total_spent'), 2),
            ],
        ];
    }

    private function generateTransactionsReport($startDate, $endDate)
    {
        $transactions = PendingSale::with(['member', 'creator'])
            ->when($startDate, fn ($q) => $q->where('created_at', '>=', $startDate))
            ->when($endDate, fn ($q) => $q->where('created_at', '<=', $endDate))
            ->orderBy('created_at', 'desc')
            ->get();

        return [
            'headers' => ['Date', 'Transaction ID', 'Member', 'Cashier', 'Status', 'Payment Method', 'Items Count', 'Total Amount'],
            'rows' => $transactions->map(function ($transaction) {
                return [
                    $transaction->created_at->format('Y-m-d H:i'),
                    $transaction->transaction_id ?? 'N/A',
                    $transaction->member->name ?? 'N/A',
                    $transaction->creator->name ?? 'N/A',
                    ucfirst($transaction->status),
                    ucfirst(str_replace('_', ' ', $transaction->payment_method ?? 'N/A')),
                    count($transaction->items),
                    'VT '.number_format($transaction->subtotal, 2),
                ];
            }),
            'summary' => [
                'Total Transactions' => $transactions->count(),
                'Completed Transactions' => $transactions->where('status', 'completed')->count(),
                'Pending Transactions' => $transactions->where('status', 'pending')->count(),
                'Cancelled Transactions' => $transactions->where('status', 'cancelled')->count(),
                'Cash Payments' => $transactions->where('payment_method', 'cash')->count(),
                'Pay Later Payments' => $transactions->where('payment_method', 'pay_later')->count(),
                'Total Transaction Value' => 'VT '.number_format($transactions->sum('subtotal'), 2),
            ],
        ];
    }

    private function exportCsv($data, $type, $startDate, $endDate)
    {
        $filename = $type.'_report_'.($startDate ? $startDate->format('Y-m-d') : 'all').'_to_'.($endDate ? $endDate->format('Y-m-d') : 'all').'.csv';

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');

            // Write headers
            fputcsv($file, $data['headers']);

            // Write data rows
            foreach ($data['rows'] as $row) {
                fputcsv($file, $row);
            }

            // Write summary
            fputcsv($file, []); // Empty row
            fputcsv($file, ['SUMMARY']);
            foreach ($data['summary'] as $key => $value) {
                fputcsv($file, [$key, $value]);
            }

            fclose($file);
        };

        return Response::stream($callback, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }

    private function exportPdf($data, $type, $startDate, $endDate)
    {
        $filename = $type.'_report_'.($startDate ? $startDate->format('Y-m-d') : 'all').'_to_'.($endDate ? $endDate->format('Y-m-d') : 'all').'.html';

        // For now, return HTML that can be saved as PDF
        // In production, you would use a proper PDF library
        $html = $this->generateHtmlReport($data, $type, $startDate, $endDate);

        return Response::make($html, 200, [
            'Content-Type' => 'text/html',
            'Content-Disposition' => 'attachment; filename="'.$filename.'"',
        ]);
    }

    private function generateHtmlReport($data, $type, $startDate, $endDate)
    {
        $title = ucfirst($type).' Report';
        $period = $startDate && $endDate ?
            'From '.$startDate->format('M d, Y').' to '.$endDate->format('M d, Y') :
            'All Time';

        $html = '
        <!DOCTYPE html>
        <html>
        <head>
            <title>'.$title.'</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1, h2 { color: #333; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                .summary { background-color: #e8f4fd; padding: 15px; border-radius: 5px; }
                .summary h3 { margin-top: 0; }
                .summary p { margin: 5px 0; }
            </style>
        </head>
        <body>
            <h1>'.$title.'</h1>
            <p><strong>Period:</strong> '.$period.'</p>
            <p><strong>Generated:</strong> '.now()->format('M d, Y H:i').'</p>

            <h2>Data</h2>
            <table>
                <thead>
                    <tr>';

        foreach ($data['headers'] as $header) {
            $html .= '<th>'.$header.'</th>';
        }

        $html .= '
                    </tr>
                </thead>
                <tbody>';

        foreach ($data['rows'] as $row) {
            $html .= '<tr>';
            foreach ($row as $cell) {
                $html .= '<td>'.$cell.'</td>';
            }
            $html .= '</tr>';
        }

        $html .= '
                </tbody>
            </table>

            <div class="summary">
                <h3>Summary</h3>';

        foreach ($data['summary'] as $key => $value) {
            $html .= '<p><strong>'.$key.':</strong> '.$value.'</p>';
        }

        $html .= '
            </div>
        </body>
        </html>';

        return $html;
    }

    private function parseStartDate(Request $request)
    {
        if ($request->start_date) {
            return Carbon::parse($request->start_date)->startOfDay();
        }

        switch ($request->period) {
            case 'week':
                return now()->startOfWeek();
            case 'month':
                return now()->startOfMonth();
            case 'year':
                return now()->startOfYear();
            default:
                return null;
        }
    }

    private function parseEndDate(Request $request)
    {
        if ($request->end_date) {
            return Carbon::parse($request->end_date)->endOfDay();
        }

        switch ($request->period) {
            case 'week':
                return now()->endOfWeek();
            case 'month':
                return now()->endOfMonth();
            case 'year':
                return now()->endOfYear();
            default:
                return null;
        }
    }
}
