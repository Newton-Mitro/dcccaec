<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust as needed for your auth policy
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:pages,slug,' . $this->route('page')],
            'meta_title' => ['nullable', 'string', 'max:255'],
            'meta_description' => ['nullable', 'string'],
            'meta_keywords' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'excerpt' => ['nullable', 'string'],
            'json_array' => ['nullable', 'json'],
            'button_text' => ['nullable', 'string', 'max:255'],
            'button_link' => ['nullable', 'string', 'max:255'],
            'media_id' => ['nullable', 'exists:media,id'],
            'predefined' => ['boolean'],

            // Related media gallery
            'gallery' => ['array'],
            'gallery.*.media_id' => ['required', 'exists:media,id'],
            'gallery.*.caption' => ['nullable', 'string', 'max:255'],
            'gallery.*.description' => ['nullable', 'string'],
        ];
    }
}
