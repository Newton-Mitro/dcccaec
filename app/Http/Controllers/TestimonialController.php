<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Testimonial;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $testimonials = Testimonial::with('clientImage')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('testimonials/index', [
            'testimonials' => $testimonials,
        ]);
    }

    public function create(Request $request)
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

        return Inertia::render('testimonials/create', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_designation' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'media_id' => 'nullable|exists:media,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'status' => 'required|in:Active,Inactive',
        ]);

        Testimonial::create($data);

        return redirect()->route('testimonials.index')->with('success', 'Testimonial created.');
    }

    public function show(Testimonial $testimonial)
    {
        return Inertia::render('testimonials/show', [
            'testimonial' => $testimonial->load('clientImage'),
        ]);
    }

    public function edit(Testimonial $testimonial, Request $request)
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

        return Inertia::render('testimonials/edit', [
            'testimonial' => $testimonial->load('clientImage'),
            'media' => $media,
        ]);
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $data = $request->validate([
            'author_name' => 'required|string|max:255',
            'author_designation' => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'message' => 'required|string',
            'media_id' => 'nullable|exists:media,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'status' => 'required|in:Active,Inactive',
        ]);

        $testimonial->update($data);

        return redirect()->route('testimonials.index')->with('success', 'Testimonial updated.');
    }

    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();

        return redirect()->route('testimonials.index')->with('success', 'Testimonial deleted.');
    }
}
