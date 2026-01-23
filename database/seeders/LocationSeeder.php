<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create the main store location
        Location::firstOrCreate(
            ['name' => 'Main Store'],
            [
                'address' => '123 Main Street, City Center',
                'phone' => '+1-555-0123',
                'email' => 'main@wanwokabaot.com',
                'manager_name' => 'John Doe',
                'is_active' => true,
                'opening_hours' => [
                    'monday' => '9:00-17:00',
                    'tuesday' => '9:00-17:00',
                    'wednesday' => '9:00-17:00',
                    'thursday' => '9:00-17:00',
                    'friday' => '9:00-17:00',
                    'saturday' => '10:00-16:00',
                    'sunday' => 'Closed',
                ],
            ]
        );

        // You can add more default locations here as needed
        // For example:
        // Location::firstOrCreate(
        //     ['name' => 'Downtown Branch'],
        //     [
        //         'address' => '456 Downtown Ave, Business District',
        //         'phone' => '+1-555-0456',
        //         'email' => 'downtown@wanwokabaot.com',
        //         'manager_name' => 'Jane Smith',
        //         'is_active' => true,
        //         'opening_hours' => [...],
        //     ]
        // );
    }
}
