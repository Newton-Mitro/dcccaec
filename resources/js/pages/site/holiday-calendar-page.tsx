import { Head } from '@inertiajs/react';
import { addDays, addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import PageBanner from './components/page-banner';

// 🇧🇩 Bangladesh Government Holidays
const holidays = [
    { date: '2025-02-21', title: 'International Mother Language Day', description: 'Commemorates the martyrs of the Bengali Language Movement.' },
    {
        date: '2025-03-17',
        title: "Father of the Nation's Birthday",
        description: 'Bangabandhu Sheikh Mujibur Rahman’s birthday — also National Children’s Day.',
    },
    { date: '2025-03-26', title: 'Independence Day', description: 'Celebrating Bangladesh’s independence from Pakistan in 1971.' },
    { date: '2025-04-14', title: 'Pohela Boishakh', description: 'Traditional celebration of the Bengali New Year.' },
    { date: '2025-05-01', title: 'International Workers’ Day', description: 'Honoring the labor movement and workers’ rights worldwide.' },
    { date: '2025-08-15', title: 'National Mourning Day', description: 'Honoring the memory of Bangabandhu Sheikh Mujibur Rahman.' },
    { date: '2025-12-16', title: 'Victory Day', description: 'Commemorating Bangladesh’s victory in the Liberation War of 1971.' },
];

const HolidayCalendarPage: React.FC = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const startMonth = startOfMonth(currentMonth);
    const endMonth = endOfMonth(startMonth);

    // Generate all days in the month
    const daysInMonth: Date[] = [];
    for (let i = 0; i < endMonth.getDate(); i++) {
        daysInMonth.push(addDays(startMonth, i));
    }

    // Group holidays by date
    const holidaysByDate: Record<string, typeof holidays> = {};
    holidays.forEach((holiday) => {
        if (!holidaysByDate[holiday.date]) holidaysByDate[holiday.date] = [];
        holidaysByDate[holiday.date].push(holiday);
    });

    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

    return (
        <>
            <Head title="Holiday Calendar" />
            <PageLayout>
                <PageBanner title="Government Holidays" subtitle="Stay updated with all national and cultural holidays throughout the year." />

                <div className="container-custom mx-auto my-16">
                    {/* Header with month navigation */}
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
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                            <div key={d} className="font-semibold text-muted-foreground dark:text-muted-foreground">
                                {d}
                            </div>
                        ))}

                        {daysInMonth.map((day) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const dayHolidays = holidaysByDate[dateStr] || [];

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => dayHolidays.length && setSelectedDate(dateStr)}
                                    className={`relative min-h-[80px] rounded-lg border p-1 transition-colors ${
                                        dayHolidays.length
                                            ? 'cursor-pointer bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 dark:hover:bg-accent/30'
                                            : 'cursor-default bg-card hover:bg-muted/50 dark:bg-card dark:hover:bg-muted/10'
                                    }`}
                                >
                                    <span className="font-semibold text-foreground">{day.getDate()}</span>
                                    {dayHolidays.length > 0 && (
                                        <span className="absolute inset-x-1 bottom-1 text-xs text-primary dark:text-accent">
                                            {dayHolidays.length} holiday{dayHolidays.length > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Modal for Holiday Details */}
                    {selectedDate && (
                        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
                            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-xl transition dark:bg-card">
                                <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
                                    <h3 className="text-xl font-semibold text-foreground">Holidays on {format(new Date(selectedDate), 'PPP')}</h3>
                                    <button
                                        onClick={() => setSelectedDate(null)}
                                        className="rounded-full p-2 text-muted-foreground hover:bg-muted/30"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {holidaysByDate[selectedDate]?.map((holiday, index) => (
                                        <div
                                            key={index}
                                            className="rounded-lg border border-border bg-background p-4 shadow-sm transition hover:shadow-md"
                                        >
                                            <h4 className="mb-2 text-lg font-semibold text-primary">{holiday.title}</h4>
                                            <p className="text-sm text-muted-foreground">{holiday.description}</p>
                                            <p className="mt-2 text-sm text-muted-foreground">📅 {format(new Date(holiday.date), 'PPP')}</p>
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

export default HolidayCalendarPage;
