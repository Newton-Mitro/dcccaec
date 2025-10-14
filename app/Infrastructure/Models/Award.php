<?php

namespace App\Infrastructure\Models;

use Database\Factories\AwardFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'organization',
        'year',
        'description',
        'media_id',
        'sort_order',
        'status',
    ];

    protected $casts = [
        'year' => 'integer',
        'sort_order' => 'integer',
    ];

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
        return AwardFactory::new();
    }
}
