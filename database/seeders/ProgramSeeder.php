<?php

namespace Database\Seeders;

use App\Infrastructure\Models\Media;
use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Program;
use App\Infrastructure\Models\ResourceMedia;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Fetch all media
        $allImages = Media::where('file_path', 'like', '%images%')->get();

        if ($allImages->isEmpty()) {
            $this->command->warn('⚠️ No media found. Skipping ProgramSeeder.');
            return;
        }

        // Fetch program categories
        $categories = Category::whereIn('name', [
            'Early Learning & Development',
            'Arts & Expression',
            'STEM Education',
            'Health & Wellness',
            'Community & Enrichment',
            'Seasonal Activities',
            'Early Learning',
            'Early Education',
        ])->pluck('id', 'name');

        $programs = [
            [
                'name' => 'Early Literacy Program',
                'slug' => 'early-literacy-program',
                'category_id' => $categories['Early Learning & Development'] ?? null,
                'excerpt' => 'Fosters language skills through reading and storytelling.',
                'description' => '
                    <p>The <strong>Early Literacy Program</strong> introduces children to phonics, storytelling, and creative language activities:</p>
                    <ul>
                        <li>Interactive reading sessions</li>
                        <li>Phonics-based games and exercises</li>
                        <li>Story creation and expression workshops</li>
                    </ul>
                    <p>This playful approach helps build strong vocabulary, comprehension, and love for reading.</p>
                ',
                'objectives' => 'Develop vocabulary, listening skills, and early reading confidence.',
                'age_min' => 3,
                'age_max' => 5,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
            [
                'name' => 'Creative Arts Program',
                'slug' => 'creative-arts-program',
                'category_id' => $categories['Arts & Expression'] ?? null,
                'excerpt' => 'Encourages imagination through painting, crafts, and music.',
                'description' => '
                    <p><strong>Creative Arts Program</strong> develops children’s imagination and expression through art and music:</p>
                    <ul>
                        <li>Painting, drawing, and sculpture projects</li>
                        <li>Rhythmic and musical exploration</li>
                        <li>Storytelling through movement and drama</li>
                    </ul>
                    <p>This program enhances motor skills, creativity, and emotional expression.</p>
                ',
                'objectives' => 'Improve coordination, foster creativity, and build self-expression.',
                'age_min' => 2,
                'age_max' => 6,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
            [
                'name' => 'STEM Explorers',
                'slug' => 'stem-explorers',
                'category_id' => $categories['STEM Education'] ?? null,
                'excerpt' => 'Hands-on exploration in science, technology, and math.',
                'description' => '
                    <p><strong>STEM Explorers</strong> introduces children to STEM concepts through interactive activities:</p>
                    <ul>
                        <li>Simple coding and robotics exercises</li>
                        <li>Creative building and problem-solving challenges</li>
                        <li>Science experiments with everyday materials</li>
                    </ul>
                    <p>Encourages critical thinking, teamwork, and curiosity.</p>
                ',
                'objectives' => 'Promote curiosity, critical thinking, and problem-solving skills.',
                'age_min' => 4,
                'age_max' => 7,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
            [
                'name' => 'Mindfulness & Movement',
                'slug' => 'mindfulness-and-movement',
                'category_id' => $categories['Health & Wellness'] ?? null,
                'excerpt' => 'Combines yoga and mindfulness for emotional balance.',
                'description' => '
                    <p>The <strong>Mindfulness & Movement</strong> program helps children develop focus, emotional awareness, and physical coordination:</p>
                    <ul>
                        <li>Yoga and movement exercises</li>
                        <li>Breathing techniques and mindfulness games</li>
                        <li>Relaxation and gratitude practices</li>
                    </ul>
                    <p>Supports self-regulation and emotional intelligence.</p>
                ',
                'objectives' => 'Improve emotional awareness; reduce anxiety; enhance body coordination.',
                'age_min' => 3,
                'age_max' => 6,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
            [
                'name' => 'After-School Club',
                'slug' => 'after-school-club',
                'category_id' => $categories['Community & Enrichment'] ?? null,
                'excerpt' => 'Offers structured learning and fun after school hours.',
                'description' => '
                    <p>The <strong>After-School Club</strong> provides children with homework support and creative activities:</p>
                    <ul>
                        <li>Homework assistance and tutoring</li>
                        <li>STEM and arts workshops</li>
                        <li>Social games and team-building exercises</li>
                    </ul>
                    <p>Focuses on academic growth, social engagement, and confidence building.</p>
                ',
                'objectives' => 'Support academic growth; provide social engagement; build confidence.',
                'age_min' => 5,
                'age_max' => 10,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
            [
                'name' => 'Infant Care',
                'slug' => 'infant-care',
                'category_id' => $categories['Early Learning'] ?? null,
                'excerpt' => 'Gentle care and nurturing for infants.',
                'description' => '
                    <p>The <strong>Infant Care</strong> program provides attentive care for infants in a safe environment:</p>
                    <ul>
                        <li>Feeding and sleeping routines</li>
                        <li>Gentle sensory stimulation activities</li>
                        <li>Parental guidance and updates</li>
                    </ul>
                    <p>Ensures infants feel safe, nurtured, and engaged.</p>
                ',
                'objectives' => 'Provide safe, nurturing care and sensory stimulation.',
                'age_min' => 0,
                'age_max' => 2,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000]),
            ],
            [
                'name' => 'Toddler Care',
                'slug' => 'toddler-care',
                'category_id' => $categories['Early Learning'] ?? null,
                'excerpt' => 'Encourages independence and curiosity.',
                'description' => '
                    <p><strong>Toddler Care</strong> promotes exploration, independence, and early learning:</p>
                    <ul>
                        <li>Fine and gross motor skill activities</li>
                        <li>Creative play and discovery</li>
                        <li>Social interaction and cooperation exercises</li>
                    </ul>
                    <p>Helps toddlers build confidence and curiosity in a safe space.</p>
                ',
                'objectives' => 'Support early motor development and curiosity.',
                'age_min' => 2,
                'age_max' => 3,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Nursery' => 2200]),
            ],
            [
                'name' => 'Preschool Program',
                'slug' => 'preschool-program',
                'category_id' => $categories['Early Education'] ?? null,
                'excerpt' => 'Structured learning for early school readiness.',
                'description' => '
                    <p>The <strong>Preschool Program</strong> prepares children for school through structured lessons and play-based learning:</p>
                    <ul>
                        <li>Early math and literacy activities</li>
                        <li>Group projects and storytelling</li>
                        <li>Social and emotional skill development</li>
                    </ul>
                    <p>Builds a strong foundation for lifelong learning.</p>
                ',
                'objectives' => 'Build foundational math, reading, and social skills.',
                'age_min' => 3,
                'age_max' => 5,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
            [
                'name' => 'After-School Program',
                'slug' => 'after-school-program',
                'category_id' => $categories['Community & Enrichment'] ?? null,
                'excerpt' => 'Academic support and activities after school.',
                'description' => '
                    <p><strong>After-School Program</strong> supports school-age children with homework and enrichment:</p>
                    <ul>
                        <li>Homework assistance and tutoring</li>
                        <li>Arts, STEM, and sports activities</li>
                        <li>Social skill-building games</li>
                    </ul>
                    <p>Encourages both academic and personal growth in a safe environment.</p>
                ',
                'objectives' => 'Enhance academic skills and social interaction.',
                'age_min' => 6,
                'age_max' => 10,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['KG' => 2400]),
            ],
            [
                'name' => 'Summer Camp Program',
                'slug' => 'summer-camp-program',
                'category_id' => $categories['Seasonal Activities'] ?? null,
                'excerpt' => 'Engaging summer adventures and exploration.',
                'description' => '
                    <p><strong>Summer Camp Program</strong> offers children fun, adventure, and learning during summer:</p>
                    <ul>
                        <li>Outdoor exploration and games</li>
                        <li>Creative arts and team challenges</li>
                        <li>Friendship-building activities</li>
                    </ul>
                    <p>Promotes independence, creativity, and social skills.</p>
                ',
                'objectives' => 'Build friendships, creativity, and outdoor skills.',
                'age_min' => 6,
                'age_max' => 12,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['KG' => 2400]),
            ],
            [
                'name' => 'Physical Activity Program',
                'slug' => 'physical-activity-program',
                'category_id' => $categories['Health & Wellness'] ?? null,
                'excerpt' => 'Play-based exercise and fitness for children.',
                'description' => '
                    <p><strong>Physical Activity Program</strong> encourages movement, coordination, and fitness through fun activities:</p>
                    <ul>
                        <li>Group sports and games</li>
                        <li>Yoga and balance exercises</li>
                        <li>Outdoor challenges and obstacle courses</li>
                    </ul>
                    <p>Supports healthy habits and physical development for children.</p>
                ',
                'objectives' => 'Promote movement, coordination, and healthy habits.',
                'age_min' => 3,
                'age_max' => 7,
                'admission_form_fee' => '500',
                'admission_fee' => '8000',
                'yearly_charge' => '3000',
                'uniform_fee' => '1400',
                'books_stationary_fee' => 'According to class',
                'khata_fee' => '50',
                'monthly_fee' => json_encode(['Play Group' => 2000, 'Nursery' => 2200, 'KG' => 2400]),
            ],
        ];

        // Add media, status, timestamps
        foreach ($programs as &$program) {
            $program['media_id'] = $allImages->random()->id ?? null;
            $program['is_active'] = true;
            $program['featured'] = $program['featured'] ?? false;
            $program['created_at'] = now();
            $program['updated_at'] = now();
        }

        // Insert all programs
        DB::table('programs')->insert($programs);

        // Fetch the inserted programs to attach related media
        $insertedPrograms = Program::all();

        foreach ($insertedPrograms as $program) {
            $mediaItems = $allImages->random(rand(3, 6)); // random 3–6 related images

            foreach ($mediaItems as $media) {
                ResourceMedia::create([
                    'resource_id' => $program->id,
                    'resource_type' => Program::class,
                    'media_id' => $media->id,
                    'caption' => fake()->sentence(),
                    'description' => fake()->paragraph(),
                    'sort_order' => rand(0, 10),
                ]);
            }
        }



        $this->command->info("✅ All programs seeded with HTML-rich descriptions, fees, and media.");
    }
}
