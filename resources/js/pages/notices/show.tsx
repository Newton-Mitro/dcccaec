import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Notice } from '../../types/notice';

interface ShowProps {
    notice: Notice;
}

export default function Show({ notice }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Notices', href: route('notices.index') },
        { title: notice.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={notice.title} />
            <div className="container-custom space-y-6 p-6">
                {/* Heading */}
                <HeadingSmall
                    title={notice.title}
                    description={`Published on ${new Date(notice.publish_date).toLocaleDateString()}${
                        notice.expiry_date ? ` | Expires on ${new Date(notice.expiry_date).toLocaleDateString()}` : ''
                    }`}
                />

                {/* Category & Status */}
                <div className="flex flex-wrap items-center gap-4">
                    {notice.category && <p className="text-sm text-gray-500">Category: {notice.category.name}</p>}
                    <Badge variant={notice.status === 'Active' ? 'default' : 'secondary'} className="rounded-xl">
                        {notice.status}
                    </Badge>
                </div>

                {/* Media */}
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

                {/* Content */}
                <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: notice.content || '' }} />

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(notice.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(notice.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
