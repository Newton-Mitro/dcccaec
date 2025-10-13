<?php

namespace App\Infrastructure\Models;

use Database\Factories\HolidayFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'title',
        'description',
    ];

    protected static function newFactory()
    {
        return HolidayFactory::new();
    }
}
