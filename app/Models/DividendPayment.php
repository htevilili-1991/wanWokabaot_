<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DividendPayment extends Model
{
    protected $fillable = [
        'dividend_calculation_id',
        'payment_method',
        'amount',
        'payment_date',
        'reference',
        'notes',
        'processed_by',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'payment_date' => 'date',
    ];

    // Relationships
    public function dividendCalculation(): BelongsTo
    {
        return $this->belongsTo(DividendCalculation::class);
    }

    public function processedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'processed_by');
    }

    // Helper methods
    public function getFormattedAmountAttribute(): string
    {
        return 'VT ' . number_format($this->amount, 2);
    }

    public function getPaymentMethodLabelAttribute(): string
    {
        return match($this->payment_method) {
            'cash' => 'Cash',
            'credit' => 'Credit to Account',
            'bank_transfer' => 'Bank Transfer',
            default => ucfirst($this->payment_method),
        };
    }
}
