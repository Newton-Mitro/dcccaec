<?php

namespace Database\Factories;

use App\Infrastructure\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProgramFactory extends Factory
{
    protected $model = Program::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'description' => $this->faker->paragraph(5),
            'gallery' => null,
            'media_id' => null,
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}
