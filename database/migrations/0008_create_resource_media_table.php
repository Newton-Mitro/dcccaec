<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('resource_media', function (Blueprint $table) {
            $table->id();

            // Polymorphic relation: page, program, service, project, etc.
            $table->morphs('resource'); // creates resource_id (unsignedBigInteger) + resource_type (string)

            $table->foreignId('media_id')->constrained('media')->cascadeOnDelete();
            $table->string('caption')->nullable();
            $table->longText('description')->nullable();

            $table->integer('sort_order')->default(0); // optional: order of media
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resource_media');
    }
};
