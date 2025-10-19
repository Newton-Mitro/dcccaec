import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import PageBanner from './components/page-banner';

interface ClassRoutinesPageProps {
    page: Page;
}

const ClassRoutinesPage: React.FC<ClassRoutinesPageProps> = ({ page }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = page?.meta_title || 'YourSite';
    const metaDescription = page?.meta_description || 'YourSite';
    const metaKeywords = page?.meta_keywords || 'YourSite';

    return (
        <>
            <Head title={page.title}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords || ''}, articles, blog`} />
                <meta name="author" content={'YourSite'} />

                {/* Open Graph (Facebook/LinkedIn) */}
                <meta property="og:type" content="page" />
                <meta property="og:title" content={page?.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={page?.title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={imageUrl} />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <PageLayout>
                {/* Hero */}
                <PageBanner
                    title={page.title}
                    subtitle=""
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Notices', href: '/notices' }, { label: page.title }]}
                />
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-5xl px-4">
                        {/* Attachment Preview */}
                        <div className="mb-10 overflow-hidden rounded shadow">
                            {page?.featured_image?.file_type.startsWith('image/') ? (
                                <img src={page?.featured_image?.url} alt={page.title} className="w-full object-cover" />
                            ) : page?.featured_image?.file_type.startsWith('application/pdf') ? (
                                <iframe src={page?.featured_image?.url} title={page.title} className="h-[700px] w-full rounded border" />
                            ) : (
                                <p className="p-6 text-center text-gray-600 dark:text-gray-300">
                                    This file type is not previewable.{' '}
                                    <a href={page?.featured_image?.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                        Download instead
                                    </a>
                                    .
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content ?? '' }} />
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default ClassRoutinesPage;
