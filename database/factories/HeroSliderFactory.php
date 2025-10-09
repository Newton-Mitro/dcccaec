<?php

namespace Database\Factories;

use App\Infrastructure\Models\HeroSlider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class HeroSliderFactory extends Factory
{
    protected $model = HeroSlider::class;

    const BUTTON_TEXTS = ['About Us', 'Contact Us', 'Enroll Now', 'Our Programmes', 'Read More'];

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(4),
            'subtitle' => $this->faker->sentence(6),
            'button_text' => Arr::random(self::BUTTON_TEXTS),
            'button_link' => $this->faker->url(),
            'media_id' => null,
            'sort_order' => $this->faker->numberBetween(0, 10),
            'status' => 'Active',
        ];
    }
}
