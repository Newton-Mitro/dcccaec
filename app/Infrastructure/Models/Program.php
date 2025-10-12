<?php

namespace App\Infrastructure\Models;

use App\Core\Traits\HasSlug;
use Database\Factories\ProgramFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory, HasSlug;

    // Make sure all fillable fields are included
    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'description',
        'excerpt',
        'objectives',
        'age_min',
        'age_max',
        'admission_form_fee',
        'admission_fee',
        'yearly_charge',
        'uniform_fee',
        'books_stationary_fee',
        'khata_fee',
        'monthly_fee',
        'media_id',
        'is_active',
        'featured',
    ];

    // Cast JSON fields correctly
    protected $casts = [
        'monthly_fee' => 'array', // JSON column
        'is_active' => 'boolean',
        'featured' => 'boolean',
    ];

    // Relations
    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Generate a unique slug based on name.
     */
    public static function generateUniqueSlug(string $name): string
    {
        $slug = \Str::slug($name);
        $count = static::where('slug', 'like', "$slug%")->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }


    // Factory
    protected static function newFactory()
    {
        return ProgramFactory::new();
    }


}
