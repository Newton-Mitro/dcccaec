<?php

namespace App\Infrastructure\Models;

use Database\Factories\TestimonialFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'designation', 'message', 'media_id'];

    public function clientImage()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    protected static function newFactory()
    {
        return TestimonialFactory::new();
    }
}
