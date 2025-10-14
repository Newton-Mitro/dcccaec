<?php

namespace Database\Factories;

use App\Infrastructure\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PageFactory extends Factory
{
    protected $model = Page::class;

    public function definition(): array
    {
        $title = $this->faker->unique()->sentence(3);

        return [
            'title' => $title,
            'slug' => Str::slug($title) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'meta_title' => $this->faker->sentence(6),
            'meta_description' => $this->faker->paragraph(),
            'meta_keywords' => implode(', ', $this->faker->words(5)),
            'content' => $this->faker->paragraphs(3, true),
            'excerpt' => $this->faker->sentence(),
            'json_array' => [
                'highlight' => $this->faker->words(3),
                'theme' => $this->faker->randomElement(['light', 'dark']),
            ],
            'button_text' => $this->faker->randomElement(['Read More', 'Learn More', 'Explore', 'Join Now']),
            'button_link' => $this->faker->url(),
            'media_id' => null,
            'predefined' => $this->faker->boolean(10),
        ];
    }

    /**
     * Indicate that the page is predefined (system page).
     */
    public function predefined(): static
    {
        return $this->state(fn() => ['predefined' => true]);
    }

    /**
     * Create a page without any media.
     */
    public function withoutMedia(): static
    {
        return $this->state(fn() => ['media_id' => null]);
    }
}
