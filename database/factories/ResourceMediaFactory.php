<?php

namespace Database\Factories;

use App\Infrastructure\Models\ResourceMedia;
use Illuminate\Database\Eloquent\Factories\Factory;

class ResourceMediaFactory extends Factory
{
    protected $model = ResourceMedia::class;

    public function definition(): array
    {
        $faker = $this->faker;

        return [
            'resource_id' => null,
            'resource_type' => null,
            'media_id' => null,

            'caption' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
        ];
    }

}
