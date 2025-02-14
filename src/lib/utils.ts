import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { addDays, eachDayOfInterval, endOfMonth, format, startOfMonth, startOfWeek } from 'date-fns';
import type { CalendarDay, Location } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const locationColors: Record<Location, { bg: string; text: string }> = {
  'south-miami': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'calle-ocho': { bg: 'bg-orange-100', text: 'text-orange-700' },
  'bird-road': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'doral': { bg: 'bg-green-100', text: 'text-green-700' },
  'remote': { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export function getCalendarDays(date: Date): CalendarDay[] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 }); // Monday start
  const end = endOfMonth(date);
  
  return eachDayOfInterval({ start, end }).map(day => ({
    date: day,
    isCurrentMonth: format(day, 'M') === format(date, 'M'),
    isToday: format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
    events: [],
  }));
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}