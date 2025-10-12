<?php

namespace Database\Seeders;

use App\Infrastructure\Models\HeroSlider;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class HeroSliderSeeder extends Seeder
{
    public function run(): void
    {
        // Get only media IDs containing "images" in the path
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        // Create 6 sliders with a random media ID each
        HeroSlider::factory(6)->create([
            'media_id' => function () use ($allImages) {
                return $allImages->random();
            },
        ]);

        $this->command->info('✅ HeroSlider seeding completed!');
    }
}
