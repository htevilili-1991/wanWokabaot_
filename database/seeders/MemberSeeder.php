<?php

namespace Database\Seeders;

use App\Models\Member;
use Illuminate\Database\Seeder;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'phone' => '+1234567890',
                'member_code' => 'MEM001',
                'join_date' => '2024-01-15',
                'status' => 'Active',
                'notes' => 'Regular customer, prefers morning appointments',
                'total_spent' => 1250.50,
                'balance' => 150.00,
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'phone' => '+1234567891',
                'member_code' => 'MEM002',
                'join_date' => '2024-02-20',
                'status' => 'Active',
                'notes' => 'VIP customer, birthday in March',
                'total_spent' => 2850.75,
                'balance' => 0.00,
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bob.johnson@example.com',
                'phone' => '+1234567892',
                'member_code' => 'MEM003',
                'join_date' => '2024-03-10',
                'status' => 'Active',
                'notes' => 'New member, needs orientation',
                'total_spent' => 450.25,
                'balance' => 2250.00,
            ],
            [
                'name' => 'Alice Brown',
                'email' => 'alice.brown@example.com',
                'phone' => '+1234567893',
                'member_code' => 'MEM004',
                'join_date' => '2023-11-05',
                'status' => 'Inactive',
                'notes' => 'Inactive for 3 months, follow up needed',
                'total_spent' => 780.90,
                'balance' => 95.50,
            ],
            [
                'name' => 'Charlie Wilson',
                'email' => 'charlie.wilson@example.com',
                'phone' => '+1234567894',
                'member_code' => 'MEM005',
                'join_date' => '2024-04-01',
                'status' => 'Suspended',
                'notes' => 'Suspended due to payment issues',
                'total_spent' => 320.00,
                'balance' => 320.00,
            ],
            [
                'name' => 'Diana Davis',
                'email' => 'diana.davis@example.com',
                'phone' => '+1234567895',
                'member_code' => 'MEM006',
                'join_date' => '2024-05-12',
                'status' => 'Active',
                'notes' => 'Loyal customer, refers friends',
                'total_spent' => 1950.30,
                'balance' => 2100.00,
            ],
            [
                'name' => 'Edward Miller',
                'email' => 'edward.miller@example.com',
                'phone' => '+1234567896',
                'member_code' => 'MEM007',
                'join_date' => '2024-06-08',
                'status' => 'Active',
                'notes' => 'Corporate account',
                'total_spent' => 3420.80,
                'balance' => 180.25,
            ],
            [
                'name' => 'Fiona Garcia',
                'email' => 'fiona.garcia@example.com',
                'phone' => '+1234567897',
                'member_code' => 'MEM008',
                'join_date' => '2024-07-20',
                'status' => 'Active',
                'notes' => 'Student discount applied',
                'total_spent' => 95.75,
                'balance' => 2450.00,
            ],
        ];

        foreach ($members as $member) {
            Member::create($member);
        }
    }
}
