<?php

namespace App\Http\Controllers;

use App\Infrastructure\Models\Award;
use App\Infrastructure\Models\Career;
use App\Infrastructure\Models\ContactMessage;
use App\Infrastructure\Models\Event;
use App\Infrastructure\Models\Gallery;
use App\Infrastructure\Models\HeroSlider;
use App\Infrastructure\Models\Holiday;
use App\Infrastructure\Models\Notice;
use App\Infrastructure\Models\Page;
use App\Infrastructure\Models\Partner;
use App\Infrastructure\Models\Program;
use App\Infrastructure\Models\Team;
use App\Infrastructure\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebPageController extends Controller
{
    public function home()
    {
        $heroSlides = HeroSlider::where('status', 'Active')->with('featuredImage')
            ->orderBy('sort_order')
            ->get();
        $teams = Team::where('status', 'Active')->with('photo')->orderBy('sort_order')->take(5)->get();
        $programs = Program::where('is_active', true)->with(['featuredImage', 'gallery', 'category'])->orderBy('sort_order')->take(3)->get();
        $testimonials = Testimonial::where('status', 'Active')->with('clientImage')->orderBy('sort_order')->take(5)->get();
        $awards = Award::where('status', 'Active')->with('featuredImage')->orderBy('sort_order')->take(5)->get();
        $partners = Partner::with('logo')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();
        $notices = Notice::where('status', 'Active')->orderBy('sort_order')->take(5)->get();
        $events = Event::where('status', 'Active')->orderBy('sort_order')->take(5)->get();
        $about = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'our-story')
            ->first();

        return Inertia::render('site/home-page', [
            'about' => $about,
            'heroSlides' => $heroSlides,
            'teams' => $teams,
            'programs' => $programs,
            'testimonials' => $testimonials,
            'awards' => $awards,
            'notices' => $notices,
            'events' => $events,
            'partners' => $partners
        ]);
    }

    public function enrollmentPage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'enrollment')
            ->first();

        return Inertia::render('site/enrollment-page', [
            'page' => $page
        ]);
    }

    public function curriculumPage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'curriculum')
            ->first();

        return Inertia::render('site/curriculum-page', [
            'page' => $page
        ]);
    }

    public function classRoutinesPage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'class-rutines')
            ->first();

        return Inertia::render('site/class-routines-page', [
            'page' => $page
        ]);
    }

    public function healthAndSefetyPage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'health-safety')
            ->first();

        return Inertia::render('site/health-safety-page', [
            'page' => $page
        ]);
    }

    public function nutritionAndMealsPage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'nutrition-meals')
            ->first();

        return Inertia::render('site/nutrition-meals-page', [
            'page' => $page
        ]);
    }

    public function presidentMessage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'president-message')
            ->first();

        return Inertia::render('site/president-message-page', [
            'page' => $page
        ]);
    }

    public function principalMessage()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'principal-message')
            ->first();

        return Inertia::render('site/principal-message-page', [
            'page' => $page
        ]);
    }

    public function ourStory()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'our-story')
            ->first();

        return Inertia::render('site/our-story-page', [
            'page' => $page
        ]);
    }

    public function missionVision()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'mission-vision')
            ->first();

        return Inertia::render('site/mission-vision-page', [
            'page' => $page
        ]);
    }

    public function ourPhilosophy()
    {
        $page = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'our-philosophy')
            ->first();

        return Inertia::render('site/our-philosophy-page', [
            'page' => $page
        ]);
    }

    public function faq()
    {
        $page = Page::with(['featuredImage'])
            ->where('slug', 'faq')
            ->first();

        return Inertia::render('site/faq-page', [
            'page' => $page
        ]);
    }

    public function termsOfService()
    {
        $aboutPage = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'terms-of-service')
            ->first();

        return Inertia::render('site/terms-of-service-page', [
            'page' => $aboutPage
        ]);
    }

    public function privacyPolicy()
    {
        $aboutPage = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'privacy-policy')
            ->first();

        return Inertia::render('site/privacy-policy-page', [
            'page' => $aboutPage
        ]);
    }

    public function disclaimer()
    {
        $aboutPage = Page::with(['gallery.media', 'featuredImage'])
            ->where('slug', 'disclaimer')
            ->first();

        return Inertia::render('site/disclaimer-page', [
            'page' => $aboutPage
        ]);
    }

    public function contact()
    {
        return Inertia::render('site/contact-page');
    }


    public function sendMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        ContactMessage::create($validated);

        return Inertia::location(route('site.contact'));
    }


    public function teams(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $teams = Team::with('photo', 'category')
            ->latest()
            ->get();
        return Inertia::render('site/our-teams-page', [
            'teams' => $teams,
        ]);
    }

    public function showTeam(Team $team, Request $request)
    {
        // Load relationships on the existing $team instance
        $team->load('photo', 'category');

        return Inertia::render('site/single-team-page', [
            'team' => $team,
        ]);
    }


    public function programs(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $programs = Program::with('featuredImage', 'gallery', 'category')
            ->latest()
            ->get();
        return Inertia::render('site/programs-page', [
            'programs' => $programs,
        ]);
    }

    public function showProgram(Program $program, Request $request)
    {
        // Load relationships on the existing $team instance
        $program->load('featuredImage', 'gallery', 'category');

        return Inertia::render('site/single-program-page', [
            'program' => $program,
        ]);
    }

    public function awards(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $awards = Award::with('media', 'category')
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
        return Inertia::render('site/awards-page', [
            'awards' => $awards,
        ]);
    }

    public function careers(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $jobCirculars = Career::latest()
            ->get();
        return Inertia::render('site/careers-page', [
            'jobCirculars' => $jobCirculars,
        ]);
    }

    public function showJobCircular(Career $career, Request $request)
    {
        return Inertia::render('site/single-job-circular-page', [
            'job' => $career,
        ]);
    }

    public function notices(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $notices = Notice::with('attachment', 'category')
            ->latest()
            ->get();
        return Inertia::render('site/notices-page', [
            'notices' => $notices,
        ]);
    }

    public function showNotice(Notice $notice, Request $request)
    {
        // Load relationships on the existing $team instance
        $notice->load('attachment', 'category');

        return Inertia::render('site/single-notice-page', [
            'notice' => $notice,
        ]);
    }

    public function events(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $events = Event::with('featuredImage', 'gallery')
            ->latest()
            ->get();
        return Inertia::render('site/events-page', [
            'events' => $events,
        ]);
    }

    public function holidays(Request $request)
    {
        $holidays = Holiday::orderBy('date', 'asc')->get();

        return Inertia::render('site/holiday-calendar-page', [
            'holidays' => $holidays,
        ]);
    }


    public function showEvent(Event $event, Request $request)
    {
        // Load relationships on the existing $team instance
        $event->load('media');

        return Inertia::render('site/single-event-page', [
            'event' => $event,
        ]);
    }

    public function galleries(Request $request)
    {
        $perPage = $request->input('perPage', 8);
        $galleries = Gallery::with('featuredImage', 'items.media')
            ->latest()
            ->get();
        return Inertia::render('site/galleries-page', [
            'galleries' => $galleries,
        ]);
    }
}
