import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import PageLayout from '../../layouts/page-layout';
import { Event } from '../../types/event';
import PageBanner from './components/page-banner';

interface EventsPageProps {
    events: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
    return (
        <>
            <Head title="Upcoming Events" />
            <PageLayout>
                {/* Hero */}
                <PageBanner title="Upcoming Events" subtitle="Discover our events and explore the possibilities." />

                <div className="container-custom mx-auto px-4 sm:px-6 md:px-6">
                    {/* Events Grid */}
                    {events.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
                                >
                                    {/* Thumbnail */}
                                    {event.media?.url ? (
                                        <img src={event.media.url} alt={event.title} className="h-48 w-full object-cover" />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                                    )}

                                    {/* Card Content */}
                                    <div className="flex flex-1 flex-col p-4">
                                        <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-foreground">{event.title}</h2>

                                        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                                            {event.description || 'No description available.'}
                                        </p>

                                        {/* Meta Info */}
                                        <div className="mb-4 text-sm text-muted-foreground">
                                            {event.start_date && (
                                                <p>
                                                    🗓 {format(new Date(event.start_date), 'PPP')}
                                                    {event.end_date && ` - ${format(new Date(event.end_date), 'PPP')}`}
                                                </p>
                                            )}
                                            {event.location && <p>📍 {event.location}</p>}
                                        </div>

                                        {/* Status */}
                                        <p className={`mb-4 text-sm font-medium ${event.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                                            {event.status}
                                        </p>

                                        {/* CTA */}
                                        <div className="mt-auto">
                                            <Link
                                                href={route('site.events.show', event.id)}
                                                className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/80"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <section className="my-36 text-center">
                            <div className="container-custom mx-auto px-4 sm:px-6 md:px-6">
                                <div className="">
                                    <h3 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">No Events Yet 📢</h3>
                                    <p className="text-gray-500 dark:text-gray-400">No events available at the moment.</p>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </PageLayout>
        </>
    );
};

export default EventsPage;
