<?php

namespace App\Infrastructure\Models;

use Database\Factories\ResourceMediaFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResourceMedia extends Model
{
    use HasFactory;

    // Correct fillable fields for a polymorphic relationship
    protected $fillable = [
        'resource_id',   // ID of the parent (Program, Gallery, Page, etc.)
        'resource_type', // Class of the parent model
        'media_id',
        'caption',
        'description',
        'sort_order',    // optional ordering field
    ];

    /**
     * Polymorphic relation to the parent model
     */
    public function resource()
    {
        return $this->morphTo();
    }

    public function media()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }

    protected static function newFactory()
    {
        return ResourceMediaFactory::new();
    }
}
