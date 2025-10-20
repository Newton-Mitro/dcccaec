<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVisitorRequest;
use App\Http\Requests\UpdateVisitorRequest;
use App\Infrastructure\Models\Visitor;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class VisitorController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 20);

        $visitors = Visitor::latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('visitors/index', [
            'visitors' => $visitors,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('visitors/create');
    }

    public function store(StoreVisitorRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Visitor::create($data);

        return redirect()->route('visitors.index')
            ->with('success', 'Visitor added successfully.');
    }

    public function show(Visitor $visitor): Response
    {
        return Inertia::render('visitors/show', [
            'visitor' => $visitor,
        ]);
    }

    public function destroy(Visitor $visitor): RedirectResponse
    {
        $visitor->delete();

        return redirect()->route('visitors.index')
            ->with('success', 'Visitor deleted successfully.');
    }
}
