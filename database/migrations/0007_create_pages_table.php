<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle')->nullable();
            $table->string('slug')->unique();

            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();

            $table->longText('content')->nullable();
            $table->text('excerpt')->nullable();
            $table->json('json_array')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();

            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('predefined')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
