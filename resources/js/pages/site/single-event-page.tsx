import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Event } from '../../types/event';
import PageBanner from './components/page-banner';

interface SingleEventPageProps {
    event: Event;
}

const SingleEventPage: React.FC<SingleEventPageProps> = ({ event }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = event?.title || 'YourSite';
    const metaDescription = event?.description || 'YourSite';
    const metaKeywords = 'YourSite';
    console.log(event);

    return (
        <>
            <Head title={event.title}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords || ''}, articles, blog`} />
                <meta name="author" content={'YourSite'} />

                {/* Open Graph (Facebook/LinkedIn) */}
                <meta property="og:type" content="page" />
                <meta property="og:title" content={event?.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={event?.title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={imageUrl} />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <PageLayout>
                {/* Hero */}
                <PageBanner
                    title={event.title}
                    subtitle=""
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Programs', href: '/programs' }, { label: event.title }]}
                />
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-5xl px-4">
                        {/* Thumbnail */}
                        {event.media && (
                            <div className="mb-10 overflow-hidden rounded-2xl shadow-md">
                                <img src={event.media.url} alt={event.title} className="h-[400px] w-full object-cover" />
                            </div>
                        )}

                        {/* Description */}
                        <div className="prose text-foreground lg:prose-lg" dangerouslySetInnerHTML={{ __html: event.description ?? '' }} />
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default SingleEventPage;
