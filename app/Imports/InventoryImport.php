<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class InventoryImport implements ToModel, WithHeadingRow, WithValidation
{
    private $locationId;

    public function __construct(?int $locationId = null)
    {
        // If a specific location ID is provided, use it.
        // Otherwise, try to derive it from the authenticated user.
        if ($locationId) {
            $this->locationId = $locationId;
        } else {
            $user = Auth::user();
            if ($user && $user->primaryLocation()) {
                $this->locationId = $user->primaryLocation()->id;
            } else if ($user && $user->locations()->first()) {
                $this->locationId = $user->locations()->first()->id;
            } else {
                // Fallback or throw an error if no location can be determined.
                // For now, we'll allow it to be null, and validation will catch it if required.
                $this->locationId = null;
            }
        }
    }

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        // Determine the location_id for the product
        $productLocationId = $this->locationId; // Default to the one from constructor

        // If location_id is present in the Excel row and user is Admin, allow override
        // Otherwise, stick to the user's assigned location to prevent unauthorized imports to other locations.
        $user = Auth::user();
        if ($user && $user->hasRole('Super Admin') || $user && $user->hasRole('Admin')) {
            if (isset($row['location_id']) && $row['location_id']) {
                $productLocationId = $row['location_id'];
            }
        } else if (!$productLocationId) {
            // If user is not Admin/Super Admin and no location is set, cannot proceed
            throw new \Exception('User is not assigned to a location and no location_id was provided for import.');
        }

        // Find product by name and location_id to update, or create a new one
        $product = Product::firstOrNew([
            'name' => $row['name'],
            'location_id' => $productLocationId,
        ]);

        $product->fill([
            'category' => $row['category'],
            'cost_price' => $row['cost_price'],
            'selling_price' => $row['selling_price'],
            'current_stock' => $row['current_stock'],
            'minimum_stock' => $row['minimum_stock'] ?? 0,
            'description' => $row['description'] ?? null,
        ]);

        return $product;
    }

    /**
     * Define validation rules for each row.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:255'],
            'cost_price' => ['required', 'numeric', 'min:0'],
            'selling_price' => ['required', 'numeric', 'min:0'],
            'current_stock' => ['required', 'integer', 'min:0'],
            'minimum_stock' => ['nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string', 'max:1000'],
            'location_id' => ['nullable', 'exists:locations,id'], // Only validated if provided in Excel
        ];
    }
}
