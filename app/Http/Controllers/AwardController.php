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
        $awards = Award::with('featuredImage', 'gallery')
            ->orderByDesc('year')
            ->paginate(10);

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
            match ($type) {
                'images' => $query->where('file_type', 'like', 'image/%'),
                'videos' => $query->where('file_type', 'like', 'video/%'),
                'audio' => $query->where('file_type', 'like', 'audio/%'),
                'pdf' => $query->where('file_type', 'application/pdf'),
            };
        }

        $media = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('award/create', [
            'media' => $media
        ]);
    }

    public function store(StoreAwardRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Create Award
        $award = Award::create($data);

        // Attach resource media if provided
        if (!empty($data['media'])) {
            foreach ($data['media'] as $mediaItem) {
                $award->media()->create([
                    'media_id' => $mediaItem['id'],
                    'caption' => $mediaItem['caption'] ?? null,
                    'description' => $mediaItem['description'] ?? null,
                    'sort_order' => $mediaItem['sort_order'] ?? 0,
                ]);
            }
        }

        return redirect()->route('awards.index')
            ->with('success', 'Award created successfully.');
    }

    public function show(Award $award): Response
    {
        return Inertia::render('award/show', [
            'award' => $award->load('featuredImage', 'gallery')
        ]);
    }

    public function edit(Award $award, Request $request): Response
    {
        $perPage = $request->input('perPage', 20);
        $type = $request->input('type', 'all');
        $query = Media::query();

        if ($type !== 'all') {
            match ($type) {
                'images' => $query->where('file_type', 'like', 'image/%'),
                'videos' => $query->where('file_type', 'like', 'video/%'),
                'audio' => $query->where('file_type', 'like', 'audio/%'),
                'pdf' => $query->where('file_type', 'application/pdf'),
            };
        }

        $media = $query->latest()->paginate($perPage)->withQueryString();

        return Inertia::render('award/edit', [
            'award' => $award->load('featuredImage', 'gallery'),
            'media' => $media
        ]);
    }

    public function update(UpdateAwardRequest $request, Award $award): RedirectResponse
    {
        $data = $request->validated();

        // Update Award
        $award->update($data);

        // Sync resource media
        if (isset($data['media'])) {
            $existingIds = $award->media()->pluck('id')->toArray();
            $incomingIds = collect($data['media'])->pluck('id')->filter()->toArray();

            // Delete removed media
            $toDelete = array_diff($existingIds, $incomingIds);
            if (!empty($toDelete)) {
                $award->media()->whereIn('id', $toDelete)->delete();
            }

            // Upsert media
            foreach ($data['media'] as $mediaItem) {
                if (isset($mediaItem['id'])) {
                    $award->media()->updateOrCreate(
                        ['id' => $mediaItem['id']],
                        [
                            'media_id' => $mediaItem['media_id'],
                            'caption' => $mediaItem['caption'] ?? null,
                            'description' => $mediaItem['description'] ?? null,
                            'sort_order' => $mediaItem['sort_order'] ?? 0,
                        ]
                    );
                } else {
                    $award->media()->create([
                        'media_id' => $mediaItem['media_id'],
                        'caption' => $mediaItem['caption'] ?? null,
                        'description' => $mediaItem['description'] ?? null,
                        'sort_order' => $mediaItem['sort_order'] ?? 0,
                    ]);
                }
            }
        }

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
