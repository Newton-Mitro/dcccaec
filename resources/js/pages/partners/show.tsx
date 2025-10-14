import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Partner } from '../../types/partner';

interface ShowProps {
    partner: Partner;
}

export default function Show({ partner }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Partners', href: route('partners.index') },
        { title: partner.name, href: '' },
    ];

    const isImage = partner.logo?.url && !partner.logo.url.toLowerCase().endsWith('.pdf');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={partner.name} />
            <div className="space-y-6 p-6">
                <HeadingSmall title={partner.name} />

                {partner.website && (
                    <p className="text-sm text-gray-500">
                        Website:{' '}
                        <a href={partner.website} target="_blank" className="text-blue-600 hover:underline">
                            {partner.website}
                        </a>
                    </p>
                )}

                {partner.logo &&
                    (isImage ? (
                        <img src={partner.logo.url} alt={partner.name} className="h-32 w-32 rounded-full object-cover" />
                    ) : (
                        <a href={partner.logo.url} target="_blank" className="text-blue-600 hover:underline">
                            View File
                        </a>
                    ))}
            </div>
        </AppLayout>
    );
}
