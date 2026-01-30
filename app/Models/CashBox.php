<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class CashBox extends Model
{
    protected $fillable = [
        'name',
        'location',
        'description',
        'current_balance',
        'is_active',
        'is_primary',
        'opening_hours',
    ];

    protected $casts = [
        'current_balance' => 'decimal:2',
        'is_active' => 'boolean',
        'is_primary' => 'boolean',
        'opening_hours' => 'array',
    ];

    /**
     * Get transfers sent from this cash box
     */
    public function transfersFrom(): HasMany
    {
        return $this->hasMany(CashTransfer::class, 'from_cash_box_id');
    }

    /**
     * Get transfers received by this cash box
     */
    public function transfersTo(): HasMany
    {
        return $this->hasMany(CashTransfer::class, 'to_cash_box_id');
    }

    /**
     * Get all transfers involving this cash box
     */
    public function allTransfers(): HasMany
    {
        return $this->hasMany(CashTransfer::class)
            ->where(function ($query) {
                $query->where('from_cash_box_id', $this->id)
                    ->orWhere('to_cash_box_id', $this->id);
            });
    }

    /**
     * Get balance history
     */
    public function balanceHistories(): HasMany
    {
        return $this->hasMany(CashBalanceHistory::class);
    }

    /**
     * Update balance (for manual adjustments)
     */
    public function updateBalance(float $newBalance, ?string $reason = null, $updatedBy = null): void
    {
        $oldBalance = $this->current_balance;
        $this->current_balance = $newBalance;
        $this->save();

        // Log the balance change
        CashBalanceHistory::create([
            'cash_box_id' => $this->id,
            'old_balance' => $oldBalance,
            'new_balance' => $newBalance,
            'difference' => $newBalance - $oldBalance,
            'transaction_type' => 'adjustment',
            'reason' => $reason,
            'updated_by' => $updatedBy ?? auth()->id(),
        ]);
    }

    /**
     * Add funds to cash box
     */
    public function addFunds(float $amount, ?string $reason = null, $updatedBy = null): void
    {
        $this->current_balance += $amount;
        $this->save();
    }

    /**
     * Remove funds from cash box
     */
    public function removeFunds(float $amount, ?string $reason = null, $updatedBy = null): void
    {
        if ($amount > $this->current_balance) {
            throw new \Exception('Insufficient funds in cash box');
        }
        $this->current_balance -= $amount;
        $this->save();
    }

    /**
     * Get the primary cash box
     */
    public static function getPrimary(): ?self
    {
        return static::where('is_primary', true)->where('is_active', true)->first();
    }

    /**
     * Format balance display
     */
    public function getFormattedBalanceAttribute(): string
    {
        return 'VT ' . number_format($this->current_balance, 2);
    }
}
