<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DividendPeriod extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'total_profit',
        'dividend_rate',
        'total_dividends',
        'status',
        'notes',
        'created_by',
        'calculated_at',
        'approved_at',
        'paid_at',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_profit' => 'decimal:2',
        'dividend_rate' => 'decimal:2',
        'total_dividends' => 'decimal:2',
        'calculated_at' => 'datetime',
        'approved_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    // Relationships
    public function calculations(): HasMany
    {
        return $this->hasMany(DividendCalculation::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Helper methods
    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isCalculated(): bool
    {
        return $this->status === 'calculated';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    public function getTotalAvailableProfitAttribute(): float
    {
        return $this->total_profit * ($this->dividend_rate / 100);
    }

    public function calculateDividends(): void
    {
        // Get total purchases for all members in this period
        $totalPurchases = \DB::table('pending_sales')
            ->join('members', 'pending_sales.member_id', '=', 'members.id')
            ->whereBetween('pending_sales.created_at', [$this->start_date, $this->end_date])
            ->where('pending_sales.status', 'completed')
            ->sum('pending_sales.subtotal');

        if ($totalPurchases == 0) {
            return; // No purchases, no dividends
        }

        $availableProfit = $this->getTotalAvailableProfitAttribute();

        // Get all active members with their purchases
        $memberPurchases = \DB::table('pending_sales')
            ->select('member_id', \DB::raw('SUM(subtotal) as total_purchases'))
            ->join('members', 'pending_sales.member_id', '=', 'members.id')
            ->whereBetween('pending_sales.created_at', [$this->start_date, $this->end_date])
            ->where('pending_sales.status', 'completed')
            ->where('members.status', 'Active')
            ->groupBy('member_id')
            ->get();

        $totalDividends = 0;

        foreach ($memberPurchases as $memberPurchase) {
            $dividendAmount = ($memberPurchase->total_purchases / $totalPurchases) * $availableProfit;

            DividendCalculation::updateOrCreate(
                [
                    'dividend_period_id' => $this->id,
                    'member_id' => $memberPurchase->member_id,
                ],
                [
                    'total_purchases' => $memberPurchase->total_purchases,
                    'calculated_dividend' => $dividendAmount,
                    'status' => 'pending',
                ]
            );

            $totalDividends += $dividendAmount;
        }

        $this->update([
            'total_dividends' => $totalDividends,
            'calculated_at' => now(),
            'status' => 'calculated',
        ]);
    }
}
