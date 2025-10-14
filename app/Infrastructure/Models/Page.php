<?php

namespace App\Infrastructure\Models;

use App\Core\Traits\HasSlug;
use Database\Factories\PageFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Page extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'content',
        'excerpt',
        'json_array',
        'button_text',
        'button_link',
        'media_id',
        'predefined',
    ];

    protected $casts = [
        'json_array' => 'array',
        'predefined' => 'boolean',
    ];

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    public function gallery()
    {
        return $this->morphMany(ResourceMedia::class, 'resource');
    }


    public static function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $counter = 1;

        while (self::where('slug', $slug)->exists()) {
            $slug = "{$originalSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    protected static function newFactory()
    {
        return PageFactory::new();
    }
}
