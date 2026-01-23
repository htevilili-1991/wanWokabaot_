<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    /**
     * Display a listing of locations
     */
    public function index(): Response
    {
        $locations = Location::withCount(['products', 'pendingSales', 'users'])
            ->with(['users' => function($query) {
                $query->select('users.id', 'users.name', 'users.email')
                      ->with('roles:name');
            }])
            ->orderBy('name')
            ->get();

        return Inertia::render('settings/locations/index', [
            'locations' => $locations,
        ]);
    }

    /**
     * Show the form for creating a new location
     */
    public function create(): Response
    {
        return Inertia::render('settings/locations/create');
    }

    /**
     * Store a newly created location
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:locations,name',
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'manager_name' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'opening_hours' => 'nullable|array',
        ]);

        Location::create($validated);

        return redirect()->route('settings.locations.index')
            ->with('success', 'Location created successfully.');
    }

    /**
     * Display the specified location
     */
    public function show(Location $location): Response
    {
        $location->load([
            'products' => function($query) {
                $query->select('id', 'location_id', 'name', 'category', 'current_stock', 'selling_price');
            },
            'users' => function($query) {
                $query->select('users.id', 'users.name', 'users.email')
                      ->with('roles:name')
                      ->withPivot('is_primary');
            }
        ]);

        return Inertia::render('settings/locations/show', [
            'location' => $location,
        ]);
    }

    /**
     * Show the form for editing the specified location
     */
    public function edit(Location $location): Response
    {
        return Inertia::render('settings/locations/edit', [
            'location' => $location,
        ]);
    }

    /**
     * Update the specified location
     */
    public function update(Request $request, Location $location): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:locations,name,' . $location->id,
            'address' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'manager_name' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'opening_hours' => 'nullable|array',
        ]);

        $location->update($validated);

        return redirect()->route('settings.locations.index')
            ->with('success', 'Location updated successfully.');
    }

    /**
     * Remove the specified location
     */
    public function destroy(Location $location): RedirectResponse
    {
        // Check if location has products or pending sales
        if ($location->products()->count() > 0 || $location->pendingSales()->count() > 0) {
            return redirect()->route('settings.locations.index')
                ->with('error', 'Cannot delete location with existing products or transactions.');
        }

        $location->delete();

        return redirect()->route('settings.locations.index')
            ->with('success', 'Location deleted successfully.');
    }

    /**
     * Toggle location active status
     */
    public function toggle(Location $location): RedirectResponse
    {
        try {
            $location->update(['is_active' => !$location->is_active]);

            $status = $location->is_active ? 'activated' : 'deactivated';

            return redirect()->route('settings.locations.index')
                ->with('success', "Location {$status} successfully.");
        } catch (\Exception $e) {
            return redirect()->route('settings.locations.index')
                ->with('error', 'Failed to toggle location status: ' . $e->getMessage());
        }
    }
}
