<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\Member;
use App\Models\PendingSale;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PendingSaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = Member::all();
        $products = Product::all();
        $users = User::all();
        $locations = Location::active()->get();

        if ($members->isEmpty() || $products->isEmpty() || $users->isEmpty() || $locations->isEmpty()) {
            return; // Skip if no data exists
        }

        // Create completed sales over the past 90 days for better chart data
        for ($i = 0; $i < 150; $i++) {
            $member = $members->random();
            $user = $users->random();
            $location = $locations->random();
            $numItems = rand(1, 8);

            $cart = [];
            $subtotal = 0;

            for ($j = 0; $j < $numItems; $j++) {
                $product = $products->where('current_stock', '>', 0)->random();
                $quantity = rand(1, min(3, $product->current_stock));

                $cart[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->selling_price,
                    'quantity' => $quantity,
                ];

                $subtotal += $product->selling_price * $quantity;

                // Reduce stock
                $product->decrement('current_stock', $quantity);
            }

            // Random date within last 90 days
            $daysAgo = rand(0, 90);
            $saleDate = Carbon::now()->subDays($daysAgo);

            // 70% cash, 30% pay later
            $paymentMethod = rand(1, 10) <= 7 ? 'cash' : 'pay_later';

            PendingSale::create([
                'location_id' => $location->id,
                'member_id' => $member->id,
                'created_by' => $user->id,
                'items' => $cart,
                'subtotal' => $subtotal,
                'notes' => 'Regular sale',
                'status' => 'completed',
                'payment_method' => $paymentMethod,
                'completed_by' => $user->id,
                'completed_at' => $saleDate,
            ]);

            // Update member balance if pay later
            if ($paymentMethod === 'pay_later') {
                $member->increment('balance', $subtotal);
                $member->increment('total_spent', $subtotal);
            } else {
                $member->increment('total_spent', $subtotal);
            }
        }

        // Create some pending transactions (unpaid orders)
        for ($i = 0; $i < 12; $i++) {
            $member = $members->where('status', 'Active')->random();
            $user = $users->random();
            $numItems = rand(2, 6);

            $cart = [];
            $subtotal = 0;

            for ($j = 0; $j < $numItems; $j++) {
                $product = $products->where('current_stock', '>', 0)->random();
                $quantity = rand(1, min(4, $product->current_stock));

                $cart[] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->selling_price,
                    'quantity' => $quantity,
                ];

                $subtotal += $product->selling_price * $quantity;
            }

            PendingSale::create([
                'member_id' => $member->id,
                'created_by' => $user->id,
                'items' => $cart,
                'subtotal' => $subtotal,
                'notes' => 'Pending payment - customer will pay later',
                'status' => 'pending',
                'payment_method' => 'pay_later',
            ]);
        }
    }
}
