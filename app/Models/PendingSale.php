<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class PendingSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_id',
        'member_id',
        'created_by',
        'completed_by',
        'items',
        'subtotal',
        'payment_method',
        'status',
        'completed_at',
        'notes',
    ];

    protected $casts = [
        'items' => 'array',
        'subtotal' => 'decimal:2',
        'completed_at' => 'datetime',
    ];

    // Automatically generate transaction_id if not provided
    protected static function booted()
    {
        static::creating(function ($pendingSale) {
            if (empty($pendingSale->transaction_id)) {
                $pendingSale->transaction_id = 'TXN-'.strtoupper(Str::random(8));
            }
        });
    }

    // Relationships
    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function completer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'completed_by');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    // Methods
    public function isPending(): bool
    {
        return $this->status === 'pending';
    }

    public function isCompleted(): bool
    {
        return $this->status === 'completed';
    }

    public function complete(User $user): bool
    {
        if (! $this->isPending()) {
            return false;
        }

        // Process the sale (deduct stock, update member balance if applicable)
        $success = $this->processSale($user);

        if ($success) {
            $this->update([
                'status' => 'completed',
                'completed_by' => $user->id,
                'completed_at' => now(),
            ]);
        }

        return $success;
    }

    public function cancel(): bool
    {
        if (! $this->isPending()) {
            return false;
        }

        return $this->update(['status' => 'cancelled']);
    }

    private function processSale(User $user): bool
    {
        // Validate stock availability
        foreach ($this->items as $item) {
            $product = Product::find($item['id']);
            if (! $product || $product->current_stock < $item['quantity']) {
                return false; // Insufficient stock
            }
        }

        // Check member credit limit if applicable
        if ($this->member_id && $this->member->balance >= 2000) {
            return false; // Credit limit exceeded
        }

        // Deduct stock
        foreach ($this->items as $item) {
            $product = Product::find($item['id']);
            $product->decrement('current_stock', $item['quantity']);
        }

        // Update member balance if applicable (only for cash payments, pay_later already updated)
        if ($this->member_id && $this->payment_method === 'cash') {
            $this->member->increment('balance', $this->subtotal);
        }

        return true;
    }

    // Accessors
    public function getFormattedSubtotalAttribute(): string
    {
        return number_format($this->subtotal, 2).' VT';
    }

    public function getItemsCountAttribute(): int
    {
        return collect($this->items)->sum('quantity');
    }

    public function getMemberNameAttribute(): string
    {
        return $this->member ? $this->member->name : 'Walk-in Customer';
    }
}
