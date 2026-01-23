<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Member extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'member_code',
        'join_date',
        'status',
        'notes',
        'total_spent',
        'balance',
    ];

    protected $casts = [
        'join_date' => 'date',
        'total_spent' => 'decimal:2',
        'balance' => 'decimal:2',
    ];

    /**
     * Get the member's pending sales
     */
    public function pendingSales(): HasMany
    {
        return $this->hasMany(PendingSale::class);
    }

    /**
     * Get the total unpaid amount from all pending transactions (formatted as string)
     */
    public function getUnpaidTotalAttribute(): string
    {
        $total = $this->pendingSales()
            ->where('status', 'pending')
            ->sum(\DB::raw('subtotal - total_paid'));

        return number_format($total, 2);
    }
}
