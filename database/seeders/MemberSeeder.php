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
            [
                'name' => 'George Taylor',
                'email' => 'george.taylor@example.com',
                'phone' => '+1234567898',
                'member_code' => 'MEM009',
                'join_date' => '2024-08-15',
                'status' => 'Active',
                'notes' => 'Bulk purchaser, owns small store',
                'total_spent' => 4250.60,
                'balance' => 320.75,
            ],
            [
                'name' => 'Helen White',
                'email' => 'helen.white@example.com',
                'phone' => '+1234567899',
                'member_code' => 'MEM010',
                'join_date' => '2024-09-02',
                'status' => 'Active',
                'notes' => 'Family with 4 children',
                'total_spent' => 890.45,
                'balance' => 1650.00,
            ],
            [
                'name' => 'Ian Black',
                'email' => 'ian.black@example.com',
                'phone' => '+1234567800',
                'member_code' => 'MEM011',
                'join_date' => '2024-10-10',
                'status' => 'Active',
                'notes' => 'New resident, just moved to Vanuatu',
                'total_spent' => 245.80,
                'balance' => 2850.00,
            ],
            [
                'name' => 'Julia Green',
                'email' => 'julia.green@example.com',
                'phone' => '+1234567801',
                'member_code' => 'MEM012',
                'join_date' => '2023-12-01',
                'status' => 'Inactive',
                'notes' => 'Moved overseas, account dormant',
                'total_spent' => 1650.25,
                'balance' => 45.00,
            ],
            [
                'name' => 'Kevin Brown',
                'email' => 'kevin.brown@example.com',
                'phone' => '+1234567802',
                'member_code' => 'MEM013',
                'join_date' => '2024-11-05',
                'status' => 'Active',
                'notes' => 'Teacher at local school',
                'total_spent' => 720.90,
                'balance' => 1200.00,
            ],
            [
                'name' => 'Laura Martinez',
                'email' => 'laura.martinez@example.com',
                'phone' => '+1234567803',
                'member_code' => 'MEM014',
                'join_date' => '2024-12-01',
                'status' => 'Active',
                'notes' => 'Restaurant owner, weekly large orders',
                'total_spent' => 3850.40,
                'balance' => 890.25,
            ],
            [
                'name' => 'Michael Johnson',
                'email' => 'michael.johnson@example.com',
                'phone' => '+1234567804',
                'member_code' => 'MEM015',
                'join_date' => '2024-01-20',
                'status' => 'Suspended',
                'notes' => 'Payment overdue, account suspended',
                'total_spent' => 580.75,
                'balance' => 580.75,
            ],
            [
                'name' => 'Nancy Wilson',
                'email' => 'nancy.wilson@example.com',
                'phone' => '+1234567805',
                'member_code' => 'MEM016',
                'join_date' => '2024-02-14',
                'status' => 'Active',
                'notes' => 'Senior citizen, special discounts apply',
                'total_spent' => 340.60,
                'balance' => 2150.00,
            ],
        ];

        foreach ($members as $member) {
            $createdMember = Member::create($member);

            // Create a user account for each member so they can log in
            $user = \App\Models\User::firstOrCreate(
                ['email' => $member['email']],
                [
                    'name' => $member['name'],
                    'password' => \Illuminate\Support\Facades\Hash::make('password123'), // Default password
                    'email_verified_at' => now(),
                ]
            );

            // Assign Member role
            if (! $user->hasRole('Member')) {
                $user->assignRole('Member');
            }
        }
    }
}
