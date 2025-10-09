import { Link, usePage } from '@inertiajs/react';

function FooterTemplate() {
    const appName = import.meta.env.VITE_APP_NAME || 'DCCCEC';
    const currentYear = new Date().getFullYear();
    const { settings, auth } = usePage().props as any;

    return (
        <footer className="relative bg-card/80 text-card-foreground backdrop-blur-md dark:bg-card/80">
            {/* Wave background */}
            <div className="absolute inset-0 -z-10">
                <img src="/images/footerwave.svg" alt="Footer Wave" className="h-full w-full object-cover opacity-40 dark:opacity-20" />
            </div>

            <div className="container-custom mx-auto flex flex-col items-center justify-center px-4 py-16">
                {/* Logo & App Name */}
                <div className="mb-3 flex flex-col items-center">
                    <div className="rounded-full bg-white p-3">
                        <img
                            src={settings.site_logo || '/logo.png'}
                            alt="DC Child Care and Education Centre Logo"
                            className="h-16 w-16 object-contain"
                        />
                    </div>
                    <div className="flex items-center">
                        <h1 className="font-meow-script text-4xl text-primary dark:text-secondary">DC</h1>
                        <p className="font-chewy text-accent">childCare</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center space-y-1 text-center">
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

                {/* Social Links (optional) */}
                <div className="mt-4 flex gap-4">
                    <a href="#" className="transition-colors hover:text-accent-foreground">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" className="transition-colors hover:text-accent-foreground">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="#" className="transition-colors hover:text-accent-foreground">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" className="transition-colors hover:text-accent-foreground">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                </div>

                {/* Footer Note */}
                <p className="mt-4 text-center text-sm text-muted-foreground">
                    &copy; {currentYear} {settings.site_name || appName}. All rights reserved. <br />
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
        </footer>
    );
}

export default FooterTemplate;
