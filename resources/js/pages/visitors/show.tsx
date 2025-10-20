import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Cpu, Globe, Monitor, MonitorCheck, User } from 'lucide-react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Visitor } from '../../types/visitor';

interface ShowVisitorProps {
    visitor: Visitor;
}

export default function ShowVisitor({ visitor }: ShowVisitorProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Visitors', href: route('visitors.index') },
        { title: 'Visitor Details', href: '' },
    ];

    const infoCards = [
        { title: 'Session ID', value: visitor.session_id, icon: <User className="h-5 w-5 text-blue-500" /> },
        { title: 'IP Address', value: visitor.ip_address || '-', icon: <Globe className="h-5 w-5 text-green-500" /> },
        { title: 'Device', value: visitor.device || '-', icon: <MonitorCheck className="h-5 w-5 text-purple-500" /> },
        { title: 'Browser', value: visitor.browser || '-', icon: <Monitor className="h-5 w-5 text-yellow-500" /> },
        { title: 'Operating System', value: visitor.os || '-', icon: <Cpu className="h-5 w-5 text-red-500" /> },
        { title: 'User Agent', value: visitor.user_agent || '-', icon: <User className="h-5 w-5 text-indigo-500" /> },
        { title: 'Last Activity', value: visitor.last_activity ? new Date(visitor.last_activity).toLocaleString() : '-', icon: <ClockIcon /> },
        { title: 'Created At', value: new Date(visitor.created_at).toLocaleString(), icon: <ClockIcon /> },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Visitor #${visitor.id}`} />
            <div className="w-full max-w-7xl space-y-8 p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <HeadingSmall title={`Visitor #${visitor.id}`} description="Detailed visitor session information" />
                    <Link
                        href={route('visitors.index')}
                        className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </div>

                {/* Visitor Info Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {infoCards.map((card, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">{card.icon}</div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                                <p className="text-sm font-semibold break-words text-gray-800 dark:text-gray-100">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

// Clock icon for timestamps
function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
