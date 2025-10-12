import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { SharedData } from '../../types';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    const toggleDropdown = (menu: string) => {
        setActiveDropdown((prev) => (prev === menu ? null : menu));
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        {
            title: 'Home',
            href: '/',
            label: '/',
            subItems: [],
        },
        {
            title: 'About Us',
            label: 'about-us',
            subItems: [
                { title: 'Our Story', href: '/about-us/our-story', label: 'about-us' },
                { title: 'Mission & Vision', href: '/about-us/mission-vision', label: 'about-us' },
                { title: 'Our Philosophy', href: '/about-us/our-philosophy', label: 'about-us' },
                { title: 'President Message', href: '/about-us/president-message', label: 'about-us' },
                { title: 'Principal Message', href: '/about-us/principal-message', label: 'about-us' },
                { title: 'Leadership & Staff', href: '/about-us/teams', label: 'about-us' },
            ],
        },
        {
            title: 'Programs',
            href: '/programs',
            label: 'programs',
            subItems: [],
        },
        {
            title: 'Parent Corner',
            label: 'parents',
            subItems: [
                { title: 'Enrollment', href: '/parents/enrollment', label: 'parents' },
                { title: 'Curriculum', href: '/parents/curriculum', label: 'parents' },
                { title: 'Class Rutines', href: '/parents/class-rutines', label: 'parents' },
                { title: 'Health & Safety', href: '/parents/health-safety', label: 'parents' },
                { title: 'Nutrition & Meals', href: '/parents/nutrition-meals', label: 'parents' },
            ],
        },
        {
            title: 'Calendar',
            label: 'calendar',
            subItems: [
                { title: 'Events Calendar', href: '/calendar/events', label: 'calendar' },
                { title: 'Holiday Calendar', href: '/calendar/holidays', label: 'calendar' },
            ],
        },
        { title: 'FAQs', href: '/faq', label: 'faq' },
        {
            title: 'Gallery',
            href: '/galleries',
            label: 'galleries',
            subItems: [],
        },
        {
            title: 'Notices',
            href: '/notices',
            label: 'notices',
            subItems: [],
        },
        {
            title: 'Contact Us',
            href: '/contact-us',
            label: 'contact-us',
            subItems: [],
        },
    ];

    const page = usePage<SharedData>();
    const url = page.url;

    const isActive = (menu: any) => {
        return url === menu.href || url.startsWith(`/${menu.label}`);
    };

    return (
        <header className="sticky top-0 z-[999] w-full transition-all duration-300">
            {/* Desktop & Mobile Banner */}
            <div
                className={`absolute flex w-full items-center justify-center transition-all duration-300 ${
                    scrolled ? 'h-16 bg-card/90 backdrop-blur-md md:h-20' : 'h-32 md:h-48'
                }`}
            >
                <div
                    className={`absolute inset-0 bg-[url(/images/bannerwave.svg)] ${scrolled ? 'opacity-50 dark:opacity-50' : 'opacity-60 dark:opacity-60'}`}
                ></div>
                <div className="z-30 container mx-auto flex justify-between rounded-2xl px-4 py-2">
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center rounded-full bg-white p-1 transition-all duration-300 md:mr-4">
                            <Link href="/" data-discover="true">
                                <img
                                    src="/logo.png"
                                    alt="DC Child Care and Education Centre Logo"
                                    className={`transition-all duration-300 ${scrolled ? 'w-6 md:w-12' : 'w-8 md:w-16'}`}
                                />
                            </Link>
                        </div>

                        <h1 className="font-meow-script text-4xl text-primary dark:text-secondary">DC</h1>
                        <p className="font-chewy text-accent">childCare</p>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden items-center gap-2 text-sm lg:flex">
                        {menuItems.map((menu) => (
                            <div key={menu.title} className="group relative">
                                {menu.subItems && menu.subItems.length > 0 ? (
                                    <>
                                        {isActive(menu) ? <img src="/images/bee.gif" alt="active" className="absolute -top-12 left-0" /> : ''}
                                        <button
                                            className={`cursor-pointer text-foreground hover:font-bold ${
                                                isActive(menu) ? 'bg-primary px-2 py-1 text-primary-foreground' : 'px-2 py-1'
                                            }`}
                                        >
                                            {menu.title}
                                        </button>
                                        <ul className="pointer-events-none absolute top-full left-1/2 min-w-[250px] -translate-x-1/2 transform rounded-xl bg-card p-2 opacity-0 drop-shadow-sm transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                                            {menu.subItems.map((sub) => (
                                                <Link
                                                    href={sub.href}
                                                    key={sub.href}
                                                    className={`mb-2 flex cursor-pointer items-center gap-2 rounded-md p-1 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground`}
                                                >
                                                    {sub.title}
                                                </Link>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <>
                                        {isActive(menu) ? <img src="/images/bee.gif" alt="active" className="absolute -top-8 left-0" /> : ''}
                                        <Link
                                            href={menu.href || '#'}
                                            className={`cursor-pointer text-foreground hover:font-bold ${
                                                isActive(menu) ? 'bg-primary px-2 py-1 text-primary-foreground' : 'px-2 py-1'
                                            }`}
                                        >
                                            {menu.title}
                                        </Link>
                                    </>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="px-4">
                            <svg stroke="currentColor" fill="none" strokeWidth={0} viewBox="0 0 24 24" height="25" width="25">
                                <path d="M4 6H20M4 18H20M11 12H19" stroke="currentColor" strokeWidth={2} />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-screen w-[80%] transform overflow-auto bg-background transition-transform duration-500 ease-in-out ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="mt-20 px-6">
                    <ul>
                        {menuItems.map((menu) => (
                            <li key={menu.title} className="w-full">
                                {menu.subItems && menu.subItems.length > 0 ? (
                                    <>
                                        <button
                                            className="flex w-full items-center justify-between py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                                            onClick={() => toggleDropdown(menu.title)}
                                        >
                                            {menu.title}
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 512 512"
                                                className={`transition-transform duration-300 ${activeDropdown === menu.title ? 'rotate-180' : ''}`}
                                                height="1em"
                                                width="1em"
                                            >
                                                <path d="M256 294.1L129 167c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1.3 24.7-.7 33.1L201.1 417c-9.4 9.4-24.6 9.4-33.9 0z"></path>
                                            </svg>
                                        </button>

                                        {activeDropdown === menu.title && (
                                            <div className="overflow-hidden">
                                                {menu.subItems.map((sub) => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        className="flex items-center gap-2 px-2 py-2 text-muted-foreground transition-colors hover:text-primary"
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={menu.href || '#'}
                                        className="flex w-full items-center justify-between py-3 text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {menu.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    );
}
