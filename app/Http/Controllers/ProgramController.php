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
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
        $categories = Category::where('category_of', 'Program')->get();

        return Inertia::render('programs/create', [
            'media' => $media,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'gallery' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Get title from request
        $title = $request->input('title');

        // Generate slug (unique)
        $data['slug'] = $request->input('slug') ?: Program::generateUniqueSlug($title);

        // Set default status
        $data['status'] = 'Active';

        Program::create($data);

        return redirect()->route('programs.index')->with('success', 'Program created.');
    }


    public function show(Program $program)
    {
        return Inertia::render('programs/show', [
            'program' => $program->load(['media', 'category']),
        ]);
    }

    public function edit(Program $program, Request $request)
    {
        $perPage = $request->input('perPage', 10);

        $media = Media::latest()->paginate($perPage)->withQueryString();
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
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:programs,slug,' . $program->id,
            'description' => 'nullable|string',
            'gallery' => 'nullable|array',
            'media_id' => 'nullable|exists:media,id',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:Active,Inactive',
        ]);

        $program->update($data);

        return redirect()->route('programs.index')->with('success', 'Program updated.');
    }

    public function destroy(Program $program)
    {
        $program->delete();
        return redirect()->route('programs.index')->with('success', 'Program deleted.');
    }
}
