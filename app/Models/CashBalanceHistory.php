<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class CashBalanceHistory extends Model
{
    protected $fillable = [
        'cash_box_id',
        'old_balance',
        'new_balance',
        'difference',
        'transaction_type',
        'reason',
        'updated_by',
        'transactionable_id',
        'transactionable_type',
    ];

    protected $casts = [
        'old_balance' => 'decimal:2',
        'new_balance' => 'decimal:2',
        'difference' => 'decimal:2',
    ];

    /**
     * Get the cash box
     */
    public function cashBox(): BelongsTo
    {
        return $this->belongsTo(CashBox::class);
    }

    /**
     * Get the user who made the change
     */
    public function updatedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the related transaction model
     */
    public function transactionable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Format difference display with sign
     */
    public function getFormattedDifferenceAttribute(): string
    {
        $sign = $this->difference >= 0 ? '+' : '-';
        return 'VT ' . $sign . number_format(abs($this->difference), 2);
    }

    /**
     * Get transaction type label
     */
    public function getTransactionTypeLabelAttribute(): string
    {
        return match($this->transaction_type) {
            'transfer_in' => 'Transfer In',
            'transfer_out' => 'Transfer Out',
            'sale' => 'Sale',
            'expense' => 'Expense',
            'adjustment' => 'Manual Adjustment',
            default => ucfirst($this->transaction_type),
        };
    }
}
