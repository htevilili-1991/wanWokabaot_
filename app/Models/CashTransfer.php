<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CashTransfer extends Model
{
    protected $fillable = [
        'from_cash_box_id',
        'to_cash_box_id',
        'amount',
        'reference_number',
        'reason',
        'transferred_by',
        'approved_by',
        'transferred_at',
        'status',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transferred_at' => 'datetime',
    ];

    /**
     * Get the source cash box
     */
    public function fromCashBox(): BelongsTo
    {
        return $this->belongsTo(CashBox::class, 'from_cash_box_id');
    }

    /**
     * Get the destination cash box
     */
    public function toCashBox(): BelongsTo
    {
        return $this->belongsTo(CashBox::class, 'to_cash_box_id');
    }

    /**
     * Get the user who made the transfer
     */
    public function transferredByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'transferred_by');
    }

    /**
     * Get the user who approved the transfer
     */
    public function approvedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    /**
     * Boot the model and generate reference number
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($transfer) {
            if (empty($transfer->reference_number)) {
                $transfer->reference_number = 'TRF-' . date('Ymd') . '-' . str_pad(static::count() + 1, 4, '0', STR_PAD_LEFT);
            }
            if (empty($transfer->transferred_at)) {
                $transfer->transferred_at = now();
            }
        });
    }

    /**
     * Complete the transfer
     */
    public function complete(): bool
    {
        if ($this->status !== 'pending') {
            return false;
        }

        \DB::beginTransaction();
        try {
            // Remove funds from source cash box
            $this->fromCashBox->removeFunds($this->amount, "Transfer to {$this->toCashBox->name} (Ref: {$this->reference_number})");
            
            // Add funds to destination cash box
            $this->toCashBox->addFunds($this->amount, "Transfer from {$this->fromCashBox->name} (Ref: {$this->reference_number})");
            
            // Update transfer status
            $this->status = 'completed';
            $this->save();
            
            // Log transfer in balance history
            CashBalanceHistory::create([
                'cash_box_id' => $this->from_cash_box_id,
                'old_balance' => $this->fromCashBox->current_balance + $this->amount,
                'new_balance' => $this->fromCashBox->current_balance,
                'difference' => -$this->amount,
                'transaction_type' => 'transfer_out',
                'reason' => "Transfer to {$this->toCashBox->name}",
                'updated_by' => $this->transferred_by,
                'transactionable_id' => $this->id,
                'transactionable_type' => CashTransfer::class,
            ]);

            CashBalanceHistory::create([
                'cash_box_id' => $this->to_cash_box_id,
                'old_balance' => $this->toCashBox->current_balance - $this->amount,
                'new_balance' => $this->toCashBox->current_balance,
                'difference' => $this->amount,
                'transaction_type' => 'transfer_in',
                'reason' => "Transfer from {$this->fromCashBox->name}",
                'updated_by' => $this->transferred_by,
                'transactionable_id' => $this->id,
                'transactionable_type' => CashTransfer::class,
            ]);
            
            \DB::commit();
            return true;
        } catch (\Exception $e) {
            \DB::rollBack();
            throw $e;
        }
    }

    /**
     * Cancel the transfer
     */
    public function cancel(string $reason = null): bool
    {
        if ($this->status !== 'pending') {
            return false;
        }

        $this->status = 'cancelled';
        $this->notes = $reason;
        return $this->save();
    }

    /**
     * Format amount display
     */
    public function getFormattedAmountAttribute(): string
    {
        return 'VT ' . number_format($this->amount, 2);
    }
}
