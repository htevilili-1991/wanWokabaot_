<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
     * Get the unpaid total formatted as a string.
     */
    public function getUnpaidTotalAttribute()
    {
        return number_format($this->balance, 2);
    }
}
