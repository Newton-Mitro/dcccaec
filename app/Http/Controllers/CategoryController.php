<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categoryOf = $request->input('category_of'); // e.g., Product, Article, etc.

        $categories = Category::with('media', 'parent')
            ->when($categoryOf, function ($query, $categoryOf) {
                $query->where('category_of', $categoryOf);
            })
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('categories/index', [
            'categories' => $categories,
            'categoryOf' => $categoryOf,
            'categoryList' => Category::select('category_of')->distinct()->pluck('category_of'),
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

        $parents = Category::all();

        return Inertia::render('categories/create', [
            'categories' => $parents,
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_of' => 'required|in:Team,Leader,Student,Teacher,Doctor,Service,Product,Project,Event,Notice,Article',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug',
            'description' => 'nullable|string',
            'media_id' => 'nullable|exists:media,id',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        Category::create($data);

        return redirect()->route('categories.index')->with('success', 'Category created.');
    }

    public function show(Category $category)
    {
        return Inertia::render('categories/show', [
            'category' => $category->load('media', 'parent')
        ]);
    }

    public function edit(Category $category, Request $request)
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

        $parents = Category::all();

        return Inertia::render('categories/edit', [
            'category' => $category->load('media'),
            'categories' => $parents,
            'media' => $media,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'category_of' => 'required|in:Team,Leader,Student,Teacher,Doctor,Service,Product,Project,Event,Notice,Article',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,' . $category->id,
            'description' => 'nullable|string',
            'media_id' => 'nullable|exists:media,id',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category->update($data);

        return redirect()->route('categories.index')->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted.');
    }
}

