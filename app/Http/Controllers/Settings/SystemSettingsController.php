<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SystemSettingsController extends Controller
{
    /**
     * Show the system settings page
     */
    public function index(): Response
    {
        return Inertia::render('settings/system', [
            'settings' => [
                'credit_limit' => Setting::getCreditLimit(),
            ],
        ]);
    }

    /**
     * Update system settings
     */
    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'credit_limit' => 'required|integer|min:0|max:100000',
        ]);

        Setting::setCreditLimit($request->input('credit_limit'));

        return back()->with('success', 'System settings updated successfully.');
    }
}
