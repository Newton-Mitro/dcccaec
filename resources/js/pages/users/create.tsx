import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default function CreateUser() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        headline: '',
        bio: '',
        role: 'VISITOR',
        avatar_id: null as number | null,
    });

    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('users.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Users', href: route('users.index') },
        { title: 'Create User', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create User" description="Fill in the user details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <InputError message={errors.name} />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <Label>Email</Label>
                        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        <InputError message={errors.email} />
                    </div>

                    {/* Username */}
                    <div className="grid gap-2">
                        <Label>Username</Label>
                        <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                        <InputError message={errors.username} />
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                        <Label>Password</Label>
                        <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                        <InputError message={errors.password} />
                    </div>

                    {/* Headline */}
                    <div className="grid gap-2">
                        <Label>Headline</Label>
                        <Input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} />
                        <InputError message={errors.headline} />
                    </div>

                    {/* Bio */}
                    <div className="grid gap-2">
                        <Label>Bio</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            config={
                                {
                                    contentClass: 'prose dark:prose-invert max-w-full',
                                } as any
                            }
                            data={form.bio}
                            onChange={(_, editor) => setForm({ ...form, bio: editor.getData() })}
                        />
                        <InputError message={errors.bio} />
                    </div>

                    {/* Role */}
                    <div className="grid gap-2">
                        <Label>Role</Label>
                        <select
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="rounded-md border p-2 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="VISITOR">Visitor</option>
                            <option value="EDITOR">Editor</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                        <InputError message={errors.role} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create User</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Created successfully</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
