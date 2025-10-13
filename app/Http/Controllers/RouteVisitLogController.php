<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRouteVisitLogRequest;
use App\Http\Requests\UpdateRouteVisitLogRequest;
use App\Infrastructure\Models\RouteVisitLog;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class RouteVisitLogController extends Controller
{
    public function index(): View
    {
        $logs = RouteVisitLog::latest()->paginate(20);
        return view('route_visit_logs.index', compact('logs'));
    }

    public function create(): View
    {
        return view('route_visit_logs.create');
    }

    public function store(StoreRouteVisitLogRequest $request): RedirectResponse
    {
        $data = $request->validated();

        RouteVisitLog::create($data);

        return redirect()->route('route_visit_logs.index')
            ->with('success', 'Route visit log created successfully.');
    }

    public function show(RouteVisitLog $routeVisitLog): View
    {
        return view('route_visit_logs.show', compact('routeVisitLog'));
    }

    public function edit(RouteVisitLog $routeVisitLog): View
    {
        return view('route_visit_logs.edit', compact('routeVisitLog'));
    }

    public function update(UpdateRouteVisitLogRequest $request, RouteVisitLog $routeVisitLog): RedirectResponse
    {
        $data = $request->validated();

        $routeVisitLog->update($data);

        return redirect()->route('route_visit_logs.index')
            ->with('success', 'Route visit log updated successfully.');
    }

    public function destroy(RouteVisitLog $routeVisitLog): RedirectResponse
    {
        $routeVisitLog->delete();

        return redirect()->route('route_visit_logs.index')
            ->with('success', 'Route visit log deleted successfully.');
    }
}
