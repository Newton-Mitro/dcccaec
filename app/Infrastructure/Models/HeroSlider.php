<?php

namespace App\Infrastructure\Models;

use Database\Factories\HeroSliderFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSlider extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'subtitle', 'button_text', 'button_link', 'media_id', 'sort_order'];

    public function featuredImage()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    protected static function newFactory()
    {
        return HeroSliderFactory::new();
    }
}
