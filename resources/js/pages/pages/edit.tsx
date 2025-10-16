import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/text-area';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { ResourceMedia } from '../../types/gallery';
import { Media } from '../../types/media';
import { Page } from '../../types/page';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    page: Page;
    media: PaginatedData<Media>;
}

const Edit: React.FC<EditProps> = ({ page, media }) => {
    const [formData, setFormData] = useState({
        title: page.title || '',
        subtitle: page.subtitle || '',
        slug: page.slug || '',
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
        content: page.content || '',
        excerpt: page.excerpt || '',
        json_array: page.json_array ? JSON.stringify(page.json_array, null, 2) : '',
        button_text: page.button_text || '',
        button_link: page.button_link || '',
        media_id: page.media_id || null,
        gallery_ids: page.gallery?.map((g: ResourceMedia) => g?.media?.id) || [],
        predefined: page.predefined ?? false,
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(page.featured_image || null);
    const [galleryItems, setGalleryItems] = useState<ResourceMedia[]>(page.gallery || []);
    const [errors, setErrors] = useState<any>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'featured' | 'gallery'>('featured'); // ✅ track which modal mode

    const handleChange = (key: string, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/admin/pages/${page.id}`, formData, {
            preserveScroll: true,
            onSuccess: () => toast.success('Page updated successfully!'),
            onError: (err) => {
                setErrors(err);
                toast.error('Error updating page. Please try again.');
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '/admin/pages' },
        { title: 'Edit Page', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Page" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Page" description="Modify page details and content" />

                <form onSubmit={handleSubmit} className="space-y-6 md:w-4xl">
                    <div className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                        {/* --- Basic Info --- */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label>Title</Label>
                                <Input value={formData.title} onChange={(e) => handleChange('title', e.target.value)} placeholder="Page title" />
                                <InputError message={errors.title} />
                            </div>

                            <div>
                                <Label>Slug</Label>
                                <Input value={formData.slug} onChange={(e) => handleChange('slug', e.target.value)} placeholder="unique-page-slug" />
                                <InputError message={errors.slug} />
                            </div>

                            <div>
                                <Label>Subtitle</Label>
                                <Input
                                    value={formData.subtitle}
                                    onChange={(e) => handleChange('subtitle', e.target.value)}
                                    placeholder="Optional subtitle"
                                />
                                <InputError message={errors.subtitle} />
                            </div>

                            <div>
                                <Label>Meta Title</Label>
                                <Input
                                    value={formData.meta_title}
                                    onChange={(e) => handleChange('meta_title', e.target.value)}
                                    placeholder="SEO title"
                                />
                                <InputError message={errors.meta_title} />
                            </div>

                            <div className="md:col-span-2">
                                <Label>Meta Description</Label>
                                <Textarea
                                    value={formData.meta_description}
                                    onChange={(e) => handleChange('meta_description', e.target.value)}
                                    rows={3}
                                />
                                <InputError message={errors.meta_description} />
                            </div>

                            <div className="md:col-span-2">
                                <Label>Meta Keywords</Label>
                                <Input
                                    value={formData.meta_keywords}
                                    onChange={(e) => handleChange('meta_keywords', e.target.value)}
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                                <InputError message={errors.meta_keywords} />
                            </div>
                        </div>

                        {/* --- Content --- */}
                        <div className="mt-4">
                            <Label>Content</Label>
                            <CKEditor
                                editor={ClassicEditor as any}
                                data={formData.content}
                                onChange={(_, editor) => handleChange('content', editor.getData())}
                            />
                            <InputError message={errors.content} />
                        </div>

                        {/* --- Excerpt --- */}
                        <div className="mt-4">
                            <Label>Excerpt</Label>
                            <Textarea rows={3} value={formData.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} />
                            <InputError message={errors.excerpt} />
                        </div>

                        {/* --- JSON Array --- */}
                        <div className="mt-4">
                            <Label>JSON Array</Label>
                            <Textarea
                                rows={5}
                                value={formData.json_array}
                                onChange={(e) => handleChange('json_array', e.target.value)}
                                placeholder='[{"title":"Example","subtitle":"Example Subtitle"}]'
                            />
                            <InputError message={errors.json_array} />
                        </div>

                        {/* --- Button --- */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label>Button Text</Label>
                                <Input
                                    value={formData.button_text}
                                    onChange={(e) => handleChange('button_text', e.target.value)}
                                    placeholder="e.g. Learn More"
                                />
                                <InputError message={errors.button_text} />
                            </div>
                            <div>
                                <Label>Button Link</Label>
                                <Input
                                    value={formData.button_link}
                                    onChange={(e) => handleChange('button_link', e.target.value)}
                                    placeholder="https://example.com"
                                />
                                <InputError message={errors.button_link} />
                            </div>
                        </div>

                        {/* --- Featured Image --- */}
                        <div className="mt-4">
                            <MediaSelector
                                label="Featured Image"
                                media={selectedMedia}
                                onSelect={() => {
                                    setModalMode('featured');
                                    setIsModalOpen(true);
                                }}
                                onRemove={() => {
                                    setSelectedMedia(null);
                                    handleChange('media_id', null);
                                }}
                                error={errors.media_id}
                            />
                        </div>

                        {/* --- Gallery Images --- */}
                        <div className="mt-6">
                            <Label>Gallery Images</Label>
                            <div className="mt-2 flex flex-wrap gap-3">
                                {galleryItems.map((item) => (
                                    <div key={item.id} className="group relative">
                                        <img
                                            src={item?.media?.url}
                                            alt={item?.media?.alt_text || 'Gallery Image'}
                                            className="h-24 w-24 rounded-md border object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = galleryItems.filter((m) => m.id !== item.id);
                                                setGalleryItems(updated);
                                                handleChange(
                                                    'gallery_ids',
                                                    updated.map((i) => i?.media?.id),
                                                );
                                            }}
                                            className="absolute -top-2 -right-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setModalMode('gallery');
                                        setIsModalOpen(true);
                                    }}
                                >
                                    + Add Images
                                </Button>
                            </div>
                            <InputError message={errors.gallery_ids} />
                        </div>

                        {/* --- Predefined Toggle --- */}
                        <div className="mt-4 flex items-center gap-2">
                            <input type="checkbox" checked={formData.predefined} onChange={(e) => handleChange('predefined', e.target.checked)} />
                            <Label>Predefined Page</Label>
                        </div>

                        {/* --- Submit --- */}
                        <div className="mt-6 flex gap-4">
                            <Button type="submit">Update Page</Button>
                        </div>
                    </div>
                </form>
            </div>

            <MediaBrowserModal
                actionType="edit"
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                media={media}
                onSelect={(m) => {
                    if (modalMode === 'featured') {
                        setSelectedMedia(m);
                        handleChange('media_id', m.id);
                    } else {
                        const newMedia: ResourceMedia = {
                            id: m.id,
                            media_id: m.id,
                            gallery_id: 0,
                            media: m,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString(),
                        };
                        const tempGalleryItems = [...galleryItems, newMedia];
                        setGalleryItems(tempGalleryItems);
                        handleChange(
                            'gallery_ids',
                            tempGalleryItems.map((i) => i?.media?.id),
                        );
                    }
                    setIsModalOpen(false);
                }}
            />
        </AppLayout>
    );
};

export default Edit;
