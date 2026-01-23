<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\PendingSale;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;

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
            'format' => 'required|string|in:pdf',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'period' => 'nullable|string|in:week,month,year,all',
        ]);

        $startDate = $this->parseStartDate($request);
        $endDate = $this->parseEndDate($request);

        $method = 'generate'.ucfirst($request->type).'Report';
        $data = $this->$method($startDate, $endDate);

        return $this->exportPdf($data, $request->type, $startDate, $endDate);
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

    private function exportPdf($data, $type, $startDate, $endDate)
    {
        $filename = $type.'_report_'.($startDate ? $startDate->format('Y-m-d') : 'all').'_to_'.($endDate ? $endDate->format('Y-m-d') : 'all').'.pdf';

        $html = $this->generateHtmlReport($data, $type, $startDate, $endDate);

        $pdf = Pdf::loadHTML($html);

        return $pdf->download($filename);
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
            <meta charset="UTF-8">
            <style>
                @page { margin: 1in; }
                body {
                    font-family: "DejaVu Sans", "Arial", sans-serif;
                    font-size: 12px;
                    line-height: 1.4;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #333;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #333;
                    font-size: 24px;
                    margin: 0 0 10px 0;
                    font-weight: bold;
                }
                .header p {
                    margin: 5px 0;
                    color: #666;
                }
                .info-table {
                    width: 100%;
                    margin-bottom: 30px;
                    border-collapse: collapse;
                }
                .info-table td {
                    padding: 5px 0;
                    border: none;
                }
                .info-table td:first-child {
                    font-weight: bold;
                    width: 120px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 11px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px 4px;
                    text-align: left;
                    vertical-align: top;
                }
                th {
                    background-color: #f8f9fa;
                    font-weight: bold;
                    color: #333;
                }
                tr:nth-child(even) {
                    background-color: #f8f9fa;
                }
                .summary {
                    background-color: #e8f4fd;
                    padding: 20px;
                    border-radius: 5px;
                    margin-top: 30px;
                    border: 1px solid #b3d9ff;
                }
                .summary h3 {
                    margin-top: 0;
                    color: #0066cc;
                    font-size: 16px;
                    border-bottom: 1px solid #b3d9ff;
                    padding-bottom: 10px;
                }
                .summary-grid {
                    display: table;
                    width: 100%;
                }
                .summary-row {
                    display: table-row;
                }
                .summary-cell {
                    display: table-cell;
                    padding: 5px 10px;
                    vertical-align: top;
                }
                .summary-cell:first-child {
                    font-weight: bold;
                    width: 200px;
                }
                .footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 10px;
                    color: #666;
                    border-top: 1px solid #ddd;
                    padding-top: 20px;
                }
                .company-info {
                    text-align: center;
                    margin-bottom: 20px;
                    font-size: 14px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="company-info">
                <h2>Wan Wokabaot Cooperative</h2>
                <p>Retail Management System Report</p>
            </div>

            <div class="header">
                <h1>'.$title.'</h1>
                <table class="info-table">
                    <tr>
                        <td>Report Type:</td>
                        <td>'.ucfirst($type).'</td>
                    </tr>
                    <tr>
                        <td>Period:</td>
                        <td>'.$period.'</td>
                    </tr>
                    <tr>
                        <td>Generated:</td>
                        <td>'.now()->format('M d, Y H:i:s').'</td>
                    </tr>
                    <tr>
                        <td>Total Records:</td>
                        <td>'.count($data['rows']).'</td>
                    </tr>
                </table>
            </div>

            <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Report Data</h2>
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

        foreach ($data['rows'] as $index => $row) {
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
                <h3>Report Summary</h3>
                <div class="summary-grid">';

        foreach ($data['summary'] as $key => $value) {
            $html .= '
                    <div class="summary-row">
                        <div class="summary-cell">'.$key.':</div>
                        <div class="summary-cell"><strong>'.$value.'</strong></div>
                    </div>';
        }

        $html .= '
                </div>
            </div>

            <div class="footer">
                <p>This report was generated automatically by the Wan Wokabaot Retail Management System.</p>
                <p>Confidential - For internal use only.</p>
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
