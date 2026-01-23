<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DividendCalculation extends Model
{
    protected $fillable = [
        'dividend_period_id',
        'member_id',
        'total_purchases',
        'calculated_dividend',
        'paid_amount',
        'status',
        'notes',
        'approved_at',
        'paid_at',
    ];

    protected $casts = [
        'total_purchases' => 'decimal:2',
        'calculated_dividend' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'approved_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    // Relationships
    public function dividendPeriod(): BelongsTo
    {
        return $this->belongsTo(DividendPeriod::class);
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(DividendPayment::class);
    }

    // Helper methods
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isPaid(): bool
    {
        return $this->status === 'paid';
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function getRemainingAmountAttribute(): float
    {
        return $this->calculated_dividend - $this->paid_amount;
    }

    public function approve(): void
    {
        $this->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);
    }

    public function markAsPaid(float $amount = null): void
    {
        $amount = $amount ?? $this->getRemainingAmountAttribute();
        $this->update([
            'paid_amount' => $this->paid_amount + $amount,
            'status' => ($this->paid_amount + $amount >= $this->calculated_dividend) ? 'paid' : 'approved',
            'paid_at' => now(),
        ]);
    }
}
