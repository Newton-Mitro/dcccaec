<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run()
    {
        $settings = [
            // Basic site info
            ['key' => 'site_name', 'value' => 'My Awesome CMS'],
            ['key' => 'site_email', 'value' => 'info@example.com'],
            ['key' => 'site_logo', 'value' => '/logo.png'],
            ['key' => 'site_favicon', 'value' => '/favicon.ico'],
            ['key' => 'default_language', 'value' => 'en'],
            ['key' => 'timezone', 'value' => 'UTC'],
            ['key' => 'maintenance_mode', 'value' => '0'],

            // SEO
            ['key' => 'meta_title', 'value' => 'Welcome to My CMS'],
            ['key' => 'meta_description', 'value' => 'A powerful CMS built with Laravel'],

            // Social links (JSON)
            ['key' => 'facebook', 'value' => 'https://facebook.com/yourpage'],
            ['key' => 'twitter', 'value' => 'https://twitter.com/yourpage'],
            ['key' => 'instagram', 'value' => 'https://instagram.com/yourpage'],
            ['key' => 'linkedin', 'value' => 'https://linkedin.com/yourpage'],
            ['key' => 'youtube', 'value' => 'https://youtube.com/yourpage'],
            ['key' => 'github', 'value' => 'https://github.com/yourpage'],
            ['key' => 'discord', 'value' => 'https://discord.com/yourpage'],

            // Contact info
            ['key' => 'contact_address', 'value' => '123 Main Street, City, Country'],
            ['key' => 'contact_phone', 'value' => '+1234567890'],
            ['key' => 'contact_email', 'value' => 'contact@example.com'],
            ['key' => 'contact_map_embed', 'value' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.22347837170022!2d90.3840298160845!3d23.76250709881533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b94ee1d58cdf%3A0x53b141a25881e350!2sDC%20Child%20Care%20and%20Education%20Centre%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1759313952331!5m2!1sen!2sbd" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->updateOrInsert(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
