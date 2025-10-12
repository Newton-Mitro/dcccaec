<?php

namespace Database\Factories;

use App\Infrastructure\Models\Program;
use App\Infrastructure\Models\Category;
use App\Infrastructure\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProgramFactory extends Factory
{
    protected $model = Program::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->sentence(3);
        $category = Category::inRandomOrder()->first(); // Random existing category
        $media = Media::inRandomOrder()->first();       // Random existing media

        return [
            'name' => $name,
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'category_id' => $category?->id,
            'description' => $this->faker->paragraphs(5, true),
            'excerpt' => $this->faker->sentence(),
            'objectives' => $this->faker->sentence(),
            'age_min' => $this->faker->numberBetween(0, 5),
            'age_max' => $this->faker->numberBetween(6, 10),
            'admission_form_fee' => (string) $this->faker->numberBetween(100, 1000),
            'admission_fee' => (string) $this->faker->numberBetween(5000, 10000),
            'yearly_charge' => (string) $this->faker->numberBetween(1000, 5000),
            'uniform_fee' => (string) $this->faker->numberBetween(500, 2000),
            'books_stationary_fee' => $this->faker->randomElement(['According to class', 'Variable']),
            'khata_fee' => (string) $this->faker->numberBetween(30, 100),
            'monthly_fee' => [
                'Play Group' => $this->faker->numberBetween(1500, 2500),
                'Nursery' => $this->faker->numberBetween(2000, 3000),
                'KG' => $this->faker->numberBetween(2200, 3500),
            ],
            'media_id' => $media?->id,
            'is_active' => $this->faker->boolean(80), // 80% chance true
            'featured' => $this->faker->boolean(50),
        ];
    }
}
