import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import PageBanner from './components/page-banner';
import RenderSectionContent from './components/render-section-content';

interface PrivacyPolicyPageProps {
    page: Page;
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ page }) => {
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
                <PageBanner title={page.title} subtitle="How We Started and Our Mission to Help You" />
                <div className="container-custom mx-auto my-16 w-full space-y-14 p-6">
                    <div className="">
                        {/* Section Heading */}

                        <div className="">
                            <div className="flex flex-col">
                                {page.title && <h2 className="mb-1 font-chewy text-3xl text-accent">{page.title}</h2>}
                                {page.subtitle && <h3 className="mb-2 text-muted-foreground">{page.subtitle}</h3>}
                                {page.title && <div className="mx-auto mb-8 h-1 w-16 bg-secondary md:mx-0"></div>}
                            </div>
                            <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: page.content || '' }} />
                        </div>

                        <div className="py-6">{page.json_array && <RenderSectionContent jsonItems={page.json_array} />}</div>
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default PrivacyPolicyPage;
