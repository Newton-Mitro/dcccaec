<?php

use App\Http\Controllers\CareerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\LeaderController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\WebPageController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HeroSliderController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\RouteVisitLogController;
use App\Http\Controllers\ContactMessageController;


Route::get('/', [WebPageController::class, 'home'])->name('site.home');
Route::get('/parents/{slug}', [WebPageController::class, 'page'])->name('site.single-page');
Route::get('/about-us', [WebPageController::class, 'about'])->name('site.about');
Route::get('/contact-us', [WebPageController::class, 'contact'])->name('site.contact');
Route::post('/contact', [WebPageController::class, 'sendMessage'])->name('site.send-message');
Route::get('/about-us/teams', [WebPageController::class, 'teams'])->name('site.teams');
Route::get('/about-us/principal-message', [WebPageController::class, 'principalMessage'])->name('site.principal-message');
Route::get('/about-us/president-message', [WebPageController::class, 'presidentMessage'])->name('site.president-message');
Route::get('/about-us/teams/{team}', [WebPageController::class, 'showTeam'])->name('site.teams.show');
Route::get('/about-us/our-story', [WebPageController::class, 'ourStory'])->name('site.our-story');
Route::get('/about-us/mission-vision', [WebPageController::class, 'missionVision'])->name('site.mission-vision');
Route::get('/about-us/our-philosophy', [WebPageController::class, 'ourPhilosophy'])->name('site.our-philosophy');
Route::get('/faq', [WebPageController::class, 'faq'])->name('site.faq');
Route::get('/disclaimer', [WebPageController::class, 'disclaimer'])->name('site.disclaimer');
Route::get('/privacy-policy', [WebPageController::class, 'privacyPolicy'])->name('site.privacy-policy');
Route::get('/terms-of-service', [WebPageController::class, 'termsOfService'])->name('site.terms-of-service');
Route::get('/awards', [WebPageController::class, 'awards'])->name('site.awards');
Route::get('/galleries', [WebPageController::class, 'galleries'])->name('site.galleries');

Route::get('/programs', [WebPageController::class, 'programs'])->name('site.programs');
Route::get('/programs/{program}', [WebPageController::class, 'showProgram'])->name('site.programs.show');

Route::get('/calendar/events', [WebPageController::class, 'events'])->name('site.events');
Route::get('/calendar/events/{event}', [WebPageController::class, 'showEvent'])->name('site.events.show');
Route::get('/calendar/holidays', [WebPageController::class, 'holidays'])->name('site.holidays');

Route::get('/notices', [WebPageController::class, 'notices'])->name('site.notices');
Route::get('/notices/{notice}', [WebPageController::class, 'showNotice'])->name('site.notices.show');

Route::get('/careers', [WebPageController::class, 'careers'])->name('site.careers');
Route::get('/careers/{career}', [WebPageController::class, 'showJobCircular'])->name('site.careers.show');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::prefix('admin')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::resource('awards', AwardController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('contact-messages', ContactMessageController::class);
        Route::resource('events', EventController::class);
        Route::resource('galleries', GalleryController::class);
        Route::resource('hero-sliders', HeroSliderController::class);
        Route::resource('media', MediaController::class);
        Route::resource('notices', NoticeController::class);
        Route::resource('pages', PageController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('route-visit-logs', RouteVisitLogController::class);
        Route::resource('programs', ProgramController::class);
        Route::resource('settings', SettingController::class);
        Route::resource('teams', TeamController::class);
        Route::resource('leaders', LeaderController::class);
        Route::resource('partners', PartnerController::class);
        Route::resource('testimonials', TestimonialController::class);
        Route::resource('visitors', VisitorController::class);
        Route::resource('careers', CareerController::class);
        Route::resource('job-applications', JobApplicationController::class);
        // Users
        // Route::resource('users', UserController::class);
    });
