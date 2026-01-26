<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ProductsExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        // Return an empty collection for a sample template
        return new Collection();
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return [
            'name',
            'category',
            'cost_price',
            'selling_price',
            'current_stock',
            'minimum_stock',
            'description',
            'location_id', // Optional: for Super Admin/Admin to specify location
        ];
    }
}