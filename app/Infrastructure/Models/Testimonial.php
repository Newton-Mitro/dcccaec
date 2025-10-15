<?php

namespace App\Infrastructure\Models;

use Database\Factories\TestimonialFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_name',
        'author_designation',
        'company',
        'message',
        'media_id',
        'rating',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'rating' => 'integer',
        'sort_order' => 'integer',
    ];

    public function clientImage()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    protected static function newFactory()
    {
        return TestimonialFactory::new();
    }
}
