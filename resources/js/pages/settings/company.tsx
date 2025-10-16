import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import MediaBrowserModal from '@/pages/media/media_browser_modal';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FolderOpen, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function CompanySettings() {
    const { settings, media } = usePage<SharedData>().props as any;
    const notify = () => toast.success('Settings have been updated successfully.');

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        site_name: settings.site_name || '',
        site_email: settings.site_email || '',
        site_logo: settings.site_logo || null,
        site_favicon: settings.site_favicon || null,
        maintenance_mode: settings.maintenance_mode === '1',
        meta_title: settings.meta_title || '',
        meta_description: settings.meta_description || '',
        facebook: settings.facebook || '',
        twitter: settings.twitter || '',
        instagram: settings.instagram || '',
        linkedin: settings.linkedin || '',
        youtube: settings.youtube || '',
        contact_address: settings.contact_address || '',
        contact_phone: settings.contact_phone || '',
        contact_email: settings.contact_email || '',
    });

    // Modal state
    const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
    const [isFaviconModalOpen, setIsFaviconModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('settings.company.update'), { preserveScroll: true, onSuccess: notify });
    };

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Company Settings', href: '/settings/company' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company Settings" />

            <SettingsLayout>
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* ================= General ================= */}
                    <div className="space-y-3">
                        <HeadingSmall title="General" description="Basic site configuration" />

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {/* Site Name */}
                            <div className="space-y-1.5">
                                <Label htmlFor="site_name">Site Name</Label>
                                <Input
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={(e) => setData('site_name', e.target.value)}
                                    placeholder="Enter site name"
                                />
                                <InputError message={errors.site_name} />
                            </div>

                            {/* Site Email */}
                            <div className="space-y-1.5">
                                <Label htmlFor="site_email">Site Email</Label>
                                <Input
                                    id="site_email"
                                    type="email"
                                    value={data.site_email}
                                    onChange={(e) => setData('site_email', e.target.value)}
                                    placeholder="Enter site email"
                                />
                                <InputError message={errors.site_email} />
                            </div>

                            {/* Maintenance Mode */}
                            <div className="flex items-center gap-2 pt-4">
                                <input
                                    id="maintenance_mode"
                                    type="checkbox"
                                    checked={data.maintenance_mode}
                                    onChange={(e) => setData('maintenance_mode', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <Label htmlFor="maintenance_mode" className="font-medium">
                                    Maintenance Mode
                                </Label>
                                <InputError message={errors.maintenance_mode} />
                            </div>

                            {/* Site Logo */}
                            <div className="space-y-1.5">
                                <Label>Site Logo</Label>
                                <div className="flex items-center gap-3">
                                    {data.site_logo ? (
                                        <div className="relative">
                                            <img src={data.site_logo} alt="Logo" className="h-16 w-16 rounded border object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData('site_logo', null);
                                                }}
                                                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded border border-dashed">
                                            <span className="text-xs text-gray-400">No logo</span>
                                        </div>
                                    )}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setIsLogoModalOpen(true)}
                                        className="flex items-center gap-1"
                                    >
                                        <FolderOpen size={16} /> Browse
                                    </Button>
                                </div>
                                <InputError message={errors.site_logo} />
                            </div>
                        </div>
                    </div>

                    {/* ================= Social Links ================= */}
                    <div className="space-y-3">
                        <HeadingSmall title="Social Links" description="Connect your social media" />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((key) => (
                                <div key={key} className="space-y-1.5">
                                    <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                                    <Input
                                        id={key}
                                        value={data[key]}
                                        onChange={(e) => setData(key, e.target.value)}
                                        placeholder={`Enter ${key} URL`}
                                    />
                                    <InputError message={errors[key]} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= Contact Info ================= */}
                    <div className="space-y-3">
                        <HeadingSmall title="Contact Info" description="Manage contact details" />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                            {[
                                ['contact_address', 'Address', 'Enter address'],
                                ['contact_phone', 'Phone', 'Enter phone number'],
                                ['contact_email', 'Email', 'Enter email'],
                            ].map(([id, label, placeholder]) => (
                                <div key={id} className="space-y-1.5">
                                    <Label htmlFor={id}>{label}</Label>
                                    <Input id={id} value={data[id]} onChange={(e) => setData(id, e.target.value)} placeholder={placeholder} />
                                    <InputError message={errors[id]} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= Save ================= */}
                    <div className="flex items-center gap-4 pt-4">
                        <Button disabled={processing}>Save Changes</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved successfully</p>
                        </Transition>
                    </div>
                </form>
            </SettingsLayout>

            {/* Modals */}
            <MediaBrowserModal
                isOpen={isLogoModalOpen}
                onClose={() => setIsLogoModalOpen(false)}
                media={media}
                onSelect={(m) => {
                    setData('site_logo', m.url);
                    setIsLogoModalOpen(false);
                }}
                actionType="company"
            />
            <MediaBrowserModal
                isOpen={isFaviconModalOpen}
                onClose={() => setIsFaviconModalOpen(false)}
                media={media}
                onSelect={(m) => {
                    setData('site_favicon', m.url);
                    setIsFaviconModalOpen(false);
                }}
                actionType="company"
            />
        </AppLayout>
    );
}
