<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\User;
use App\Infrastructure\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // List all users with pagination
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 20);

        $users = User::latest()
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('users/index', [
            'users' => $users,
        ]);
    }

    // Show single user
    public function show(User $user)
    {
        return Inertia::render('users/show', [
            'user' => $user,
        ]);
    }

    // Create user page
    public function create(Request $request)
    {
        // Optionally fetch media for avatar selection
        $perPage = $request->input('perPage', 20);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('users/create', [
            'media' => $media,
        ]);
    }

    // Store user
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'username' => 'nullable|string|unique:users,username',
            'avatar_id' => 'nullable|exists:media,id',
            'headline' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'settings' => 'nullable|json',
            'role' => 'required|in:VISITOR,EDITOR,ADMIN',
        ]);

        $data['password'] = bcrypt($data['password']);

        User::create($data);

        return redirect()->route('users.index')->with('success', 'User created successfully!');
    }

    // Edit user
    public function edit(User $user, Request $request)
    {
        $perPage = $request->input('perPage', 20);
        $media = Media::latest()->paginate($perPage)->withQueryString();

        return Inertia::render('users/edit', [
            'user' => $user,
            'media' => $media,
        ]);
    }

    // Update user
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'username' => 'nullable|string|unique:users,username,' . $user->id,
            'avatar_id' => 'nullable|exists:media,id',
            'headline' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'settings' => 'nullable|json',
            'role' => 'required|in:VISITOR,EDITOR,ADMIN',
        ]);

        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('success', 'User updated successfully!');
    }

    // Delete user
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully!');
    }
}
