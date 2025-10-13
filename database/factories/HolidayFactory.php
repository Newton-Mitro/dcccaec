<?php

namespace Database\Factories;

use App\Infrastructure\Models\Holiday;
use Illuminate\Database\Eloquent\Factories\Factory;

class HolidayFactory extends Factory
{
    protected $model = Holiday::class;

    public function definition(): array
    {
        return [
            'date' => $this->faker->dateTimeBetween('2025-01-01', '2025-12-31')->format('Y-m-d'),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->optional()->sentence(10),
        ];
    }
}
