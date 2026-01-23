<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'is_active',
        'manager_name',
        'opening_hours',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'opening_hours' => 'array',
    ];

    /**
     * Get all products for this location
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get all pending sales for this location
     */
    public function pendingSales(): HasMany
    {
        return $this->hasMany(PendingSale::class);
    }

    /**
     * Get all users assigned to this location
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_locations')
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    /**
     * Get users with specific roles at this location
     */
    public function usersWithRole(string $role): BelongsToMany
    {
        return $this->users()->whereHas('roles', function ($query) use ($role) {
            $query->where('name', $role);
        });
    }

    /**
     * Scope active locations
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get formatted address
     */
    public function getFormattedAddressAttribute(): string
    {
        return $this->address ?? 'No address specified';
    }

    /**
     * Get contact info
     */
    public function getContactInfoAttribute(): string
    {
        $info = [];
        if ($this->phone) $info[] = "Phone: {$this->phone}";
        if ($this->email) $info[] = "Email: {$this->email}";
        return implode(', ', $info) ?: 'No contact info';
    }
}
