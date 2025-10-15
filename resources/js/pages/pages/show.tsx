import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import HeadingSmall from '../../components/heading-small';
import { Button } from '../../components/ui/button';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Media } from '../../types/media';
import { Page } from '../../types/page';

interface ShowProps {
    page: Page;
}

export default function Show({ page }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: route('pages.index') },
        { title: `View: ${page.title}`, href: '' },
    ];

    const featuredImage: Media | null = page.featured_image || null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`View Page: ${page.title}`} />

            <div className="mx-auto h-[calc(100vh-100px)] w-6xl overflow-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <HeadingSmall title="Page Details" description="View all details of this page" />
                    <Link href={route('pages.index')}>
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>

                {/* Page Details */}
                <div className="rounded-lg border bg-card p-6 px-4 py-10 shadow-sm md:px-6 md:py-16">
                    {/* Featured Image */}
                    {featuredImage && (
                        <div className="mb-6">
                            <img src={featuredImage.url} alt={page.title} className="w-full max-w-3xl rounded-lg border dark:border-gray-700" />
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Title</h3>
                            <p className="text-gray-700 dark:text-gray-300">{page.title}</p>
                        </div>

                        {/* Subtitle */}
                        {page.subtitle && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Subtitle</h3>
                                <p className="text-gray-700 dark:text-gray-300">{page.subtitle}</p>
                            </div>
                        )}

                        {/* Slug */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Slug</h3>
                            <p className="text-gray-700 dark:text-gray-300">{page.slug}</p>
                        </div>

                        {/* Meta Information */}
                        {(page.meta_title || page.meta_description || page.meta_keywords) && (
                            <div className="grid gap-4 md:grid-cols-2">
                                {page.meta_title && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Meta Title</h3>
                                        <p className="text-gray-700 dark:text-gray-300">{page.meta_title}</p>
                                    </div>
                                )}
                                {page.meta_description && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Meta Description</h3>
                                        <p className="text-gray-700 dark:text-gray-300">{page.meta_description}</p>
                                    </div>
                                )}
                                {page.meta_keywords && (
                                    <div className="md:col-span-2">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Meta Keywords</h3>
                                        <p className="text-gray-700 dark:text-gray-300">{page.meta_keywords}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Excerpt */}
                        {page.excerpt && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Excerpt</h3>
                                <p className="text-gray-700 dark:text-gray-300">{page.excerpt}</p>
                            </div>
                        )}

                        {/* Content */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Content</h3>
                            <div
                                className="prose max-w-none dark:prose-invert"
                                dangerouslySetInnerHTML={{
                                    __html: page.content || '<p>No content available.</p>',
                                }}
                            />
                        </div>

                        {/* Button Info */}
                        {(page.button_text || page.button_link) && (
                            <div className="flex items-center gap-4">
                                {page.button_text && <span className="font-medium text-gray-800 dark:text-gray-200">{page.button_text}</span>}
                                {page.button_link && (
                                    <a
                                        href={page.button_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                                    >
                                        {page.button_link}
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Gallery */}
                        {page.gallery && page.gallery.length > 0 && (
                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Gallery</h3>
                                <div className="flex flex-wrap gap-4">
                                    {page.gallery.map((item, idx) => (
                                        <img
                                            key={idx}
                                            src={item.media?.url}
                                            alt={item.media?.file_name || `Gallery ${idx + 1}`}
                                            className="h-32 w-32 rounded-lg border object-cover dark:border-gray-700"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* JSON Array */}
                        {page.json_array && page.json_array.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Additional Data (JSON)</h3>
                                <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                                    {JSON.stringify(page.json_array, null, 2)}
                                </pre>
                            </div>
                        )}

                        {/* Predefined */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Predefined</h3>
                            <p className="text-gray-700 dark:text-gray-300">{page.predefined ? 'Yes' : 'No'}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 pt-6">
                            <Link href={route('pages.edit', page.id)}>
                                <Button>Edit</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
