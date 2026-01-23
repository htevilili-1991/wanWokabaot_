<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of members.
     */
    public function index(Request $request)
    {
        $query = Member::with('pendingSales'); // Load pending sales for unpaid total calculation

        // Handle search
        if ($request->has('search') && ! empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('member_code', 'like', "%{$search}%")
                    ->orWhere('status', 'like', "%{$search}%");
            });
        }

        // Handle sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');

        if (in_array($sortBy, ['name', 'email', 'phone', 'member_code', 'join_date', 'status', 'total_spent', 'balance', 'created_at'])) {
            $query->orderBy($sortBy, $sortDirection);
        }

        $members = $query->paginate($request->get('per_page', 10));

        return Inertia::render('members/index', [
            'members' => $members,
            'filters' => [
                'search' => $request->search,
                'sort_by' => $sortBy,
                'sort_direction' => $sortDirection,
                'per_page' => $request->per_page,
            ],
        ]);
    }

    /**
     * Show the form for creating a new member.
     */
    public function create()
    {
        return Inertia::render('members/create');
    }

    /**
     * Store a newly created member.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:members'],
            'phone' => ['nullable', 'string', 'max:20', 'unique:members'],
            'member_code' => ['nullable', 'string', 'max:50', 'unique:members'],
            'join_date' => ['required', 'date'],
            'status' => ['required', 'string', 'in:Active,Inactive,Suspended'],
            'notes' => ['nullable', 'string'],
            'total_spent' => ['nullable', 'numeric', 'min:0'],
            'balance' => ['nullable', 'numeric', 'min:0'],
        ]);

        Member::create($validated);

        return Redirect::route('members.index')->with('success', 'Member created successfully.');
    }

    /**
     * Display the specified member.
     */
    public function show(Member $member)
    {
        return Inertia::render('members/show', [
            'member' => $member,
        ]);
    }

    /**
     * Show the form for editing the specified member.
     */
    public function edit(Member $member)
    {
        return Inertia::render('members/edit', [
            'member' => $member,
        ]);
    }

    /**
     * Update the specified member.
     */
    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('members')->ignore($member->id)],
            'phone' => ['nullable', 'string', 'max:20', Rule::unique('members')->ignore($member->id)],
            'member_code' => ['nullable', 'string', 'max:50', Rule::unique('members')->ignore($member->id)],
            'join_date' => ['required', 'date'],
            'status' => ['required', 'string', 'in:Active,Inactive,Suspended'],
            'notes' => ['nullable', 'string'],
            'total_spent' => ['nullable', 'numeric', 'min:0'],
            'balance' => ['nullable', 'numeric', 'min:0'],
        ]);

        $member->update($validated);

        return Redirect::route('members.index')->with('success', 'Member updated successfully.');
    }

    /**
     * Remove the specified member.
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return Redirect::route('members.index')->with('success', 'Member deleted successfully.');
    }
}
