import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Program } from '../../types/program';
import PageBanner from './components/page-banner';

interface SingleProgramPageProps {
    program: Program;
}

const SingleProgramPage: React.FC<SingleProgramPageProps> = ({ program }) => {
    const pageUrl = window.location.href;
    const metaTitle = program?.name || 'YourSite';
    const metaDescription = program?.description?.replace(/<[^>]+>/g, '').slice(0, 160) || 'YourSite';
    const metaKeywords = 'YourSite';

    return (
        <>
            <Head title={program.name}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords}, programs, education`} />
                <meta name="author" content="YourSite" />

                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={program.name} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={program.media?.url ?? ''} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={program.name} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={program.media?.url ?? ''} />

                {/* Canonical */}
                <link rel="canonical" href={pageUrl} />
            </Head>

            <PageLayout>
                {/* Hero Banner */}
                <PageBanner
                    title={program.name}
                    subtitle="Our Mission and Approach"
                    breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Programs', href: '/programs' }, { label: program.name }]}
                />

                {/* Main Section */}
                <section className="bg-background py-16">
                    <div className="container mx-auto max-w-6xl space-y-12 px-4">
                        {/* Program Thumbnail */}
                        {program.media && (
                            <div className="overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105">
                                <img src={program.media.url} alt={program.name} className="h-[450px] w-full object-cover" />
                            </div>
                        )}

                        {/* Program Info */}
                        <div className="flex justify-between gap-10 lg:gap-16">
                            {/* Description */}
                            <div className="prose max-w-full dark:prose-invert">
                                <div dangerouslySetInnerHTML={{ __html: program.description ?? '' }} />
                            </div>

                            {/* Details Card */}
                            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-foreground">Program Details</h3>
                                <div className="mb-4 text-sm text-muted-foreground">
                                    <span className="font-semibold">Age Group:</span> {program.age_min}–{program.age_max} years
                                </div>

                                {program.monthly_fee && (
                                    <div className="mb-4 text-sm text-muted-foreground">
                                        <span className="font-semibold">Monthly Fees:</span>
                                        <ul className="mt-2 ml-4 list-disc">
                                            {Object.entries(program.monthly_fee).map(([level, fee]) => (
                                                <li key={level}>
                                                    {level}: <span className="font-semibold">${fee}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {program.category && (
                                    <div className="mb-4 text-sm text-muted-foreground">
                                        <span className="font-semibold">Category:</span>{' '}
                                        <span className="font-medium text-primary">{program.category.name}</span>
                                    </div>
                                )}

                                {/* Optional Extras */}
                                {program.admission_fee && (
                                    <div className="space-y-1 text-sm text-muted-foreground">
                                        {program.admission_form_fee && (
                                            <div>
                                                Admission Form: <span className="font-semibold">${program.admission_form_fee}</span>
                                            </div>
                                        )}
                                        {program.admission_fee && (
                                            <div>
                                                Admission Fee: <span className="font-semibold">${program.admission_fee}</span>
                                            </div>
                                        )}
                                        {program.yearly_charge && (
                                            <div>
                                                Yearly Charge: <span className="font-semibold">${program.yearly_charge}</span>
                                            </div>
                                        )}
                                        {program.uniform_fee && (
                                            <div>
                                                Uniform: <span className="font-semibold">${program.uniform_fee}</span>
                                            </div>
                                        )}
                                        {program.books_stationary_fee && (
                                            <div>
                                                Books & Stationary: <span className="font-semibold">{program.books_stationary_fee}</span>
                                            </div>
                                        )}
                                        {program.khata_fee && (
                                            <div>
                                                Khata: <span className="font-semibold">${program.khata_fee}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default SingleProgramPage;
