<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Infrastructure\Models\Holiday;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HolidayController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $holidays = Holiday::orderBy('date', 'asc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('holidays/index', [
            'holidays' => $holidays,
        ]);
    }

    public function show(Holiday $holiday)
    {
        return Inertia::render('holidays/show', [
            'holiday' => $holiday,
        ]);
    }

    public function create()
    {
        return Inertia::render('holidays/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Holiday::create($validated);

        return redirect()->route('holidays.index')->with('success', 'Holiday created successfully.');
    }

    public function edit(Holiday $holiday)
    {
        return Inertia::render('holidays/edit', [
            'holiday' => $holiday,
        ]);
    }

    public function update(Request $request, Holiday $holiday)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $holiday->update($validated);

        return redirect()->route('holidays.index')->with('success', 'Holiday updated successfully.');
    }

    public function destroy(Holiday $holiday)
    {
        $holiday->delete();

        return redirect()->route('holidays.index')->with('success', 'Holiday deleted successfully.');
    }
}
