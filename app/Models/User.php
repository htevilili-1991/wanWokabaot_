<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasRoles, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * The locations this user is assigned to
     */
    public function locations(): BelongsToMany
    {
        return $this->belongsToMany(Location::class, 'user_locations')
            ->withPivot('is_primary')
            ->withTimestamps();
    }

    /**
     * Get the user's primary location
     */
    public function primaryLocation()
    {
        return $this->locations()->wherePivot('is_primary', true)->first();
    }

    /**
     * Check if user is assigned to a specific location
     */
    public function isAssignedToLocation(int $locationId): bool
    {
        return $this->locations()->where('locations.id', $locationId)->exists();
    }

    /**
     * Assign user to a location
     */
    public function assignToLocation(int $locationId, bool $isPrimary = false): void
    {
        // If setting as primary, remove primary flag from other locations
        if ($isPrimary) {
            $this->locations()->updateExistingPivot($this->locations->pluck('id'), ['is_primary' => false]);
        }

        $this->locations()->syncWithoutDetaching([
            $locationId => ['is_primary' => $isPrimary]
        ]);
    }

    /**
     * Remove user from a location
     */
    public function removeFromLocation(int $locationId): void
    {
        $this->locations()->detach($locationId);
    }
}
