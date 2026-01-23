<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserManagementController extends Controller
{
    /**
     * Display a listing of users.
     */
    public function index()
    {
        $users = User::with(['roles', 'locations'])->paginate(10);
        $roles = Role::all();
        $locations = Location::active()->orderBy('name')->get();

        return Inertia::render('settings/users', [
            'users' => $users,
            'roles' => $roles,
            'locations' => $locations,
        ]);
    }

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'role' => ['required', 'string', 'exists:roles,name'],
            'locations' => ['array'],
            'locations.*' => ['integer', 'exists:locations,id'],
            'primary_location' => ['nullable', 'integer', 'exists:locations,id'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole($validated['role']);

        // Assign locations to user
        if (isset($validated['locations']) && is_array($validated['locations'])) {
            foreach ($validated['locations'] as $locationId) {
                $isPrimary = ($validated['primary_location'] ?? null) == $locationId;
                $user->assignToLocation($locationId, $isPrimary);
            }
        }

        return redirect()->back()->with('success', 'User created successfully.');
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', 'string', 'exists:roles,name'],
            'password' => ['nullable', 'string', 'min:8'],
            'locations' => ['array'],
            'locations.*' => ['integer', 'exists:locations,id'],
            'primary_location' => ['nullable', 'integer', 'exists:locations,id'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (! empty($validated['password'])) {
            $user->update(['password' => Hash::make($validated['password'])]);
        }

        $user->syncRoles([$validated['role']]);

        // Update location assignments
        // First, detach all current locations
        $user->locations()->detach();

        // Then assign new locations
        if (isset($validated['locations']) && is_array($validated['locations'])) {
            foreach ($validated['locations'] as $locationId) {
                $isPrimary = ($validated['primary_location'] ?? null) == $locationId;
                $user->assignToLocation($locationId, $isPrimary);
            }
        }

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(User $user)
    {
        // Prevent deleting the current authenticated user
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }
}
