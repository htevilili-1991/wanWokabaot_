<?php

use App\Models\Member;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $members = [
            [
                'name' => 'Julio Yaruel',
                'email' => 'jyaruel@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM021',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Roger Smithy',
                'email' => 'rsmithy@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM022',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Mike Tarinako',
                'email' => 'mtarinako@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM023',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Harry Nalau',
                'email' => 'hnalau@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM024',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Ben Tokal',
                'email' => 'btokal@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM025',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Vincent Wells',
                'email' => 'vwells@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM026',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Javen Wilfred',
                'email' => 'wilfredj@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM027',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'David Talo',
                'email' => 'dtalo@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM028',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Hidson Rob',
                'email' => 'hrob@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM029',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Esau Kalorie',
                'email' => 'kesau@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM030',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Flaviana Mulonturala',
                'email' => 'fmulonturala@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM031',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Gabriel Baltor',
                'email' => 'gbaltor@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM032',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Jackson Andrews',
                'email' => 'jnandrew@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM033',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Jimmy Tamkela',
                'email' => 'jtamkela@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM034',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Stanley Tonge',
                'email' => 'stonge@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM035',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Herman Tevilili',
                'email' => 'htevilili@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM036',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Thomas Marafi',
                'email' => 'ztmarafi@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM037',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Mathew Finle',
                'email' => 'mfinle@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM038',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Brandy Sahe',
                'email' => 'sbrandy@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM039',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
            [
                'name' => 'Brenden Reube',
                'email' => 'rbrenden@vanuatu.gov.vu',
                'phone' => null,
                'member_code' => 'MEM040',
                'status' => 'Active',
                'join_date' => '2024-01-01',
                'balance' => 0,
                'total_spent' => 0,
                'notes' => 'Government employee',
            ],
        ];

        foreach ($members as $memberData) {
            // Only create if the email doesn't exist
            if (! Member::where('email', $memberData['email'])->exists()) {
                Member::create($memberData);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove only the members we added, not all members
        $emails = [
            'jyaruel@vanuatu.gov.vu',
            'rsmithy@vanuatu.gov.vu',
            'mtarinako@vanuatu.gov.vu',
            'hnalau@vanuatu.gov.vu',
            'btokal@vanuatu.gov.vu',
            'vwells@vanuatu.gov.vu',
            'wilfredj@vanuatu.gov.vu',
            'dtalo@vanuatu.gov.vu',
            'hrob@vanuatu.gov.vu',
            'kesau@vanuatu.gov.vu',
            'fmulonturala@vanuatu.gov.vu',
            'gbaltor@vanuatu.gov.vu',
            'jnandrew@vanuatu.gov.vu',
            'jtamkela@vanuatu.gov.vu',
            'stonge@vanuatu.gov.vu',
            'htevilili@vanuatu.gov.vu',
            'ztmarafi@vanuatu.gov.vu',
            'mfinle@vanuatu.gov.vu',
            'sbrandy@vanuatu.gov.vu',
            'rbrenden@vanuatu.gov.vu',
        ];

        Member::whereIn('email', $emails)->delete();
    }
};
