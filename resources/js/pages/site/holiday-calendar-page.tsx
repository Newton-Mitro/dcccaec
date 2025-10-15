import { Head } from '@inertiajs/react';
import { addDays, addMonths, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import { Holiday } from '../../types/holiday';
import PageBanner from './components/page-banner';

interface HolidayCalendarPageProps {
    holidays: Holiday[];
}

const HolidayCalendarPage: React.FC<HolidayCalendarPageProps> = ({ holidays }) => {
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

    // Group holidays by date
    const holidaysByDate: Record<string, Holiday[]> = {};
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
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => {
                            const isWeekend = index === 5 || index === 6; // Friday & Saturday
                            return (
                                <div
                                    key={day}
                                    className={`font-semibold ${
                                        isWeekend ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground dark:text-muted-foreground'
                                    }`}
                                >
                                    {day}
                                </div>
                            );
                        })}

                        {/* Blank cells before first day */}
                        {blanks.map((_, idx) => (
                            <div key={`blank-${idx}`} className="min-h-[80px] border bg-card dark:bg-gray-900"></div>
                        ))}

                        {/* Days */}
                        {daysInMonth.map((day) => {
                            const dateStr = format(day, 'yyyy-MM-dd');
                            const dayHolidays = holidaysByDate[dateStr] || [];
                            const isWeekend = day.getDay() === 5 || day.getDay() === 6; // Friday & Saturday

                            return (
                                <button
                                    key={dateStr}
                                    onClick={() => dayHolidays.length && setSelectedDate(dateStr)}
                                    className={`relative min-h-[80px] rounded-lg border p-1 transition-colors ${
                                        dayHolidays.length
                                            ? 'cursor-pointer bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 dark:hover:bg-accent/30'
                                            : 'cursor-default bg-card hover:bg-muted/50 dark:bg-card dark:hover:bg-muted/10'
                                    } ${isWeekend ? 'bg-red-100 dark:bg-red-800' : ''}`}
                                >
                                    <span className={`font-semibold ${isWeekend ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
                                        {day.getDate()}
                                    </span>

                                    {/* Weekend label */}
                                    {isWeekend && (
                                        <span className="absolute top-1 right-1 rounded bg-red-200 px-1 text-[10px] font-medium text-red-800 dark:bg-red-700 dark:text-red-200">
                                            Weekend
                                        </span>
                                    )}

                                    {dayHolidays.length > 0 && (
                                        <span className="absolute inset-x-1 bottom-1 text-xs text-primary dark:text-accent">
                                            {dayHolidays.length} holiday{dayHolidays.length > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Modal for holiday details */}
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
                                            <div
                                                className="prose max-w-full dark:prose-invert"
                                                dangerouslySetInnerHTML={{ __html: holiday.description || '' }}
                                            />
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
