<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAwardRequest;
use App\Http\Requests\UpdateAwardRequest;
use App\Infrastructure\Models\Award;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class AwardController extends Controller
{
    public function index(): Response
    {
        $awards = Award::with('media')->orderByDesc('year')->paginate(10);

        return Inertia::render('award/index', [
            'awards' => $awards
        ]);
    }

    public function create(Request $request): Response
    {
        $perPage = $request->input('perPage', 20);
        $type = $request->input('type', 'all');
        $query = Media::query();
        if ($type !== 'all') {
            switch ($type) {
                case 'images':
                    $query->where('file_type', 'like', 'image/%');
                    break;
                case 'videos':
                    $query->where('file_type', 'like', 'video/%');
                    break;
                case 'audio':
                    $query->where('file_type', 'like', 'audio/%');
                    break;
                case 'pdf':
                    $query->where('file_type', 'application/pdf');
                    break;
            }
        }
        $media = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('award/create', [
            'media' => $media
        ]);
    }

    public function store(StoreAwardRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Award::create($data);

        return redirect()->route('awards.index')
            ->with('success', 'Award created successfully.');
    }

    public function show(Award $award): Response
    {
        return Inertia::render('award/show', [
            'award' => $award->load('media')
        ]);
    }

    public function edit(Award $award, Request $request): Response
    {
        $perPage = $request->input('perPage', 20);
        $type = $request->input('type', 'all');
        $query = Media::query();
        if ($type !== 'all') {
            switch ($type) {
                case 'images':
                    $query->where('file_type', 'like', 'image/%');
                    break;
                case 'videos':
                    $query->where('file_type', 'like', 'video/%');
                    break;
                case 'audio':
                    $query->where('file_type', 'like', 'audio/%');
                    break;
                case 'pdf':
                    $query->where('file_type', 'application/pdf');
                    break;
            }
        }
        $media = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('award/edit', [
            'award' => $award->load('media'),
            'media' => $media
        ]);
    }

    public function update(UpdateAwardRequest $request, Award $award): RedirectResponse
    {
        $data = $request->validated();
        $award->update($data);

        return redirect()->route('awards.index')
            ->with('success', 'Award updated successfully.');
    }

    public function destroy(Award $award): RedirectResponse
    {
        $award->delete();

        return redirect()->route('awards.index')
            ->with('success', 'Award deleted successfully.');
    }
}
