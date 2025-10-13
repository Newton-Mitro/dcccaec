import { usePage } from '@inertiajs/react';
import { ArrowUp } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import FooterTemplate from '../pages/site/FooterTemplate';
import Navigation from '../pages/site/Navigation';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children, ...props }: PageLayoutProps) {
    const [showButton, setShowButton] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { settings } = usePage().props as any;

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem('popup_shown');

        if (!alreadyShown) {
            const timer = setTimeout(() => {
                setShowModal(true);
                sessionStorage.setItem('popup_shown', 'true');
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="relative flex min-h-screen flex-col bg-background" {...props}>
            <Navigation />

            <main className="flex-grow">{children}</main>

            {/* Fixed Social Icons */}
            <div className="fixed top-1/2 right-4 z-40 -translate-y-1/2 space-y-4">
                {[
                    { href: settings.facebook || '#', icon: <FaFacebookF />, label: 'Facebook', color: 'text-blue-500' },
                    { href: settings.twitter || '#', icon: <FaTwitter />, label: 'Twitter', color: 'text-sky-400' },
                    { href: settings.instagram || '#', icon: <FaInstagram />, label: 'WhatsApp', color: 'text-green-500' },
                    { href: settings.youtube || '#', icon: <FaYoutube />, label: 'YouTube', color: 'text-red-500' },
                ].map((item, idx) => (
                    <a
                        key={idx}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-end space-x-2"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all duration-300 hover:translate-x-[-8px] hover:bg-primary hover:text-foreground">
                            {item.icon}
                        </span>
                    </a>
                ))}
            </div>

            {/* Scroll to Top Button */}
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed right-8 bottom-8 z-50 rounded-full bg-primary p-3 text-white shadow-lg transition hover:bg-primary/80"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </button>
            )}

            {/* Floating SVG element */}
            <div className="fixed -right-20 -bottom-4 z-20 hidden animate-[wiggle_3s_ease-in-out_infinite] md:-right-20 lg:-right-20 lg:block">
                <img src="/images/panda.png" alt="Decorative element" className="w-52 opacity-80 md:w-60 lg:w-72" />
            </div>

            {/* Animated shapes */}
            <div className="fixed bottom-5 left-0 z-10 hidden animate-[bounce_3s_ease-in-out_infinite] lg:block">
                <img src="/images/turtle.png" alt="Decorative element" className="w-30 animate-[spin_10s_ease-in-out_infinite] md:w-36 lg:w-44" />
            </div>

            {/* <div className="fixed left-0 z-20 w-full bottom-5">
                <img src="/images/dog_running.gif" alt="Decorative element" className="w-48 animate-bounce" />
            </div> */}

            <FooterTemplate />

            {/* Simple Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="relative w-[90%] max-w-xl rounded-3xl bg-card/50 p-8">
                        {/* Decorative GIF */}

                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-500 transition-colors hover:text-accent"
                        >
                            <i className="fa-solid fa-xmark text-2xl"></i>
                        </button>

                        {/* Content */}
                        <div className="my-12 flex flex-col items-center space-y-4 text-center">
                            <img src="/images/bird.gif" alt="bird" className="w-40" />
                            <h2 className="text-3xl font-bold text-foreground">Admissions Going On!</h2>
                            <p className="text-sm text-muted-foreground">
                                Don’t miss the chance to join our upcoming session. Apply now to secure your spot.
                            </p>
                            <a
                                href="/parents/enrollment"
                                className="hover:bg-accent-dark inline-block rounded-full bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105"
                            >
                                View Details
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
