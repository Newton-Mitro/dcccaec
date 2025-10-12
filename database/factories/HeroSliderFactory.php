<?php

namespace Database\Factories;

use App\Infrastructure\Models\HeroSlider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class HeroSliderFactory extends Factory
{
    protected $model = HeroSlider::class;

    const BUTTONS = [
        ['text' => 'About Us', 'link' => '/about-us/our-story'],
        ['text' => 'Enroll Now', 'link' => '/programs'],
        ['text' => 'Our Programs', 'link' => '/programs'],
        ['text' => 'Contact Us', 'link' => '/contact-us'],
    ];

    const TITLES = [
        'Nurturing the Leaders of Tomorrow',
        'A Safe and Fun Learning Environment',
        'Growing Minds, Building Futures',
        'Quality Care, Every Step of the Way',
        'Where Every Child Shines',
    ];

    const SUBTITLES = [
        'Empowering children with love, care, and education.',
        'Holistic development programs for young learners.',
        'Join our family and watch your child thrive.',
        'Creating a foundation for lifelong learning.',
        'Passionate teachers. Happy children. Bright futures.',
    ];

    public function definition(): array
    {
        $button = Arr::random(self::BUTTONS);

        return [
            'title' => Arr::random(self::TITLES),
            'subtitle' => Arr::random(self::SUBTITLES),
            'button_text' => $button['text'],
            'button_link' => $button['link'],
            'media_id' => null,
            'sort_order' => $this->faker->numberBetween(0, 10),
            'status' => 'Active',
        ];
    }
}
