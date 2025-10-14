import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Notice } from '../../types/notice';
import PageBanner from './components/page-banner';

interface SingleNoticePageProps {
    notice: Notice;
}

const SingleNoticePage: React.FC<SingleNoticePageProps> = ({ notice }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = notice?.title || 'YourSite';
    const metaDescription = notice?.content || 'YourSite';
    const metaKeywords = 'YourSite';
    console.log(notice);

    return (
        <>
            <Head title={notice.title}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords || ''}, articles, blog`} />
                <meta name="author" content={'YourSite'} />

                {/* Open Graph (Facebook/LinkedIn) */}
                <meta property="og:type" content="page" />
                <meta property="og:title" content={notice?.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={notice?.title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={imageUrl} />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <PageLayout>
                {/* Hero */}
                <PageBanner
                    title={notice.title}
                    subtitle=""
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Notices', href: '/notices' }, { label: notice.title }]}
                />
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-5xl px-4">
                        {/* Thumbnail */}
                        {notice.attachment && (
                            <div className="mb-10 overflow-hidden rounded shadow">
                                <img src={notice.attachment.url} alt={notice.title} className="w-full object-cover" />
                            </div>
                        )}

                        {/* Description */}
                        <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: notice.content ?? '' }} />
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default SingleNoticePage;
