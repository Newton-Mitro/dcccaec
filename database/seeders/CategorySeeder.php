<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Team' => [
                'Management',
                'Engineering',
                'Design',
                'Marketing',
                'Sales',
                'Customer Support',
            ],
            'Leader' => ['Directors'],
            'Article' => ['Tech Insights', 'Business Strategy', 'Lifestyle'],
            'Event' => ['Conferences', 'Workshops', 'Meetups'],
            'Notice' => ['Announcements', 'Exams', 'General Notices'],
            'Program' => [
                'Early Learning & Development',
                'Arts & Expression',
                'STEM Education',
                'Health & Wellness',
                'Community & Enrichment',
                'Seasonal Activities',
                'Early Learning',
                'Early Education',
            ],
        ];

        // Preload all available image IDs
        $allImages = Media::where('file_path', 'like', '%images%')->pluck('id');

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠ No media found containing "images" in file_path. Seed Media first!');
            return;
        }

        foreach ($categories as $categoryOf => $names) {
            foreach ($names as $name) {
                Category::factory()->create([
                    'category_of' => $categoryOf,
                    'name' => $name,
                    'slug' => Str::slug($name . '-' . strtolower($categoryOf)),
                    'description' => "<p>This is the <strong>{$name}</strong> category under {$categoryOf}.</p>",
                    'media_id' => $allImages->random(),
                ]);
            }
        }

        $this->command->info('✅ All categories seeded successfully.');
    }
}
