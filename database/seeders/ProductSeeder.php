<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Premium Coffee Beans',
                'category' => 'Beverages',
                'cost_price' => 45.50,
                'selling_price' => 75.00,
                'current_stock' => 150,
                'minimum_stock' => 20,
                'description' => 'High-quality Arabica coffee beans from Vanuatu plantations',
            ],
            [
                'name' => 'Fresh Bread Loaf',
                'category' => 'Bakery',
                'cost_price' => 8.25,
                'selling_price' => 15.00,
                'current_stock' => 45,
                'minimum_stock' => 10,
                'description' => 'Freshly baked white bread loaf, 500g',
            ],
            [
                'name' => 'Vanuatu Honey',
                'category' => 'Pantry',
                'cost_price' => 25.00,
                'selling_price' => 42.50,
                'current_stock' => 75,
                'minimum_stock' => 15,
                'description' => 'Pure organic honey from local beekeepers',
            ],
            [
                'name' => 'Canned Tuna',
                'category' => 'Canned Goods',
                'cost_price' => 12.80,
                'selling_price' => 22.00,
                'current_stock' => 120,
                'minimum_stock' => 25,
                'description' => 'Premium canned tuna in oil, 200g',
            ],
            [
                'name' => 'Fresh Milk',
                'category' => 'Dairy',
                'cost_price' => 18.50,
                'selling_price' => 32.00,
                'current_stock' => 85,
                'minimum_stock' => 15,
                'description' => 'Fresh whole milk, 1 liter',
            ],
            [
                'name' => 'Rice (5kg)',
                'category' => 'Pantry',
                'cost_price' => 35.00,
                'selling_price' => 55.00,
                'current_stock' => 60,
                'minimum_stock' => 12,
                'description' => 'Premium long grain rice, 5kg bag',
            ],
            [
                'name' => 'Cooking Oil',
                'category' => 'Pantry',
                'cost_price' => 28.75,
                'selling_price' => 45.00,
                'current_stock' => 40,
                'minimum_stock' => 8,
                'description' => 'Vegetable cooking oil, 1 liter',
            ],
            [
                'name' => 'Bananas (1kg)',
                'category' => 'Fruits',
                'cost_price' => 15.20,
                'selling_price' => 25.00,
                'current_stock' => 0,
                'minimum_stock' => 5,
                'description' => 'Fresh local bananas, approximately 1kg',
            ],
            [
                'name' => 'Laundry Soap',
                'category' => 'Household',
                'cost_price' => 9.50,
                'selling_price' => 16.00,
                'current_stock' => 90,
                'minimum_stock' => 18,
                'description' => 'Premium laundry soap bar, 200g',
            ],
            [
                'name' => 'Sugar (2kg)',
                'category' => 'Pantry',
                'cost_price' => 22.30,
                'selling_price' => 35.00,
                'current_stock' => 25,
                'minimum_stock' => 10,
                'description' => 'Refined white sugar, 2kg bag',
            ],
            [
                'name' => 'Toothpaste',
                'category' => 'Personal Care',
                'cost_price' => 6.80,
                'selling_price' => 12.00,
                'current_stock' => 55,
                'minimum_stock' => 12,
                'description' => 'Fluoride toothpaste, 150ml tube',
            ],
            [
                'name' => 'Soap Bar',
                'category' => 'Personal Care',
                'cost_price' => 4.25,
                'selling_price' => 8.50,
                'current_stock' => 110,
                'minimum_stock' => 20,
                'description' => 'Gentle cleansing soap bar, 100g',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
