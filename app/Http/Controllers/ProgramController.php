<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Program;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProgramController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $programs = Program::with(['media', 'category'])
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('programs/index', [
            'programs' => $programs,
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
        $categories = Category::where('category_of', 'Program')->get();

        return Inertia::render('programs/create', [
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:programs,slug',
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'objectives' => 'nullable|string',
            'age_min' => 'nullable|integer',
            'age_max' => 'nullable|integer',
            'admission_form_fee' => 'nullable|string',
            'admission_fee' => 'nullable|string',
            'yearly_charge' => 'nullable|string',
            'uniform_fee' => 'nullable|string',
            'books_stationary_fee' => 'nullable|string',
            'khata_fee' => 'nullable|string',
            'monthly_fee' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);

        // Generate slug if not provided
        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Program::generateUniqueSlug($data['name']);
        }

        $program = Program::create($data);

        return redirect()->route('programs.index')->with('success', 'Program created successfully.');
    }

    public function show(Program $program)
    {
        return Inertia::render('programs/show', [
            'program' => $program->load(['media', 'category']),
        ]);
    }

    public function edit(Program $program, Request $request)
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
        $categories = Category::where('category_of', 'Program')->get();

        return Inertia::render('programs/edit', [
            'program' => $program->load(['media']),
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:programs,slug,' . $program->id,
            'category' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'excerpt' => 'nullable|string',
            'objectives' => 'nullable|string',
            'age_min' => 'nullable|integer',
            'age_max' => 'nullable|integer',
            'admission_form_fee' => 'nullable|string',
            'admission_fee' => 'nullable|string',
            'yearly_charge' => 'nullable|string',
            'uniform_fee' => 'nullable|string',
            'books_stationary_fee' => 'nullable|string',
            'khata_fee' => 'nullable|string',
            'monthly_fee' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);

        $program->update($data);

        return redirect()->route('programs.index')->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->route('programs.index')->with('success', 'Program deleted successfully.');
    }
}
