<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'key',
        'value',
        'type',
        'group',
        'description',
    ];

    /**
     * Get a setting value with type casting
     */
    public static function get(string $key, $default = null)
    {
        $setting = static::where('key', $key)->first();

        if (! $setting) {
            return $default;
        }

        return match ($setting->type) {
            'integer' => (int) $setting->value,
            'boolean' => filter_var($setting->value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($setting->value, true),
            default => $setting->value,
        };
    }

    /**
     * Set a setting value with type casting
     */
    public static function set(string $key, $value, string $type = 'string', string $group = 'general', ?string $description = null): void
    {
        $stringValue = match ($type) {
            'boolean' => $value ? '1' : '0',
            'json' => json_encode($value),
            default => (string) $value,
        };

        static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $stringValue,
                'type' => $type,
                'group' => $group,
                'description' => $description,
            ]
        );
    }

    /**
     * Get credit limit setting
     */
    public static function getCreditLimit(): int
    {
        return static::get('member_credit_limit', 2000);
    }

    /**
     * Set credit limit setting
     */
    public static function setCreditLimit(int $limit): void
    {
        static::set(
            'member_credit_limit',
            $limit,
            'integer',
            'financial',
            'Maximum credit limit allowed for members'
        );
    }
}
