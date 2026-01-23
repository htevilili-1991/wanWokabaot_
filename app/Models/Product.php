<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'location_id',
        'name',
        'category',
        'cost_price',
        'selling_price',
        'current_stock',
        'minimum_stock',
        'description',
    ];

    protected $casts = [
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'current_stock' => 'integer',
        'minimum_stock' => 'integer',
    ];

    /**
     * Check if the product is low on stock.
     */
    public function isLowStock(): bool
    {
        return $this->current_stock <= $this->minimum_stock;
    }

    /**
     * Check if the product is out of stock.
     */
    public function isOutOfStock(): bool
    {
        return $this->current_stock <= 0;
    }

    /**
     * Get the location this product belongs to
     */
    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class);
    }

    /**
     * Get the profit margin for this product.
     */
    public function getProfitMargin(): float
    {
        if ($this->cost_price <= 0) {
            return 0;
        }

        return (($this->selling_price - $this->cost_price) / $this->cost_price) * 100;
    }

    /**
     * Scope products by location
     */
    public function scopeByLocation($query, $locationId)
    {
        return $query->where('location_id', $locationId);
    }
}
