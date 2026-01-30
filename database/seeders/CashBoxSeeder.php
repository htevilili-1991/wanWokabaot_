<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CashBox;

class CashBoxSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cashBoxes = [
            [
                'name' => 'Kitchen Cash Box',
                'location' => 'Kitchen',
                'description' => 'Primary cash box for daily operations in the kitchen',
                'current_balance' => 0,
                'is_active' => true,
                'is_primary' => true,
                'opening_hours' => [
                    'monday' => ['06:00', '22:00'],
                    'tuesday' => ['06:00', '22:00'],
                    'wednesday' => ['06:00', '22:00'],
                    'thursday' => ['06:00', '22:00'],
                    'friday' => ['06:00', '22:00'],
                    'saturday' => ['06:00', '22:00'],
                    'sunday' => ['06:00', '22:00'],
                ],
            ],
            [
                'name' => 'Main Vault',
                'location' => 'Office',
                'description' => 'Secured cash box for storing excess cash from kitchen operations',
                'current_balance' => 0,
                'is_active' => true,
                'is_primary' => false,
                'opening_hours' => [
                    'monday' => ['08:00', '17:00'],
                    'tuesday' => ['08:00', '17:00'],
                    'wednesday' => ['08:00', '17:00'],
                    'thursday' => ['08:00', '17:00'],
                    'friday' => ['08:00', '17:00'],
                    'saturday' => ['closed'],
                    'sunday' => ['closed'],
                ],
            ],
        ];

        foreach ($cashBoxes as $cashBox) {
            CashBox::create($cashBox);
        }
    }
}
