import { Head, Link } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Notice } from '../../types/notice';
import PageBanner from './components/page-banner';

interface NoticesPageProps {
    notices: Notice[];
}

const NoticesPage: React.FC<NoticesPageProps> = ({ notices }) => {
    return (
        <>
            <Head title="Notices" />
            <PageLayout>
                {/* Hero Section */}
                <PageBanner title="Notices" subtitle="Keep up to date with our latest notices" />

                {/* Notices List */}
                {notices && notices.length > 0 ? (
                    <section className="my-16">
                        <div className="container-custom mx-auto px-4 sm:px-6 md:px-6">
                            <div className="relative">
                                {/* Center line */}
                                <div className="absolute top-0 left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-300 dark:bg-gray-600"></div>

                                {notices.map((notice, idx) => {
                                    const isLeft = idx % 2 === 0;
                                    return (
                                        <Link key={notice.id} href={route('site.notices.show', notice.id)}>
                                            <div className="relative mb-12 flex w-full">
                                                {/* Timeline dot */}
                                                <div className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 bg-accent"></div>

                                                {/* Notice Card */}
                                                <div
                                                    className={`w-full max-w-md rounded-3xl border bg-card p-6 shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] ${
                                                        isLeft ? 'pr-10 text-right md:mr-auto' : 'pl-10 text-left md:ml-auto'
                                                    }`}
                                                >
                                                    <h3 className="mb-2 text-xl font-bold text-card-foreground">{notice.title}</h3>
                                                    {notice.content && (
                                                        <div
                                                            className="prose max-w-full dark:prose-invert"
                                                            dangerouslySetInnerHTML={{ __html: notice.content ?? '' }}
                                                        />
                                                    )}

                                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                                        <span>{new Date(notice.created_at).toLocaleDateString()}</span>
                                                        {notice.category && (
                                                            <span className="rounded-full bg-primary px-3 py-1 font-semibold text-primary-foreground">
                                                                {notice.category.name}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="my-36 text-center">
                        <div className="container-custom mx-auto px-4 sm:px-6 md:px-6">
                            <div className="">
                                <h3 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">No Notices Yet 📢</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    We don’t have any new updates at the moment. Check back soon for upcoming news and events!
                                </p>
                            </div>
                        </div>
                    </section>
                )}
            </PageLayout>
        </>
    );
};

export default NoticesPage;
