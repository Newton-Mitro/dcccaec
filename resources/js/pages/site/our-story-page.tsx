import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import ImageContentBlock from './components/image-content-block';
import PageBanner from './components/page-banner';
import RenderSectionContent from './components/render-section-content';
import SectionGallery from './components/section-gallery';

interface OurStoryPageProps {
    page: Page;
}

const OurStoryPage: React.FC<OurStoryPageProps> = ({ page }) => {
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

                        <ImageContentBlock
                            heading={page?.title}
                            sub_heading={page?.subtitle}
                            imageUrl={page?.featured_image?.url}
                            content={page?.content}
                        />

                        <div className="py-6">{page.json_array && <RenderSectionContent jsonItems={page.json_array} />}</div>

                        {/* Gallery */}
                        {page?.gallery && page?.gallery.length > 0 && (
                            <>
                                <div className="mb-6 flex flex-col items-center justify-center text-center">
                                    <h2 className="mb-1 text-2xl font-semibold">Gallery</h2>
                                    <h3 className="mb-2 text-sm text-gray-500">Browse the gallery</h3>
                                </div>
                                <SectionGallery gallery={page.gallery} />
                            </>
                        )}

                        {/* Button */}
                        {page.button_text && page.button_link && (
                            <div className="my-6 text-center">
                                <a
                                    href={page.button_link}
                                    className="inline-block rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                                >
                                    {page.button_text}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </PageLayout>
        </>
    );
};

export default OurStoryPage;
