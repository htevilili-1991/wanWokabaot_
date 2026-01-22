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
            // Beverages
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
                'name' => 'Green Tea Bags',
                'category' => 'Beverages',
                'cost_price' => 8.50,
                'selling_price' => 15.00,
                'current_stock' => 200,
                'minimum_stock' => 30,
                'description' => 'Organic green tea bags, 25 count',
            ],
            [
                'name' => 'Coca Cola 2L',
                'category' => 'Beverages',
                'cost_price' => 18.00,
                'selling_price' => 28.00,
                'current_stock' => 80,
                'minimum_stock' => 15,
                'description' => 'Coca Cola soft drink, 2 liter bottle',
            ],

            // Bakery
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
                'name' => 'Croissant (6 pack)',
                'category' => 'Bakery',
                'cost_price' => 22.00,
                'selling_price' => 35.00,
                'current_stock' => 30,
                'minimum_stock' => 8,
                'description' => 'Buttery croissants, pack of 6',
            ],
            [
                'name' => 'Chocolate Cake',
                'category' => 'Bakery',
                'cost_price' => 45.00,
                'selling_price' => 75.00,
                'current_stock' => 12,
                'minimum_stock' => 3,
                'description' => 'Rich chocolate cake, serves 8-10 people',
            ],

            // Pantry
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
                'name' => 'Sugar (2kg)',
                'category' => 'Pantry',
                'cost_price' => 22.30,
                'selling_price' => 35.00,
                'current_stock' => 25,
                'minimum_stock' => 10,
                'description' => 'Refined white sugar, 2kg bag',
            ],
            [
                'name' => 'Pasta (500g)',
                'category' => 'Pantry',
                'cost_price' => 12.50,
                'selling_price' => 20.00,
                'current_stock' => 90,
                'minimum_stock' => 18,
                'description' => 'Spaghetti pasta, 500g pack',
            ],
            [
                'name' => 'Tomato Sauce',
                'category' => 'Pantry',
                'cost_price' => 8.75,
                'selling_price' => 14.00,
                'current_stock' => 65,
                'minimum_stock' => 12,
                'description' => 'Tomato pasta sauce, 500g jar',
            ],

            // Canned Goods
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
                'name' => 'Baked Beans',
                'category' => 'Canned Goods',
                'cost_price' => 9.50,
                'selling_price' => 16.00,
                'current_stock' => 85,
                'minimum_stock' => 15,
                'description' => 'Baked beans in tomato sauce, 400g',
            ],
            [
                'name' => 'Corn Kernels',
                'category' => 'Canned Goods',
                'cost_price' => 7.25,
                'selling_price' => 12.50,
                'current_stock' => 95,
                'minimum_stock' => 20,
                'description' => 'Sweet corn kernels, 400g can',
            ],

            // Dairy
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
                'name' => 'Cheese Slices',
                'category' => 'Dairy',
                'cost_price' => 28.00,
                'selling_price' => 45.00,
                'current_stock' => 40,
                'minimum_stock' => 10,
                'description' => 'Processed cheese slices, 200g pack',
            ],
            [
                'name' => 'Butter 250g',
                'category' => 'Dairy',
                'cost_price' => 35.00,
                'selling_price' => 55.00,
                'current_stock' => 25,
                'minimum_stock' => 8,
                'description' => 'Salted butter, 250g pack',
            ],

            // Fruits
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
                'name' => 'Apples (1kg)',
                'category' => 'Fruits',
                'cost_price' => 28.00,
                'selling_price' => 45.00,
                'current_stock' => 35,
                'minimum_stock' => 8,
                'description' => 'Fresh red apples, approximately 1kg',
            ],
            [
                'name' => 'Oranges (2kg)',
                'category' => 'Fruits',
                'cost_price' => 22.50,
                'selling_price' => 35.00,
                'current_stock' => 20,
                'minimum_stock' => 5,
                'description' => 'Fresh oranges, 2kg bag',
            ],

            // Household
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
                'name' => 'Dish Soap',
                'category' => 'Household',
                'cost_price' => 11.25,
                'selling_price' => 18.00,
                'current_stock' => 55,
                'minimum_stock' => 12,
                'description' => 'Liquid dish soap, 500ml',
            ],
            [
                'name' => 'Toilet Paper (4 pack)',
                'category' => 'Household',
                'cost_price' => 15.00,
                'selling_price' => 25.00,
                'current_stock' => 45,
                'minimum_stock' => 10,
                'description' => 'Soft toilet paper, 4 roll pack',
            ],

            // Personal Care
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
            [
                'name' => 'Shampoo',
                'category' => 'Personal Care',
                'cost_price' => 18.50,
                'selling_price' => 30.00,
                'current_stock' => 35,
                'minimum_stock' => 8,
                'description' => 'Herbal shampoo, 300ml bottle',
            ],
            [
                'name' => 'Deodorant',
                'category' => 'Personal Care',
                'cost_price' => 12.00,
                'selling_price' => 20.00,
                'current_stock' => 60,
                'minimum_stock' => 12,
                'description' => 'Anti-perspirant deodorant, 150ml',
            ],

            // Snacks
            [
                'name' => 'Chocolate Bar',
                'category' => 'Snacks',
                'cost_price' => 5.50,
                'selling_price' => 9.00,
                'current_stock' => 120,
                'minimum_stock' => 25,
                'description' => 'Milk chocolate bar, 100g',
            ],
            [
                'name' => 'Potato Chips',
                'category' => 'Snacks',
                'cost_price' => 8.75,
                'selling_price' => 14.00,
                'current_stock' => 85,
                'minimum_stock' => 18,
                'description' => 'Crispy potato chips, 150g bag',
            ],
            [
                'name' => 'Biscuits',
                'category' => 'Snacks',
                'cost_price' => 6.25,
                'selling_price' => 10.00,
                'current_stock' => 95,
                'minimum_stock' => 20,
                'description' => 'Cream biscuits, 200g pack',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
