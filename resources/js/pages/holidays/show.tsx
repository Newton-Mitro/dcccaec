import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Holiday } from '../../types/holiday';

interface ShowHolidayProps {
    holiday: Holiday;
}

export default function ShowHoliday({ holiday }: ShowHolidayProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Holidays', href: route('holidays.index') },
        { title: holiday.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={holiday.title} />
            <div className="container-custom space-y-6 p-6">
                {/* Heading */}
                <HeadingSmall title={holiday.title} description={`Date: ${new Date(holiday.date).toLocaleDateString()}`} />

                {/* Description */}
                <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: holiday.description || '' }} />

                {/* Footer info */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Created at: {new Date(holiday.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(holiday.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
