import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Head, Link, router } from '@inertiajs/react';
import { Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { PaginationLink } from '../../types/pagination_link';
import { Visitor } from '../../types/visitor';

interface VisitorProps {
    visitors: {
        data: Visitor[];
        links: PaginationLink[];
    };
}

export default function Index({ visitors }: VisitorProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Visitors', href: route('visitors.index') },
    ];

    const deleteVisitor = (id: number) => {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This visitor record will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('visitors.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                });
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Visitors" />
            <div className="p-6">
                <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row">
                    <HeadingSmall title="Visitors" description="Monitor and manage visitor sessions" />
                </div>

                <div className="h-[calc(100vh-250px)] overflow-auto rounded border border-gray-200 dark:border-gray-700">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="border-b p-2 text-left">Session ID</th>
                                <th className="border-b p-2 text-left">IP Address</th>
                                <th className="border-b p-2 text-left">Device</th>
                                <th className="border-b p-2 text-left">Browser</th>
                                <th className="border-b p-2 text-left">OS</th>
                                <th className="border-b p-2 text-left">Last Activity</th>
                                <th className="border-b p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitors.data.length > 0 ? (
                                visitors.data.map((visitor) => (
                                    <tr key={visitor.id} className="border-b even:bg-gray-50 dark:even:bg-gray-900">
                                        <td className="px-2 py-1">{visitor.session_id}</td>
                                        <td className="px-2 py-1">{visitor.ip_address || '-'}</td>
                                        <td className="px-2 py-1">{visitor.device || '-'}</td>
                                        <td className="px-2 py-1">{visitor.browser || '-'}</td>
                                        <td className="px-2 py-1">{visitor.os || '-'}</td>
                                        <td className="px-2 py-1">{new Date(visitor.last_activity).toLocaleString()}</td>
                                        <td className="px-2 py-1">
                                            <TooltipProvider>
                                                <div className="flex space-x-2">
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Link href={route('visitors.show', visitor.id)}>
                                                                <Eye className="h-5 w-5 text-blue-600" />
                                                            </Link>
                                                        </TooltipTrigger>
                                                        <TooltipContent>View</TooltipContent>
                                                    </Tooltip>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button onClick={() => deleteVisitor(visitor.id)}>
                                                                <Trash2 className="h-5 w-5 text-red-600" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Delete</TooltipContent>
                                                    </Tooltip>
                                                </div>
                                            </TooltipProvider>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="p-4 text-center text-gray-500 dark:text-gray-400">
                                        No visitors found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex flex-col items-center justify-between gap-2 md:flex-row">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Showing {visitors.data.length} results</span>
                    <div className="flex gap-1">
                        {visitors.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`rounded-full px-3 py-1 text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                                        : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
