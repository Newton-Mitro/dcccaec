import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { User } from '../../types/user';

interface Props {
    user: User;
}

export default function ShowUser({ user }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Users', href: route('users.index') },
        { title: user.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={user.name} />
            <div className="container-custom space-y-6 p-6">
                {/* Heading */}
                <HeadingSmall title={user.name} description={user.headline || 'No headline'} />

                {/* Bio */}
                {user.bio && <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: user.bio }} />}

                {/* Footer info */}
                <div className="mt-4 space-y-1 text-sm text-gray-500">
                    <p>Username: {user.username || 'N/A'}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Created at: {new Date(user.created_at).toLocaleDateString()}</p>
                    <p>Last updated: {new Date(user.updated_at).toLocaleDateString()}</p>
                </div>
            </div>
        </AppLayout>
    );
}
