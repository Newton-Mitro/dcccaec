import { Head, Link } from '@inertiajs/react';
// Core imports
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

// Module imports (Swiper v9+)
import { Autoplay, Pagination } from 'swiper/modules';

import PageLayout from '../../layouts/page-layout';
import { Award } from '../../types/award';
import { Event } from '../../types/event';
import { HeroSlide } from '../../types/hero_slide';
import { Notice } from '../../types/notice';
import { Page } from '../../types/page';
import { Program } from '../../types/program';
import { Team } from '../../types/team';
import { Testimonial } from '../../types/testimonial';
import HeroSection from './components/HeroSection';
import SectionHeader from './components/section-header';

interface HomePageProps {
    heroSlides: HeroSlide[];
    about: Page;
    programs: Program[];
    teams: Team[];
    testimonials: Testimonial[];
    awards: Award[];
    notices: Notice[];
    events: Event[];
}

const HomePage: React.FC<HomePageProps> = ({ heroSlides, about, programs, teams, testimonials, awards }) => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
    const imageUrl = ''; // Replace with default OG image if needed
    const metaTitle = 'Home Page';
    const metaDescription = 'YourSite';
    const metaKeywords = 'YourSite';

    console.log(about);

    return (
        <>
            <Head title={'Home'}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords}, articles, blog`} />
                <meta name="author" content="YourSite" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Home" />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Home" />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={imageUrl} />

                <link rel="canonical" href={pageUrl} />
            </Head>

            <PageLayout>
                {/* Hero Section */}
                <HeroSection slides={heroSlides} />

                {/* About Section */}
                <section className="relative overflow-hidden bg-muted/30 py-20">
                    <div className="container-custom mx-auto flex flex-col items-center gap-12 px-6 md:flex-row md:gap-16">
                        {/* Left Image (or illustration) */}
                        <div className="relative w-full">
                            <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                            <img src={about?.media?.url || ''} alt="About Us" className="relative z-10 w-full rounded object-cover shadow" />
                        </div>

                        {/* Right Content */}
                        <div className="w-full">
                            <div className="mb-2 flex flex-col">
                                {about.title && <h2 className="mb-1 font-chewy text-3xl text-accent">{about.title || ''}</h2>}

                                {about.title && <div className="mx-auto h-1 w-16 bg-secondary md:mx-0"></div>}
                            </div>
                            <div className="mb-6 leading-relaxed text-muted-foreground">{about.meta_description || ''}</div>

                            {/* Button */}
                            <div className="mt-10">
                                <Link href="/about-us/our-story">
                                    <button className="rounded bg-primary px-6 py-2 font-semibold text-white hover:bg-yellow-500">Contact Us</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Blobs */}
                    <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
                </section>

                <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-16">
                    {/* Services Section */}
                    {programs.length > 0 && (
                        <div className="space-y-10">
                            <SectionHeader
                                heading="Our Programs"
                                sub_heading="At Dhaka Credit Child Care & Education Center, we offer a range of child care programs designed to nurture growth, curiosity, and social development. Our early learning curriculum emphasizes play-based education, emotional intelligence, and safety."
                            />

                            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {programs.map((program, index) => (
                                    <Link key={program.id} href={`/programs/${program.id}`}>
                                        <div
                                            key={program.id}
                                            className={`group relative border-2 border-card/50 bg-card p-6 shadow transition-transform duration-300 hover:-translate-y-2 ${
                                                index % 2 === 0 ? 'rounded-tl-4xl rounded-br-4xl' : 'rounded-tr-4xl rounded-bl-4xl'
                                            }`}
                                        >
                                            {/* Overlay */}
                                            <div
                                                className={`absolute inset-0 -translate-x-1/4 bg-primary/50 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100 ${
                                                    index % 2 === 0 ? 'rounded-tl-4xl rounded-br-4xl' : 'rounded-tr-4xl rounded-bl-4xl'
                                                }`}
                                            ></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                {program.media?.url && (
                                                    <img
                                                        src={program.media.url}
                                                        alt={program.name}
                                                        className="mx-auto h-16 w-16 rounded-full border-2 border-primary object-cover p-1"
                                                    />
                                                )}

                                                <h3 className="mt-4 text-center text-xl font-semibold">{program.name}</h3>
                                                <h6 className="mt-2 text-center text-secondary">{program.category?.name}</h6>
                                                <p className="mt-2 text-center text-muted-foreground">{program.excerpt}</p>

                                                {/* Shaped Button */}
                                                <button
                                                    className="mt-4 bg-accent px-6 py-1 text-sm font-semibold text-white shadow transition-all duration-300 hover:scale-105"
                                                    style={{
                                                        clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',
                                                    }}
                                                >
                                                    Show Details
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <Link href="/programs">
                                    <button className="rounded bg-primary px-6 py-2 font-semibold text-white hover:bg-yellow-500">
                                        All Programs
                                    </button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Team Section */}
                    {teams.length > 0 && (
                        <section className="space-y-12 py-16">
                            <SectionHeader
                                heading="Meet Our Team"
                                sub_heading="We’re a diverse group of professionals committed to innovation and excellence."
                            />

                            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {teams.slice(0, 3).map((member, index) => (
                                    <div
                                        key={member.id}
                                        className={`group relative border-2 border-card/50 bg-card p-6 text-center shadow transition-transform duration-300 hover:-translate-y-2 ${
                                            index % 2 === 0 ? 'rounded-tl-4xl rounded-br-4xl' : 'rounded-tr-4xl rounded-bl-4xl'
                                        }`}
                                    >
                                        {/* Overlay */}
                                        <div
                                            className={`absolute inset-0 -translate-x-1/4 bg-secondary/50 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100 ${
                                                index % 2 === 0 ? 'rounded-tl-4xl rounded-br-4xl' : 'rounded-tr-4xl rounded-bl-4xl'
                                            }`}
                                        ></div>

                                        {/* Image Container */}
                                        <Link key={member.id} href={`/about-us/teams/${member.id}`}>
                                            <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-primary shadow-md transition-transform duration-500 group-hover:scale-105">
                                                <img
                                                    src={member.media?.url || '/images/default-avatar.png'}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="relative z-10 mt-6 space-y-2">
                                                <h3 className="text-xl font-semibold text-foreground transition-colors group-hover:text-primary">
                                                    {member.name}
                                                </h3>
                                                {member.designation && (
                                                    <p className="text-sm font-medium text-muted-foreground">
                                                        {member.designation}
                                                        {member.department ? `, ${member.department}` : ''}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Social Links */}
                                        <div className="relative z-10 mt-6 flex justify-center gap-3">
                                            {member.facebook_links && (
                                                <a
                                                    href={member.facebook_links}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-10 w-10 rounded-full bg-secondary/10 p-2 text-secondary transition hover:bg-primary hover:text-white"
                                                >
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                            )}
                                            {member.linkedin_links && (
                                                <a
                                                    href={member.linkedin_links}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-10 w-10 rounded-full bg-secondary/10 p-2 text-secondary transition hover:bg-primary hover:text-white"
                                                >
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            )}
                                            {member.twitter_links && (
                                                <a
                                                    href={member.twitter_links}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-10 w-10 rounded-full bg-secondary/10 p-2 text-secondary transition hover:bg-primary hover:text-white"
                                                >
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                            )}
                                            {member.instagram_links && (
                                                <a
                                                    href={member.instagram_links}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="h-10 w-10 rounded-full bg-secondary/10 p-2 text-secondary transition hover:bg-primary hover:text-white"
                                                >
                                                    <i className="fab fa-instagram"></i>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 text-center">
                                <Link href="/about-us/teams">
                                    <button className="rounded bg-primary px-6 py-2 font-semibold text-white hover:bg-yellow-500">All Members</button>
                                </Link>
                            </div>
                        </section>
                    )}

                    {/* Testimonials Section */}
                    {testimonials.length > 0 && (
                        <div className="space-y-10 pb-16">
                            <SectionHeader
                                heading="Testimonials"
                                sub_heading="See why families choose us for safe, nurturing, and quality child care."
                            />

                            <Swiper
                                modules={[Pagination, Autoplay]}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                loop
                                pagination={{ clickable: true }}
                                spaceBetween={30}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 2 },
                                    1280: { slidesPerView: 2 },
                                }}
                                className="py-8"
                            >
                                {testimonials.map((testimonial) => (
                                    <SwiperSlide key={testimonial.id}>
                                        <div
                                            className={`group relative mx-auto max-w-xl rounded-3xl bg-card p-10 shadow transition-transform duration-300 hover:shadow-lg`}
                                        >
                                            {/* Overlay for subtle accent */}
                                            <div
                                                className={`absolute inset-0 -translate-x-1/4 rounded-3xl bg-accent/20 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100`}
                                            ></div>

                                            <div className="relative z-10 flex flex-col items-center">
                                                <p className="mb-6 text-muted-foreground italic">"{testimonial.message}"</p>
                                                {testimonial.media?.url && (
                                                    <img
                                                        src={testimonial.media.url}
                                                        alt={testimonial.author_name}
                                                        className="mb-2 h-20 w-20 rounded-full border-2 border-primary object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                )}
                                                <p className="text-lg font-semibold">{testimonial.author_name}</p>
                                                {testimonial.author_designation && (
                                                    <p className="text-sm text-gray-500">
                                                        {testimonial.author_designation}
                                                        {testimonial.company ? `, ${testimonial.company}` : ''}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}

                    {/* Awards Section */}
                    {awards.length > 0 && (
                        <div className="space-y-10">
                            <SectionHeader heading="Awards & Recognition" sub_heading="We have won various awards and recognition" />
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                {awards.slice(0, 4).map((award) => (
                                    <div key={award.id} className="rounded p-6 text-center transition">
                                        <img
                                            src={award.media?.url || '/images/default-award.png'}
                                            alt={award.title}
                                            className="mx-auto h-24 w-24 object-contain"
                                        />
                                        <h3 className="text-lg font-semibold">{award.title}</h3>
                                        <p className="mt-1 text-gray-500">{award.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PageLayout>
        </>
    );
};

export default HomePage;
