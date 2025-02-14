import React from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { addMonths, format, subMonths, isSameDay, isWithinInterval, parseISO } from 'date-fns';
import { useStore } from '../store/useStore';
import { cn, getCalendarDays, locationColors } from '../lib/utils';
import { EventModal } from './EventModal';
import { HolidayModal } from './HolidayModal';

export function Calendar() {
  const { selectedDate, setSelectedDate, events, holidays, persons, selectedPersonIds, togglePersonFilter } = useStore();
  const [isEventModalOpen, setIsEventModalOpen] = React.useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<undefined | any>(undefined);
  const [selectedHolidayDate, setSelectedHolidayDate] = React.useState<Date | null>(null);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const days = getCalendarDays(selectedDate);

  const handlePreviousMonth = () => setSelectedDate(subMonths(selectedDate, 1));
  const handleNextMonth = () => setSelectedDate(addMonths(selectedDate, 1));
  const handleToday = () => setSelectedDate(new Date());

  const filteredEvents = events.filter((event) => 
    selectedPersonIds.length === 0 || selectedPersonIds.includes(event.personId)
  );

  const getEventsForDay = (date: Date) => {
    return filteredEvents.filter((event) => {
      const start = parseISO(event.startDate);
      const end = parseISO(event.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  return (
    <div className="flex-1 p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <div className="space-x-2">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleToday}
              className="rounded-md bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Today
            </button>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center space-x-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
              <h3 className="mb-2 font-medium">Filter by Person</h3>
              {persons.map((person) => (
                <label key={person.id} className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    checked={selectedPersonIds.includes(person.id)}
                    onChange={() => togglePersonFilter(person.id)}
                    className="rounded border-gray-300"
                  />
                  <span style={{ color: person.color }}>{person.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div
            key={day}
            className="bg-white py-2 text-center font-semibold text-gray-900"
          >
            {day}
          </div>
        ))}
        {days.map((day, dayIdx) => {
          const dayEvents = getEventsForDay(day.date);
          const holiday = holidays.find((h) => isSameDay(parseISO(h.date), day.date));

          return (
            <div
              key={dayIdx}
              onClick={() => {
                if (holiday) {
                  setSelectedHolidayDate(day.date);
                  setIsHolidayModalOpen(true);
                } else {
                  setSelectedEvent(undefined);
                  setIsEventModalOpen(true);
                }
              }}
              className={cn(
                'min-h-[120px] bg-white px-3 py-2',
                !day.isCurrentMonth && 'text-gray-400',
                day.isToday && 'font-semibold text-blue-600',
                holiday ? 'bg-holiday-green-bg cursor-pointer' : 'cursor-pointer hover:bg-gray-50'
              )}
            >
              <div className="flex justify-between items-center">
                <time dateTime={format(day.date, 'yyyy-MM-dd')}>
                  {format(day.date, 'd')}
                </time>
                {!holiday && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHolidayDate(day.date);
                      setIsHolidayModalOpen(true);
                    }}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    +Holiday
                  </button>
                )}
              </div>
              
              {holiday ? (
                <div className="mt-1 rounded bg-holiday-green-bg px-2 py-1 text-xs font-medium text-holiday-green-text">
                  HOLIDAY
                </div>
              ) : (
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => {
                    const person = persons.find((p) => p.id === event.personId);
                    const location = locationColors[event.location];
                    
                    return (
                      <button
                        key={event.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          setIsEventModalOpen(true);
                        }}
                        className={cn(
                          'block w-full rounded px-2 py-1 text-left text-xs',
                          location.bg
                        )}
                        style={{ color: person?.color }}
                      >
                        {person?.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setSelectedEvent(undefined);
        }}
        selectedDate={selectedDate}
        event={selectedEvent}
      />

      <HolidayModal
        isOpen={isHolidayModalOpen}
        onClose={() => {
          setIsHolidayModalOpen(false);
          setSelectedHolidayDate(null);
        }}
        date={selectedHolidayDate}
      />
    </div>
  );
}