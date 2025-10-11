<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProgramRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // allow authorized users
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:programs,slug,' . $this->route('program')],
            'description' => ['nullable', 'string'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['string'],
            'icon_media_id' => ['nullable', 'exists:media,id'],
            'media_id' => ['nullable', 'exists:media,id'],
            'status' => ['sometimes', 'required', 'in:active,inactive'],
        ];
    }
}
