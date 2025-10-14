<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHeroSliderRequest;
use App\Http\Requests\UpdateHeroSliderRequest;
use App\Infrastructure\Models\HeroSlider;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class HeroSliderController extends Controller
{
    public function index(): Response
    {
        $sliders = HeroSlider::with('featuredImage')->orderBy('sort_order', 'asc')->paginate(10);

        return Inertia::render('hero_slides/index', [
            'sliders' => $sliders,
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

        return Inertia::render('hero_slides/create', [
            'media' => $media
        ]);

    }

    public function store(StoreHeroSliderRequest $request): RedirectResponse
    {
        $data = $request->validated();
        HeroSlider::create($data);

        return redirect()->route('hero-sliders.index')
            ->with('success', 'Hero slider created successfully.');
    }

    public function show(HeroSlider $hero_slider): Response
    {
        return Inertia::render('hero_slides/show', [
            'heroSlide' => $hero_slider->load('featuredImage'),
        ]);
    }

    public function edit(HeroSlider $hero_slider, Request $request): Response
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

        return Inertia::render('hero_slides/edit', [
            'heroSlide' => $hero_slider->load('featuredImage'),
            'media' => $media
        ]);
    }


    public function update(UpdateHeroSliderRequest $request, HeroSlider $hero_slider): RedirectResponse
    {
        $data = $request->validated();
        $hero_slider->update($data);

        return redirect()->route('hero-sliders.index')
            ->with('success', 'Hero slider updated successfully.');
    }

    public function destroy(HeroSlider $hero_slider): RedirectResponse
    {
        $hero_slider->delete();

        return redirect()->route('hero-sliders.index')
            ->with('success', 'Hero slider deleted successfully.');
    }
}
