import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Head, router } from '@inertiajs/react';
import { PlusCircleIcon, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/text-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Media } from '../../types/media';
import { Page } from '../../types/page';
import { PageSection } from '../../types/page_media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    page: Page;
    sections: PageSection[];
    media: PaginatedData<Media>;
}

interface PageForm {
    title: string;
    meta_title?: string | null;
    meta_description?: string | null;
    meta_keywords?: string | null;
}

const Edit: React.FC<EditProps> = ({ page, sections, media }) => {
    const [pageForm, setPageForm] = useState<PageForm>({
        title: page.title || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
    });

    const [pageSections, setPageSections] = useState<PageSection[]>(sections || []);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // --- Page Submit ---
    const handlePageSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.put(
            `/admin/pages/${page.id}`,
            {
                ...pageForm,
                sections: pageSections.map((s, idx) => ({
                    id: s.id,
                    heading: s.heading || '',
                    sub_heading: s.sub_heading || '',
                    button_text: s.button_text || '',
                    button_link: s.button_link || '',
                    content_type: s.content_type || 'HTML',
                    content: s.content || '',
                    json_array: s.json_array ? (typeof s.json_array === 'string' ? s.json_array : JSON.stringify(s.json_array)) : null,
                    gallery: s.gallery ? (typeof s.gallery === 'string' ? s.gallery : JSON.stringify(s.gallery)) : null,
                    media_id: s.media_id || null,
                    sort_order: s.sort_order ?? idx + 1,
                })),
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => toast.success('Page updated successfully.'),
                onError: (err) => {
                    console.log(err);
                    setErrors(formatErrors(err));
                },
            },
        );
    };

    const safeJsonParse = (value: string) => {
        try {
            return value ? JSON.parse(value) : [];
        } catch {
            return [];
        }
    };

    const formatErrors = (err: any) => {
        const newErrors: any = {};
        if (err.title) newErrors.title = err.title;
        if (err.meta_title) newErrors.meta_title = err.meta_title;
        if (err.meta_description) newErrors.meta_description = err.meta_description;
        if (err.meta_keywords) newErrors.meta_keywords = err.meta_keywords;

        if (err.sections) {
            newErrors.sections = {};
            Object.keys(err.sections).forEach((key) => {
                const match = key.match(/^sections\.(\d+)\.(.+)$/);
                if (match) {
                    const idx = parseInt(match[1]);
                    const field = match[2];
                    newErrors.sections[idx] = {
                        ...(newErrors.sections[idx] || {}),
                        [field]: err.sections[key],
                    };
                }
            });
        }

        return newErrors;
    };

    // --- Section Handlers ---
    const addSection = () => {
        setPageSections((prev) => [
            ...prev,
            {
                id: null,
                heading: '',
                sub_heading: '',
                button_text: '',
                button_link: '',
                content_type: 'HTML',
                content: '',
                excerpt: '',
                json_array: [],
                gallery: [],
                media_id: null,
                media: null,
                sort_order: prev.length + 1,
            },
        ]);
    };

    const updateSectionField = (index: number, keyOrFields: keyof PageSection | Record<string, any>, value?: any) => {
        setPageSections((prev) => {
            const updated = [...prev];
            if (typeof keyOrFields === 'string') {
                updated[index] = { ...updated[index], [keyOrFields]: value };
            } else {
                updated[index] = { ...updated[index], ...keyOrFields };
            }
            return updated;
        });
    };

    const removeSection = (index: number) => {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This section will be removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, remove it!',
        }).then((res) => {
            if (res.isConfirmed) {
                setPageSections((prev) => prev.filter((_, i) => i !== index));
            }
        });
    };

    const openMediaModal = (sectionIndex: number) => {
        setSelectedSectionIndex(sectionIndex);
        setMediaModalOpen(true);
    };

    const handleMediaSelect = (mediaItem: Media) => {
        if (selectedSectionIndex !== null) {
            updateSectionField(selectedSectionIndex, {
                media: mediaItem,
                media_id: mediaItem.id,
            });
        }
        setMediaModalOpen(false);
        setSelectedSectionIndex(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '/admin/pages' },
        { title: 'Edit Page', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Page" />
            <div className="container-custom h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Page" description="Update page metadata and sections" />

                <form onSubmit={handlePageSubmit}>
                    {/* --- Page Info --- */}
                    <div className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <Label>Title</Label>
                                <Input value={pageForm.title} onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })} />
                                <InputError message={errors.title} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Meta Title</Label>
                                <Input value={pageForm.meta_title || ''} onChange={(e) => setPageForm({ ...pageForm, meta_title: e.target.value })} />
                                <InputError message={errors.meta_title} />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-3">
                                <Label>Meta Description</Label>
                                <Textarea
                                    rows={3}
                                    value={pageForm.meta_description || ''}
                                    onChange={(e) => setPageForm({ ...pageForm, meta_description: e.target.value })}
                                />
                                <InputError message={errors.meta_description} />
                            </div>
                        </div>
                    </div>

                    {/* --- Sections --- */}
                    <div className="mt-6 space-y-6">
                        <HeadingSmall title="Page Sections" description="Manage content sections" />
                        {pageSections.map((section, index) => (
                            <div key={index} className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <HeadingSmall title={`Section ${index + 1}`} description="Edit section content" />
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                onClick={() => removeSection(index)}
                                                variant="outline"
                                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Remove Section</TooltipContent>
                                    </Tooltip>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label>Heading</Label>
                                        <Input value={section.heading || ''} onChange={(e) => updateSectionField(index, 'heading', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Sub Heading</Label>
                                        <Input
                                            value={section.sub_heading || ''}
                                            onChange={(e) => updateSectionField(index, 'sub_heading', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Content Type</Label>
                                        <select
                                            className="rounded-md border p-2 dark:bg-gray-800"
                                            value={section.content_type || 'HTML'}
                                            onChange={(e) => updateSectionField(index, 'content_type', e.target.value)}
                                        >
                                            <option value="HTML">HTML</option>
                                            <option value="TEXT">TEXT</option>
                                        </select>
                                    </div>
                                    <div>
                                        <Label>Sort Order</Label>
                                        <Input
                                            type="number"
                                            value={section.sort_order || 0}
                                            onChange={(e) => updateSectionField(index, 'sort_order', parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>

                                {/* Content Editor */}
                                {section.content_type === 'HTML' ? (
                                    <div className="mt-2">
                                        <Label>HTML Content</Label>
                                        <CKEditor
                                            editor={ClassicEditor as any}
                                            data={section.content || ''}
                                            onChange={(_, editor) => updateSectionField(index, 'content', editor.getData())}
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <Label>Text Content</Label>
                                        <Textarea
                                            rows={5}
                                            value={section.content || ''}
                                            onChange={(e) => updateSectionField(index, 'content', e.target.value)}
                                        />
                                    </div>
                                )}

                                <div>
                                    <Label>JSON Array (optional)</Label>
                                    <Textarea
                                        rows={5}
                                        value={
                                            typeof section.json_array === 'string'
                                                ? section.json_array
                                                : JSON.stringify(section.json_array || [], null, 2)
                                        }
                                        onChange={(e) => updateSectionField(index, 'json_array', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Gallery (optional)</Label>
                                    <Textarea
                                        rows={3}
                                        value={typeof section.gallery === 'string' ? section.gallery : JSON.stringify(section.gallery || [], null, 2)}
                                        onChange={(e) => updateSectionField(index, 'gallery', e.target.value)}
                                    />
                                </div>

                                <div>
                                    <MediaSelector
                                        media={section.media}
                                        onSelect={() => openMediaModal(index)}
                                        onRemove={() => updateSectionField(index, { media: null, media_id: null })}
                                    />
                                </div>
                            </div>
                        ))}

                        <Button type="button" onClick={addSection} variant="outline" className="flex items-center gap-2">
                            <PlusCircleIcon className="h-5 w-5" /> Add Section
                        </Button>

                        <div className="flex gap-6">
                            <Button type="submit">Update Page</Button>
                        </div>
                    </div>

                    <MediaBrowserModal
                        actionType="edit"
                        isOpen={mediaModalOpen}
                        onClose={() => setMediaModalOpen(false)}
                        media={media}
                        onSelect={handleMediaSelect}
                    />
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
