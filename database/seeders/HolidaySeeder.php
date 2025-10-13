<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Holiday;
use Illuminate\Database\Seeder;

class HolidaySeeder extends Seeder
{
    public function run(): void
    {
        // Add a real entry
        Holiday::create([
            'date' => '2025-02-21',
            'title' => 'International Mother Language Day',
            'description' => 'Commemorates the martyrs of the Bengali Language Movement.',
        ]);

        // Add some random demo holidays
        Holiday::factory()->count(5)->create();
    }
}

