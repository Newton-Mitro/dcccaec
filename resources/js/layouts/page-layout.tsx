import { Link, usePage } from '@inertiajs/react';
import { ArrowUp } from 'lucide-react';
import { type ReactNode, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import FooterTemplate from '../pages/site/FooterTemplate';
import Navigation from '../pages/site/Navigation';

interface PageLayoutProps {
    children: ReactNode;
}

export default function PageLayout({ children, ...props }: PageLayoutProps) {
    const [showButton, setShowButton] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { settings, ads } = usePage().props as any;

    // --- 🧭 Scroll button visibility ---
    useEffect(() => {
        const handleScroll = () => setShowButton(window.scrollY > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- 🎯 Auto popup timer for ads ---
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

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // --- ⚠️ Maintenance Mode Check ---
    if (settings?.maintenance_mode == 1) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center text-foreground">
                <i className="fa-solid fa-toolbox mb-6 text-8xl"></i>
                <h1 className="mb-4 text-4xl font-bold">We’re Under Maintenance</h1>
                <p className="max-w-md text-lg text-muted-foreground">
                    Our site is currently undergoing scheduled maintenance. Please check back soon.
                </p>
                <p className="mt-6 text-sm text-muted-foreground">— The {settings.site_name || 'Team'} Team</p>
            </div>
        );
    }

    // --- 💫 Default Page Layout ---
    return (
        <div className="relative flex min-h-screen flex-col bg-background" {...props}>
            <Navigation />
            <main className="flex-grow">{children}</main>

            {/* Fixed Social Icons */}
            <div className="fixed top-1/2 right-4 z-40 -translate-y-1/2 space-y-4">
                {[
                    { href: settings.facebook || '#', icon: <FaFacebookF />, label: 'Facebook', color: 'text-blue-500' },
                    { href: settings.twitter || '#', icon: <FaTwitter />, label: 'Twitter', color: 'text-sky-400' },
                    { href: settings.instagram || '#', icon: <FaInstagram />, label: 'Instagram', color: 'text-pink-500' },
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

            {/* Floating Images */}
            <div className="fixed -right-20 -bottom-4 z-20 hidden animate-[wiggle_3s_ease-in-out_infinite] lg:block">
                <img src="/images/panda.png" alt="Decorative element" className="w-60 opacity-80" />
            </div>
            <div className="fixed bottom-5 left-0 z-10 hidden animate-[bounce_3s_ease-in-out_infinite] lg:block">
                <img src="/images/turtle.png" alt="Decorative element" className="w-36 animate-[spin_10s_ease-in-out_infinite]" />
            </div>

            <FooterTemplate />

            {/* Popup Ad */}
            {showModal && ads?.featured_image && (
                <div className="animate-fadeIn fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="relative w-[90%] max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-background/80 to-card/70 shadow-2xl backdrop-blur-sm">
                        {ads?.featured_image?.url && (
                            <div className="relative overflow-hidden rounded-2xl">
                                <img
                                    src={ads.featured_image.url}
                                    alt={ads.title || 'Ad Image'}
                                    className="w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-6 text-center">
                                    {ads?.subtitle && <h2 className="text-3xl font-bold text-white drop-shadow-md">{ads.subtitle}</h2>}
                                    {ads?.excerpt && <p className="mt-2 max-w-md text-sm text-gray-200">{ads.excerpt}</p>}
                                    {ads?.button_link && ads?.button_text && (
                                        <div className="mt-4 text-center">
                                            <Link
                                                href={ads.button_link}
                                                className="inline-block rounded-full bg-accent px-8 py-3 font-semibold text-white shadow-md transition-all hover:scale-105 hover:bg-accent/90 active:scale-95"
                                            >
                                                {ads.button_text}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 transition-all hover:rotate-90 hover:text-accent"
                        >
                            <i className="fa-solid fa-xmark text-2xl"></i>
                        </button>
                    </div>
                </div>
            )}

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toasterId="default"
                toastOptions={{
                    duration: 5000,
                    style: { background: '#363636', color: '#fff' },
                    success: { duration: 3000, iconTheme: { primary: 'green', secondary: 'black' } },
                }}
            />
        </div>
    );
}
