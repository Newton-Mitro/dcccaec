<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('careers', function (Blueprint $table) {
            $table->id();

            // Basic Info
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('description')->nullable();
            $table->longText('requirements')->nullable();
            $table->longText('responsibilities')->nullable();
            $table->string('location')->nullable();
            $table->boolean('is_remote')->default(false);

            // Salary & Benefits
            $table->string('salary_range')->nullable();
            $table->decimal('min_salary', 12, 2)->nullable();
            $table->decimal('max_salary', 12, 2)->nullable();
            $table->string('currency', 10)->default('USD');
            $table->json('benefits')->nullable();

            // Job Details
            $table->enum('employment_type', [
                'full-time',
                'part-time',
                'contract',
                'internship',
                'temporary'
            ])->default('full-time');
            $table->enum('experience_level', [
                'entry',
                'junior',
                'mid',
                'senior',
                'lead'
            ])->default('entry');
            $table->string('department')->nullable();
            $table->string('job_function')->nullable();
            $table->string('education_level')->nullable();

            // Application & Workflow
            $table->date('deadline')->nullable();
            $table->enum('status', ['open', 'closed', 'draft'])->default('open');
            $table->integer('positions')->default(1);
            $table->integer('applications_count')->default(0);

            // Meta
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('careers');
    }
};
