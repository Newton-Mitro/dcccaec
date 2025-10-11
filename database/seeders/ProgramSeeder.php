<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Program;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all media once
        $allImages = Media::where(function ($query) {
            $query->where('file_path', 'like', '%images%');
        })->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping ProgramSeeder.');
            return;
        }

        $serviceCount = 9;

        for ($i = 0; $i < $serviceCount; $i++) {
            Program::factory()->create([
                'media_id' => $allImages->random()->id,
                'gallery' => $allImages->random(rand(1, 5))->pluck('url')->toArray()
            ]);
        }

        $this->command->info("✅ {$serviceCount} programs seeded with random categories, media, and galleries.");
    }
}
