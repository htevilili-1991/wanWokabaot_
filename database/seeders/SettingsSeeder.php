<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Set default credit limit for members
        Setting::setCreditLimit(2000);

        // Add other default settings here as needed
        Setting::set(
            'system_name',
            'Wan Wokabaot POS',
            'string',
            'system',
            'Name of the POS system'
        );

        Setting::set(
            'currency_symbol',
            'VT',
            'string',
            'financial',
            'Currency symbol used in the system'
        );
    }
}
