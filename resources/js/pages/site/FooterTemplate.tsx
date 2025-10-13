import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function FooterTemplate() {
    const appName = import.meta.env.VITE_APP_NAME || 'DCCCEC';
    const currentYear = new Date().getFullYear();
    const { settings, auth } = usePage().props as any;

    const usefulLinks = [
        { name: 'Disclaimer', route: route('site.disclaimer') },
        { name: 'Privacy Policy', route: route('site.privacy-policy') },
        { name: 'Careers', route: route('site.careers') },
    ];

    const [showLinks, setShowLinks] = useState(false);

    return (
        <footer className="relative bg-card/80 text-card-foreground backdrop-blur-md dark:bg-card/80">
            {/* Wave background */}
            <div className="absolute inset-0 -z-10">
                <img src="/images/footerwave.svg" alt="Footer Wave" className="h-full w-full object-cover opacity-40 dark:opacity-20" />
            </div>

            <div className="container-custom mx-auto px-4 py-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-10">
                    {/* Logo & App Name */}
                    <div className="flex flex-col items-center space-y-4 text-center md:items-start md:text-left">
                        <div className="rounded-full bg-white p-3">
                            <img src={settings.site_logo || '/logo.png'} alt="DC Child Care Logo" className="h-16 w-16 object-contain" />
                        </div>
                        <div className="flex items-center justify-center gap-2 md:justify-start">
                            <h1 className="font-meow-script text-4xl text-primary dark:text-secondary">DC</h1>
                            <p className="font-chewy text-accent">childCare</p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            &copy; {currentYear} {settings.site_name || appName}. All rights reserved.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center space-y-3 text-center md:items-start md:text-left">
                        <h2 className="mb-2 text-lg font-semibold text-foreground">Contact Info</h2>
                        <p className="flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-accent"></i>
                            {settings.contact_address || 'Dhaka, Bangladesh'}
                        </p>
                        <p className="flex items-center gap-2">
                            <i className="fa-solid fa-phone text-accent"></i>
                            <a
                                href={`tel:${settings.contact_phone || '+8809678771270'}`}
                                className="font-semibold underline transition-colors hover:text-accent-foreground"
                            >
                                {settings.contact_phone || '+8809678771270'}
                            </a>
                        </p>
                        <p className="flex items-center gap-2">
                            <i className="fa-solid fa-envelope text-accent"></i>
                            <a
                                href={`mailto:${settings.contact_email || 'support@dc.edu.bd'}`}
                                className="font-semibold underline transition-colors hover:text-accent-foreground"
                            >
                                {settings.contact_email || 'support@dc.edu.bd'}
                            </a>
                        </p>
                    </div>

                    {/* Useful Links - collapsible on small screens */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left">
                        <button className="mb-2 text-lg font-semibold text-foreground md:hidden" onClick={() => setShowLinks(!showLinks)}>
                            Useful Links {showLinks ? '▲' : '▼'}
                        </button>

                        <h2 className="mb-2 hidden text-lg font-semibold text-foreground md:block">Useful Links</h2>

                        <ul className={`flex flex-col gap-2 md:flex-col md:gap-2 ${showLinks ? 'block' : 'hidden'} md:block`}>
                            {usefulLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.route} className="transition-colors hover:text-accent-foreground">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links + Dashboard/Login */}
                    <div className="flex flex-col items-center space-y-4 text-center md:items-start md:text-left">
                        <h2 className="mb-2 text-lg font-semibold text-foreground">Follow Us</h2>
                        <div className="flex gap-4 text-xl">
                            <a href={settings.facebook || '#'} target="_blank" className="transition-colors hover:text-accent-foreground">
                                <i className="fa-brands fa-facebook-f"></i>
                            </a>
                            <a href={settings.twitter || '#'} target="_blank" className="transition-colors hover:text-accent-foreground">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href={settings.instagram || '#'} target="_blank" className="transition-colors hover:text-accent-foreground">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href={settings.youtube || '#'} target="_blank" className="transition-colors hover:text-accent-foreground">
                                <i className="fa-brands fa-youtube"></i>
                            </a>
                        </div>

                        <p className="mt-2 text-sm">
                            Webadmin{' '}
                            {auth.user ? (
                                <span className="font-bold text-accent">
                                    <Link href={route('dashboard')}>Panel</Link>
                                </span>
                            ) : (
                                <span className="font-bold text-secondary">
                                    <a href="/login">Login</a>
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterTemplate;
