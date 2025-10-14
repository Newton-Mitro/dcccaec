import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Award } from '../../types/award';

interface Props {
    award: Award;
}

export default function Show({ award }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Awards', href: route('awards.index') },
        { title: award.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={award.title} />
            <div className="container-custom space-y-6 p-6">
                {/* Heading */}
                <HeadingSmall title={award.title} description={`Year: ${award.year}`} />

                {/* Media */}
                {award.featured_image?.url && (
                    <div className="my-4">
                        <img src={award.featured_image.url} alt={award.title} className="max-h-96 rounded object-cover shadow-md" />
                    </div>
                )}

                {/* Description */}
                <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: award.description || '' }} />

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(award.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(award.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
