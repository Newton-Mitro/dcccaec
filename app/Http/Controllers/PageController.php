<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePageRequest;
use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\ResourceMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class PageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::with('featuredImage')->latest()->paginate(15);

        return Inertia::render('pages/index', [
            'pages' => $pages,
        ]);
    }

    public function create(Request $request): Response
    {
        $media = $this->filterMedia($request);

        return Inertia::render('pages/create', [
            'media' => $media
        ]);
    }

    public function store(StorePageRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $page = Page::create([
                'title' => $request->input('title'),
                'slug' => $request->input('slug') ?: Page::generateUniqueSlug($request->input('title')),
                'meta_title' => $request->input('meta_title'),
                'meta_description' => $request->input('meta_description'),
                'meta_keywords' => $request->input('meta_keywords'),
                'content' => $request->input('content'),
                'excerpt' => $request->input('excerpt'),
                'json_array' => $request->input('json_array'),
                'button_text' => $request->input('button_text'),
                'button_link' => $request->input('button_link'),
                'media_id' => $request->input('media_id'),
                'predefined' => $request->boolean('predefined', false),
            ]);

            $this->syncGallery($page, $request->input('gallery', []));
        });

        return redirect()->route('pages.index')->with('success', 'Page created successfully.');
    }

    public function show(Page $page): Response
    {
        $page->load(['featuredImage', 'gallery.media']);

        return Inertia::render('pages/show', [
            'page' => $page,
            'gallery' => $page->gallery,
        ]);
    }

    public function edit(Page $page, Request $request): Response
    {
        $media = $this->filterMedia($request);
        $page->load(['featuredImage', 'gallery.media']);

        return Inertia::render('pages/edit', [
            'page' => $page,
            'gallery' => $page->gallery,
            'media' => $media,
            'filters' => [
                'type' => $request->input('type', 'all'),
                'perPage' => $request->input('perPage', 20),
            ],
        ]);
    }

    public function update(StorePageRequest $request, Page $page): RedirectResponse
    {
        DB::transaction(function () use ($request, $page) {
            $page->update([
                'title' => $request->input('title'),
                'slug' => $request->input('slug') ?: Page::generateUniqueSlug($request->input('title')),
                'meta_title' => $request->input('meta_title'),
                'meta_description' => $request->input('meta_description'),
                'meta_keywords' => $request->input('meta_keywords'),
                'content' => $request->input('content'),
                'excerpt' => $request->input('excerpt'),
                'json_array' => $request->input('json_array'),
                'button_text' => $request->input('button_text'),
                'button_link' => $request->input('button_link'),
                'media_id' => $request->input('media_id'),
                'predefined' => $request->boolean('predefined', false),
            ]);

            $this->syncGallery($page, $request->input('gallery', []));
        });

        return redirect()->route('pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page): RedirectResponse
    {
        $page->delete();

        return redirect()->route('pages.index')->with('success', 'Page deleted successfully.');
    }

    /**
     * Filter media based on type and paginate.
     */
    private function filterMedia(Request $request)
    {
        $type = $request->input('type', 'all');
        $perPage = $request->input('perPage', 20);

        $query = Media::query();

        match ($type) {
            'images' => $query->where('file_type', 'like', 'image/%'),
            'videos' => $query->where('file_type', 'like', 'video/%'),
            'audio' => $query->where('file_type', 'like', 'audio/%'),
            'pdf' => $query->where('file_type', 'application/pdf'),
            default => null,
        };

        return $query->latest()->paginate($perPage)->withQueryString();
    }

    /**
     * Sync gallery items (ResourceMedia) for a page.
     */
    private function syncGallery(Page $page, array $galleryItems): void
    {
        $existingIds = $page->gallery()->pluck('id')->toArray();
        $incomingIds = collect($galleryItems)->pluck('id')->filter()->toArray();

        // Delete removed items
        $toDelete = array_diff($existingIds, $incomingIds);
        if (!empty($toDelete)) {
            ResourceMedia::whereIn('id', $toDelete)->delete();
        }

        // Create or update gallery items
        foreach ($galleryItems as $item) {
            if (isset($item['id'])) {
                ResourceMedia::where('id', $item['id'])->update([
                    'media_id' => $item['media_id'],
                    'caption' => $item['caption'] ?? null,
                    'description' => $item['description'] ?? null,
                ]);
            } else {
                $page->gallery()->create([
                    'media_id' => $item['media_id'],
                    'caption' => $item['caption'] ?? null,
                    'description' => $item['description'] ?? null,
                ]);
            }
        }
    }
}
