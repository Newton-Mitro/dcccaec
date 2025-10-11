import { Head } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
import { Badge } from '../../components/ui/badge';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Program } from '../../types/program';

interface Props {
    program: Program;
}

export default function Show({ program }: Props) {
    console.log(program);
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Programs', href: route('programs.index') },
        { title: program.title, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={program.title} />
            <div className="container-custom w-full space-y-6 p-6">
                <HeadingSmall title={program.title} description={program.slug} />

                {/* Top section: main image + summary info */}
                <div className="space-y-4">
                    {program.media && (
                        <img
                            src={program.media.url}
                            alt={program.title}
                            style={{
                                clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                            }}
                            className="float-left mt-2 mr-6 mb-4 h-72 w-72 border-6 bg-card object-cover transition-transform duration-300 group-hover:scale-105 md:h-96 md:w-96"
                        />
                    )}

                    <div className="text-gray-700 dark:text-gray-300">
                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Status</div>
                        <div className="">
                            <Badge variant={program.status === 'Active' ? 'default' : 'secondary'} className="mb-3 rounded-xl">
                                {program.status}
                            </Badge>
                        </div>
                    </div>

                    <div
                        className="prose prose-sm max-w-none text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                        dangerouslySetInnerHTML={{ __html: program.description || '-' }}
                    />
                </div>

                {/* Icon Media */}
                {program.icon_media && (
                    <div className="mt-4">
                        <h3 className="mb-2 font-semibold">Icon</h3>
                        <img src={program.icon_media.url} alt="Icon" className="h-24 w-24 rounded object-cover" />
                    </div>
                )}

                {/* Gallery */}
                {program.gallery && program.gallery.length > 0 && (
                    <div className="clear-both">
                        <h3 className="my-6 font-semibold">Gallery</h3>
                        <div className="flex flex-wrap gap-2">
                            {program.gallery.map((url, idx) => (
                                <img
                                    key={idx}
                                    src={url}
                                    alt={`Gallery ${idx}`}
                                    className="h-40 w-40 rounded object-cover"
                                    style={{
                                        clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
