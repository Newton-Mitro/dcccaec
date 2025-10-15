import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { HeroSlide } from '../../../types/hero_slide';

interface HeroSectionProps {
    slides: HeroSlide[];
    interval?: number; // optional: seconds between transitions
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides, interval = 5 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, interval * 1000);
        return () => clearInterval(timer);
    }, [slides, interval]);

    const currentSlide = slides[currentIndex];

    return (
        <section className="relative w-full overflow-hidden">
            {/* Background */}
            <div
                className="relative flex min-h-screen items-center justify-between transition-all duration-1000"
                style={{
                    backgroundImage: `url(${currentSlide?.featured_image?.url || '/images/hero_5.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 transition-opacity duration-700"></div>

                {/* Content */}
                <div className="mx-auto mt-16 flex w-6xl flex-col items-center md:flex-row">
                    <div className="md:container-custom z-10 w-full px-6 py-10 text-left md:px-28">
                        <h1 className="text-4xl text-gray-200 md:text-5xl">
                            <span className="font-chewy text-2xl md:text-7xl">{currentSlide?.title}</span>
                        </h1>
                        <p className="mt-6 text-sm leading-relaxed text-gray-400 md:text-lg">{currentSlide?.subtitle}</p>
                        {currentSlide?.button_text && (
                            <div className="mt-16">
                                <Link href={currentSlide.button_link || '#'}>
                                    <button className="flex items-center gap-3 rounded-xl bg-accent px-6 py-2 font-semibold text-accent-foreground uppercase transition-all hover:bg-secondary hover:shadow">
                                        {currentSlide.button_text}
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                    <img src="/images/bear.gif" alt="Hero Image" className="z-20 h-44 w-44 md:h-96 md:w-96" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
