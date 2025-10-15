import { Head } from '@inertiajs/react';
import { addDays, addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import { Event } from '../../types/event';
import PageBanner from './components/page-banner';

interface EventsPageProps {
    events: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(startMonth);
    const totalDays = endMonth.getDate();

    // Blank cells before the first day of the month
    const blanks: number[] = [];
    for (let i = 0; i < startMonth.getDay(); i++) {
        blanks.push(i);
    }

    // All days in the month
    const daysInMonth: Date[] = [];
    for (let i = 0; i < totalDays; i++) {
        daysInMonth.push(addDays(startMonth, i));
    }

    // Group events by date
    const eventsByDate: Record<string, Event[]> = {};
    events.forEach((event) => {
        const dateStr = format(new Date(event.start_date), 'yyyy-MM-dd');
        if (!eventsByDate[dateStr]) eventsByDate[dateStr] = [];
        eventsByDate[dateStr].push(event);
    });

    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <>
            <Head title="Upcoming Events" />
            <PageLayout>
                <PageBanner title="Upcoming Events" subtitle="Click on a date to view event details." />

                <div className="container-custom mx-auto my-16">
                    {/* Month navigation */}
                    <div className="mb-6 flex items-center justify-between text-center">
                        <button
                            onClick={prevMonth}
                            className="rounded-lg bg-muted px-3 py-1 text-sm font-medium text-foreground hover:bg-muted/70 dark:hover:bg-muted/50"
                        >
                            ← Previous
                        </button>
                        <h2 className="font-chewy text-3xl text-foreground">{format(currentMonth, 'MMMM yyyy')}</h2>
                        <button
                            onClick={nextMonth}
                            className="rounded-lg bg-muted px-3 py-1 text-sm font-medium text-foreground hover:bg-muted/70 dark:hover:bg-muted/50"
                        >
                            Next →
                        </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center">
                        {/* Weekday headers */}
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                            <div
                                key={day}
                                className={`font-semibold ${
                                    index === 5 || index === 6 ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground dark:text-muted-foreground'
                                }`}
                            >
                                {day}
                            </div>
                        ))}

                        {/* Blank cells */}
                        {blanks.map((_, idx) => (
                            <div key={`blank-${idx}`} className="min-h-[80px] border bg-card dark:bg-gray-900"></div>
                        ))}

                        {/* Days */}
                        {daysInMonth.map((day) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const dayEvents = eventsByDate[dateStr] || [];
                            const isWeekend = day.getDay() === 5 || day.getDay() === 6; // Friday & Saturday

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => dayEvents.length && setSelectedDate(dateStr)}
                                    className={`relative min-h-[80px] rounded-lg border p-1 transition-colors ${
                                        dayEvents.length
                                            ? 'cursor-pointer bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 dark:hover:bg-accent/30'
                                            : 'cursor-default bg-card hover:bg-muted/50 dark:bg-card dark:hover:bg-muted/10'
                                    } ${isWeekend ? 'bg-red-100 dark:bg-red-800' : ''}`}
                                >
                                    <span className={`font-semibold ${isWeekend ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
                                        {day.getDate()}
                                    </span>
                                    {dayEvents.length > 0 && (
                                        <span className="absolute inset-x-1 bottom-1 text-xs text-primary dark:text-accent">
                                            {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Modal for event details */}
                    {selectedDate && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl transition dark:bg-card">
                                <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                                    <h3 className="text-xl font-semibold text-foreground">Events on {format(new Date(selectedDate), 'PPP')}</h3>
                                    <button
                                        onClick={() => setSelectedDate(null)}
                                        className="rounded-full p-2 text-muted-foreground hover:bg-muted/30"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {eventsByDate[selectedDate]?.map((event) => (
                                        <div
                                            key={event.id}
                                            className="rounded-lg border border-border bg-background p-4 shadow-sm transition hover:shadow-md"
                                        >
                                            <h4 className="mb-2 text-lg font-semibold text-primary">{event.title}</h4>
                                            {event.featured_image?.url && (
                                                <img
                                                    src={event.featured_image.url}
                                                    alt={event.title}
                                                    className="mb-3 h-60 w-full rounded-md object-cover"
                                                />
                                            )}
                                            <div
                                                className="prose max-w-full dark:prose-invert"
                                                dangerouslySetInnerHTML={{ __html: event.description || '' }}
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                🗓 {format(new Date(event.start_date), 'PPP')}
                                                {event.end_date && ` - ${format(new Date(event.end_date), 'PPP')}`}
                                            </p>
                                            {event.location && <p className="text-sm text-muted-foreground">📍 {event.location}</p>}
                                            <p
                                                className={`text-sm font-medium ${
                                                    event.status === 'Active'
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}
                                            >
                                                {event.status}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </PageLayout>
        </>
    );
};

export default EventsPage;
