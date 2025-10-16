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
                        {/* Attachment Preview */}
                        {notice.attachment && (
                            <div className="mb-10 overflow-hidden rounded shadow">
                                {notice.attachment.file_type.startsWith('image/') ? (
                                    <img src={notice.attachment.url} alt={notice.title} className="w-full object-cover" />
                                ) : notice.attachment.file_type.startsWith('application/pdf') ? (
                                    <iframe src={notice.attachment.url} title={notice.title} className="h-[700px] w-full rounded border" />
                                ) : (
                                    <p className="p-6 text-center text-gray-600 dark:text-gray-300">
                                        This file type is not previewable.{' '}
                                        <a href={notice.attachment.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                                            Download instead
                                        </a>
                                        .
                                    </p>
                                )}
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
