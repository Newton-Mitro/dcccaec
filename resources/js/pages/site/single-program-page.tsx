import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Program } from '../../types/program';
import PageBanner from './components/page-banner';

interface OurStoryPageProps {
    program: Program;
}

const SingleProgramPage: React.FC<OurStoryPageProps> = ({ program }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = program?.title || 'YourSite';
    const metaDescription = program?.description || 'YourSite';
    const metaKeywords = 'YourSite';
    console.log(program);

    return (
        <>
            <Head title={program.title}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords || ''}, articles, blog`} />
                <meta name="author" content={'YourSite'} />

                {/* Open Graph (Facebook/LinkedIn) */}
                <meta property="og:type" content="page" />
                <meta property="og:title" content={program?.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={program?.title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={imageUrl} />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <PageLayout>
                {/* Hero */}
                <PageBanner
                    title={program.title}
                    subtitle="How We Started and Our Mission to Help You"
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Programs', href: '/programs' }, { label: program.title }]}
                />
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-5xl px-4">
                        {/* Thumbnail */}
                        {program.media && (
                            <div className="mb-10 overflow-hidden rounded-2xl shadow-md">
                                <img src={program.media.url} alt={program.title} className="h-[400px] w-full object-cover" />
                            </div>
                        )}

                        {/* Description */}
                        <div className="prose text-foreground lg:prose-lg" dangerouslySetInnerHTML={{ __html: program.description ?? '' }} />

                        {/* Gallery */}
                        {program.gallery && program.gallery.length > 0 && (
                            <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {program.gallery.map((img, i) => (
                                    <div key={i} className="overflow-hidden rounded-xl shadow-sm transition hover:scale-105">
                                        <img src={img} alt={`Gallery ${i + 1}`} className="h-48 w-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Category Info */}
                        {program.category && (
                            <div className="mt-10 text-sm text-muted-foreground">
                                <span>Category:</span> <span className="font-semibold text-primary">{program.category.name}</span>
                            </div>
                        )}
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default SingleProgramPage;
