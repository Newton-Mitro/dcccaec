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
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Programs', href: route('programs.index') },
        { title: program.name, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={program.name} />
            <div className="container-custom w-full space-y-6 p-6">
                <HeadingSmall title={program.name} description={program.slug} />

                {/* Top section: main image + summary info */}
                <div className="space-y-4">
                    {program.featured_image && (
                        <img
                            src={program.featured_image.url}
                            alt={program.name}
                            style={{
                                clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                            }}
                            className="float-left mt-2 mr-6 mb-4 h-72 w-72 border-6 bg-card object-cover transition-transform duration-300 group-hover:scale-105 md:h-96 md:w-96"
                        />
                    )}

                    <div className="text-gray-700 dark:text-gray-300">
                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Status</div>
                        <Badge variant={program.is_active ? 'default' : 'secondary'} className="mb-3 rounded-xl">
                            {program.is_active ? 'Active' : 'Inactive'}
                        </Badge>

                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">Featured</div>
                        <Badge variant={program.featured ? 'default' : 'secondary'} className="mb-3 rounded-xl">
                            {program.featured ? 'Yes' : 'No'}
                        </Badge>
                    </div>

                    {/* Excerpt and Objectives */}
                    {program.excerpt && <p className="text-gray-600 dark:text-gray-400">{program.excerpt}</p>}
                    {program.objectives && <p className="text-gray-600 dark:text-gray-400">Objectives: {program.objectives}</p>}

                    {/* Description */}
                    <div className="prose max-w-full dark:prose-invert" dangerouslySetInnerHTML={{ __html: program.description || '-' }} />

                    {/* Monthly Fees */}
                    {program.monthly_fee && Object.keys(program.monthly_fee).length > 0 && (
                        <div className="mt-4">
                            <h3 className="mb-2 font-semibold">Monthly Fees</h3>
                            <ul className="list-disc pl-6">
                                {Object.entries(program.monthly_fee).map(([level, fee]) => (
                                    <li key={level}>
                                        {level}: ${fee}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Extra Fees */}
                    <div className="mt-4 space-y-1">
                        {program.admission_form_fee && <p>Admission Form Fee: {program.admission_form_fee}</p>}
                        {program.admission_fee && <p>Admission Fee: {program.admission_fee}</p>}
                        {program.yearly_charge && <p>Yearly Charge: {program.yearly_charge}</p>}
                        {program.uniform_fee && <p>Uniform Fee: {program.uniform_fee}</p>}
                        {program.books_stationary_fee && <p>Books & Stationary Fee: {program.books_stationary_fee}</p>}
                        {program.khata_fee && <p>Khata Fee: {program.khata_fee}</p>}
                    </div>
                </div>

                {/* Gallery */}
                {program.gallery && program.gallery.length > 0 && (
                    <div className="clear-both">
                        <h3 className="my-6 font-semibold">Gallery</h3>
                        <div className="flex flex-wrap gap-2">
                            {program.gallery.map((attachment, idx) => (
                                <img
                                    key={idx}
                                    src={attachment?.media?.url || ''}
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
