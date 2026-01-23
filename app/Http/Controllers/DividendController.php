<?php

namespace App\Http\Controllers;

use App\Models\DividendPeriod;
use App\Models\DividendCalculation;
use App\Models\DividendPayment;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DividendController extends Controller
{
    public function index(Request $request): Response
    {
        $dividendPeriods = DividendPeriod::with(['createdBy'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('dividends/index', [
            'dividendPeriods' => $dividendPeriods,
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dividends/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'total_profit' => 'required|numeric|min:0',
            'dividend_rate' => 'required|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        DividendPeriod::create([
            ...$validated,
            'created_by' => $request->user()->id,
        ]);

        return redirect()->route('dividends.index')->with('success', 'Dividend period created successfully.');
    }

    public function show(DividendPeriod $dividendPeriod): Response
    {
        $dividendPeriod->load(['calculations.member', 'calculations.payments', 'createdBy']);

        $calculations = $dividendPeriod->calculations()
            ->with('member')
            ->paginate(15);

        return Inertia::render('dividends/show', [
            'dividendPeriod' => $dividendPeriod,
            'calculations' => $calculations,
        ]);
    }

    public function edit(DividendPeriod $dividendPeriod): Response
    {
        return Inertia::render('dividends/edit', [
            'dividendPeriod' => $dividendPeriod,
        ]);
    }

    public function update(Request $request, DividendPeriod $dividendPeriod)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'total_profit' => 'required|numeric|min:0',
            'dividend_rate' => 'required|numeric|min:0|max:100',
            'notes' => 'nullable|string',
        ]);

        $dividendPeriod->update($validated);

        return redirect()->route('dividends.show', $dividendPeriod)->with('success', 'Dividend period updated successfully.');
    }

    public function destroy(DividendPeriod $dividendPeriod)
    {
        if (!$dividendPeriod->isDraft()) {
            return back()->with('error', 'Cannot delete a dividend period that has been calculated or processed.');
        }

        $dividendPeriod->delete();

        return redirect()->route('dividends.index')->with('success', 'Dividend period deleted successfully.');
    }

    public function calculate(DividendPeriod $dividendPeriod)
    {
        if (!$dividendPeriod->isDraft()) {
            return back()->with('error', 'Dividend period has already been calculated.');
        }

        try {
            $dividendPeriod->calculateDividends();

            return back()->with('success', 'Dividends calculated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', 'Error calculating dividends: ' . $e->getMessage());
        }
    }

    public function approve(DividendPeriod $dividendPeriod)
    {
        if (!$dividendPeriod->isCalculated()) {
            return back()->with('error', 'Dividend period must be calculated before approval.');
        }

        $dividendPeriod->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        // Approve all calculations
        $dividendPeriod->calculations()->update([
            'status' => 'approved',
            'approved_at' => now(),
        ]);

        return back()->with('success', 'Dividend period approved successfully.');
    }

    public function approveCalculation(Request $request, DividendCalculation $calculation)
    {
        if (!$calculation->isPending()) {
            return back()->with('error', 'Calculation is not pending approval.');
        }

        $calculation->approve();

        return back()->with('success', 'Dividend calculation approved successfully.');
    }

    public function payDividend(Request $request, DividendCalculation $calculation)
    {
        $validated = $request->validate([
            'payment_method' => 'required|in:cash,credit,bank_transfer',
            'amount' => 'required|numeric|min:0.01|max:' . $calculation->getRemainingAmountAttribute(),
            'payment_date' => 'required|date',
            'reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($calculation, $validated, $request) {
            // Create payment record
            DividendPayment::create([
                ...$validated,
                'dividend_calculation_id' => $calculation->id,
                'processed_by' => $request->user()->id,
            ]);

            // Update calculation status
            $calculation->markAsPaid($validated['amount']);

            // If paying to member account (credit), update member balance
            if ($validated['payment_method'] === 'credit') {
                $calculation->member->increment('balance', $validated['amount']);
            }
        });

        return back()->with('success', 'Dividend payment processed successfully.');
    }

    public function memberDividends(Request $request): Response
    {
        $user = $request->user();

        // Find member associated with this user (assuming user has a member profile)
        // This might need adjustment based on your user-member relationship
        $member = Member::where('email', $user->email)->first();

        if (!$member) {
            return Inertia::render('dividends/member', [
                'dividends' => [],
                'message' => 'No member profile found.',
            ]);
        }

        $dividends = $member->dividendCalculations()
            ->with(['dividendPeriod', 'payments'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dividends/member', [
            'dividends' => $dividends,
        ]);
    }
}
