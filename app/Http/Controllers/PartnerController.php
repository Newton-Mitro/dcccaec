<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Partner;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $partners = Partner::with('media')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('partners/index', [
            'partners' => $partners,
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

        return Inertia::render('partners/create', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'media_id' => 'nullable|exists:media,id',
            'website' => 'nullable|url|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        Partner::create($data);

        return redirect()->route('partners.index')->with('success', 'Partner created.');
    }

    public function show(Partner $partner)
    {
        return Inertia::render('partners/show', [
            'partner' => $partner->load('media'),
        ]);
    }

    public function edit(Partner $partner, Request $request)
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

        return Inertia::render('partners/edit', [
            'partner' => $partner->load('media'),
            'media' => $media,
        ]);
    }

    public function update(Request $request, Partner $partner)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'media_id' => 'nullable|exists:media,id',
            'website' => 'nullable|url|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        $partner->update($data);

        return redirect()->route('partners.index')->with('success', 'Partner updated.');
    }

    public function destroy(Partner $partner)
    {
        $partner->delete();

        return redirect()->route('partners.index')->with('success', 'Partner deleted.');
    }
}
