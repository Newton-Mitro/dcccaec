<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('category_id')->nullable()->constrained('categories')->cascadeOnDelete();
            $table->longText('description')->nullable();
            $table->text('excerpt')->nullable();
            $table->text('objectives')->nullable();
            $table->integer('age_min')->nullable();
            $table->integer('age_max')->nullable();
            $table->string('admission_form_fee')->nullable(); // 500
            $table->string('admission_fee')->nullable(); // 8000
            $table->string('yearly_charge')->nullable(); // 3000
            $table->string('uniform_fee')->nullable(); // 1400
            $table->string('books_stationary_fee')->nullable(); // text because "According to class"
            $table->string('khata_fee')->nullable(); // 50
            $table->json('monthly_fee')->nullable();
            $table->foreignId('media_id')->nullable()->constrained('media')->nullOnDelete();
            $table->boolean('is_active')->default(true);
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
