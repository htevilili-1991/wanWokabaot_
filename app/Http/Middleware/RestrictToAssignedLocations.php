<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RestrictToAssignedLocations
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Admins can access all locations
        if ($user && $user->hasRole('Admin')) {
            return $next($request);
        }

        // For other users, restrict to their assigned locations
        if ($user && ($user->hasRole('Cashier') || $user->hasRole('Treasurer'))) {
            $assignedLocationIds = $user->locations->pluck('id')->toArray();

            if (empty($assignedLocationIds)) {
                abort(403, 'You are not assigned to any locations. Please contact an administrator.');
            }

            // Add location restriction to the request
            $request->merge(['assigned_location_ids' => $assignedLocationIds]);
        }

        return $next($request);
    }
}
