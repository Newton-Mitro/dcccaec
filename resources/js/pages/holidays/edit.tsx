import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import AppDatePicker from '../../components/ui/app_date_picker';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Holiday } from '../../types/holiday';

interface EditHolidayProps {
    holiday: Holiday;
}

export default function EditHoliday({ holiday }: EditHolidayProps) {
    const [form, setForm] = useState({
        title: holiday.title,
        date: holiday.date,
        description: holiday.description || '',
    });

    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('holidays.update', holiday.id), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Holidays', href: route('holidays.index') },
        { title: 'Edit Holiday', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Holiday" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Holiday" description="Update the holiday details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Title */}
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <InputError message={errors.title} />
                    </div>

                    {/* Date */}
                    <div className="grid gap-2 md:w-1/2">
                        <AppDatePicker
                            label="Holiday Date"
                            value={form.date}
                            onChange={(val) => setForm({ ...form, date: val })}
                            error={errors.date}
                            small
                        />
                        <InputError message={errors.date} />
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            config={
                                {
                                    contentClass: 'prose dark:prose-invert max-w-full',
                                } as any
                            }
                            data={form.description}
                            onChange={(_, editor) => setForm({ ...form, description: editor.getData() })}
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Update Holiday</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Updated successfully</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
