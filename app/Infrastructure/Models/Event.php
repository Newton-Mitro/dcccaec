<?php

namespace App\Infrastructure\Models;

use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'description', 'start_date', 'end_date', 'location', 'media_id'];

    public function featuredImage()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    public function gallery()
    {
        return $this->morphMany(ResourceMedia::class, 'resource');
    }

    protected static function newFactory()
    {
        return EventFactory::new();
    }
}
