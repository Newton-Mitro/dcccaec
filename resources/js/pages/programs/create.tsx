import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import toast from 'react-hot-toast';
import MediaBrowserModal from '../media/media_browser_modal';

interface CreateProps {
    media: PaginatedData<Media>;
}

export default function Create({ media }: CreateProps) {
    const [form, setForm] = useState({
        name: '',
        slug: '',
        description: '',
        excerpt: '',
        objectives: '',
        category_id: 0,
        is_active: true,
        featured: false,
        gallery: [] as string[],
        media_id: null as number | null,

        // Fees
        monthly_fee: {} as Record<string, number>,
        admission_form_fee: '',
        admission_fee: '',
        yearly_charge: '',
        uniform_fee: '',
        books_stationary_fee: '',
        khata_fee: '',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('programs.store'), form, {
            onError: (err) => {
                setErrors(err);
                toast.error('Error creating program. Please try again.');
            },
            onSuccess: () => {
                setRecentlySuccessful(true);
                toast.success('Program created successfully.');
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Programs', href: route('programs.index') },
        { title: 'Create Program', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Program" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Program" description="Fill in the program details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Name & Slug */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                                    })
                                }
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                            <InputError message={errors.slug} />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="grid gap-2">
                        <Label>Excerpt</Label>
                        <Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
                        <InputError message={errors.excerpt} />
                    </div>

                    {/* Objectives */}
                    <div className="grid gap-2">
                        <Label>Objectives</Label>
                        <Input value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} />
                        <InputError message={errors.objectives} />
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

                    {/* Monthly Fees */}
                    <div className="grid gap-2">
                        <Label>Monthly Fees (per level)</Label>
                        <Input
                            placeholder="Example: Playgroup:500,Nursery:600"
                            value={Object.entries(form.monthly_fee)
                                .map(([level, fee]) => `${level}:${fee}`)
                                .join(',')}
                            onChange={(e) => {
                                const fees: Record<string, number> = {};
                                e.target.value.split(',').forEach((pair) => {
                                    const [level, fee] = pair.split(':');
                                    if (level && fee) fees[level.trim()] = Number(fee.trim());
                                });
                                setForm({ ...form, monthly_fee: fees });
                            }}
                        />
                        <InputError message={errors.monthly_fee} />
                    </div>

                    {/* Extra Fees */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="grid gap-2">
                            <Label>Admission Form Fee</Label>
                            <Input value={form.admission_form_fee} onChange={(e) => setForm({ ...form, admission_form_fee: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Admission Fee</Label>
                            <Input value={form.admission_fee} onChange={(e) => setForm({ ...form, admission_fee: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Yearly Charge</Label>
                            <Input value={form.yearly_charge} onChange={(e) => setForm({ ...form, yearly_charge: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Uniform Fee</Label>
                            <Input value={form.uniform_fee} onChange={(e) => setForm({ ...form, uniform_fee: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Books & Stationary Fee</Label>
                            <Input value={form.books_stationary_fee} onChange={(e) => setForm({ ...form, books_stationary_fee: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Khata Fee</Label>
                            <Input value={form.khata_fee} onChange={(e) => setForm({ ...form, khata_fee: e.target.value })} />
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="grid gap-2">
                        <Label>Gallery URLs (comma separated)</Label>
                        <Input value={form.gallery.join(',')} onChange={(e) => setForm({ ...form, gallery: e.target.value.split(',') })} />
                        <InputError message={errors.gallery} />
                    </div>

                    {/* Media */}
                    <div className="flex gap-4">
                        <MediaSelector
                            media={selectedMedia}
                            onSelect={() => setIsModalOpen(true)}
                            onRemove={() => {
                                setSelectedMedia(null);
                                setForm({ ...form, media_id: null });
                            }}
                            error={errors.media_id}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create Program</Button>
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

                {/* Media Modal */}
                <MediaBrowserModal
                    actionType="create"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    media={media}
                    onSelect={(m) => {
                        setSelectedMedia(m);
                        setForm({ ...form, media_id: m.id });
                    }}
                />
            </div>
        </AppLayout>
    );
}
