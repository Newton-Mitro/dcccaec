<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Event;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch Event category IDs
        $eventCategoryIds = Category::where('category_of', 'Event')->pluck('id');
        if ($eventCategoryIds->isEmpty()) {
            $this->command->warn('⚠️ No Event categories found. Skipping EventSeeder.');
            return;
        }

        // Fetch media (optional, can assign random image to events)
        $allImages = Media::where('file_path', 'like', '%images%')->get();

        // Define Child Care events
        $childCareEvents = [
            ['date' => '2025-07-06', 'title' => 'Ashura', 'remarks' => 'Centre Close'],
            ['date' => '2025-07-14', 'title' => 'New Academic Year Start', 'remarks' => ''],
            ['date' => '2025-08-16', 'title' => 'Janmashtami', 'remarks' => 'Centre Close'],
            ['date' => '2025-09-05', 'title' => 'Eid – E- Milad-un-Nabi', 'remarks' => 'Centre Close'],
            ['date' => '2025-09-07', 'title' => 'Grand Parents Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2025-10-01', 'title' => 'Durga Puja Celebration', 'remarks' => 'In Centre'],
            ['date' => '2025-10-02', 'title' => 'Durga Puja', 'remarks' => 'Centre Close'],
            ['date' => '2025-10-15', 'title' => 'Global Hand Washing Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2025-10-30', 'title' => 'Halloween Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2025-11-18', 'title' => 'Assessment Week', 'remarks' => '18th - 26th November'],
            ['date' => '2025-11-27', 'title' => 'Thanksgiving Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2025-12-13', 'title' => 'Victory Day & Christmas Party', 'remarks' => 'Parents-Teachers Meeting and Progress Report'],
            ['date' => '2025-12-16', 'title' => 'Victory Day', 'remarks' => 'Centre Close'],
            ['date' => '2025-12-24', 'title' => 'Christmas Holiday', 'remarks' => 'Centre Close'],
            ['date' => '2025-12-25', 'title' => 'Christmas Holiday', 'remarks' => 'Centre Close'],
            ['date' => '2026-02-04', 'title' => 'Shab-e-Barat', 'remarks' => 'Centre Close'],
            ['date' => '2026-02-08', 'title' => 'DC Child Care Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2026-02-12', 'title' => 'Pohela Falgun & Valentine’s Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2026-02-21', 'title' => 'International Mother Language Day', 'remarks' => 'Centre Close'],
            ['date' => '2026-02-28', 'title' => 'Mother Language Day Celebration & Book Fair', 'remarks' => 'In Centre'],
            ['date' => '2026-03-10', 'title' => 'Eid Celebration & Independence Day', 'remarks' => 'In Centre'],
            ['date' => '2026-03-18', 'title' => 'Laylat-Tul-Qadr', 'remarks' => 'Centre Close'],
            ['date' => '2026-03-20', 'title' => 'Jumatul Bidah', 'remarks' => 'Centre Close'],
            ['date' => '2026-03-21', 'title' => 'Eid-ul-Fitar', 'remarks' => '2 Days Holiday'],
            ['date' => '2026-03-22', 'title' => 'Eid-ul-Fitar', 'remarks' => '2 Days Holiday'],
            ['date' => '2026-03-26', 'title' => 'Independence Day', 'remarks' => 'Centre Close'],
            ['date' => '2026-04-04', 'title' => 'Easter Holiday', 'remarks' => '2 Days Holiday'],
            ['date' => '2026-04-05', 'title' => 'Easter Holiday', 'remarks' => '2 Days Holiday'],
            ['date' => '2026-04-13', 'title' => 'Bangla New Year Celebration', 'remarks' => 'In Centre'],
            ['date' => '2026-04-14', 'title' => 'Bangla New Year', 'remarks' => 'Centre Close'],
            ['date' => '2026-04-22', 'title' => 'Earth Day', 'remarks' => 'Celebration in Centre'],
            ['date' => '2026-05-01', 'title' => 'Labour Day', 'remarks' => 'Centre Close'],
            ['date' => '2026-05-13', 'title' => 'Final Assessment Week', 'remarks' => '13th-19th May'],
            ['date' => '2026-05-20', 'title' => 'Eid Celebration & Class Party', 'remarks' => 'In Centre'],
            ['date' => '2026-05-22', 'title' => 'Budha Purnima', 'remarks' => 'Centre Close'],
            ['date' => '2026-05-26', 'title' => 'Eid-ul-Adha', 'remarks' => '3 Days Holiday'],
            ['date' => '2026-05-27', 'title' => 'Eid-ul-Adha', 'remarks' => '3 Days Holiday'],
            ['date' => '2026-05-28', 'title' => 'Eid-ul-Adha', 'remarks' => '3 Days Holiday'],
            ['date' => '2026-06-13', 'title' => 'Parents-Teacher Meeting & Report Card', 'remarks' => 'In Centre'],
        ];

        // Loop through each event and insert into database
        foreach ($childCareEvents as $event) {
            Event::create([
                'title' => $event['title'],
                'slug' => \Str::slug($event['title'] . '-' . $event['date']),
                'description' => $event['remarks'],
                'category_id' => $eventCategoryIds->random(),
                'media_id' => $allImages->isNotEmpty() ? $allImages->random()->id : null,
                'start_date' => $event['date'],
                'end_date' => $event['date'], // Adjust if event is multi-day
                'status' => 'Active',
            ]);
        }

        $this->command->info('✅ Child Care events seeded successfully.');
    }
}
