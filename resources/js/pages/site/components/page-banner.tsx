import { Link } from '@inertiajs/react';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface PageBannerProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Breadcrumb[];
}

const PageBanner: React.FC<PageBannerProps> = ({
    title,
    subtitle = 'We’d love to hear from you—reach out for support, partnerships, or just to say hi!',
    breadcrumbs = [],
}) => {
    return (
        <section className="relative bg-black/30 pt-32 pb-10 text-secondary-foreground">
            <div className="mx-auto max-w-4xl px-4 text-center">
                <div className="mx-auto h-28 w-28 object-cover">
                    <img src="/images/emu.gif" alt="DC Child Care and Education Centre Logo" className="translate-y-8" />
                </div>

                {/* Breadcrumb */}
                {breadcrumbs.length > 0 && (
                    <nav className="text-sm text-muted-foreground">
                        <ol className="flex flex-wrap justify-center gap-1 md:gap-2">
                            {breadcrumbs.map((crumb, i) => (
                                <li key={i} className="flex items-center">
                                    {crumb.href ? (
                                        <Link href={crumb.href} className="transition-colors hover:text-primary">
                                            {crumb.label}
                                        </Link>
                                    ) : (
                                        <span className="text-foreground">{crumb.label}</span>
                                    )}
                                    {i < breadcrumbs.length - 1 && <span className="mx-1 text-muted-foreground">/</span>}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* Title & Subtitle */}
                <h1 className="mb-2 text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
                <p className="text-lg text-muted-foreground opacity-90 md:text-xl">{subtitle}</p>
            </div>
        </section>
    );
};

export default PageBanner;
