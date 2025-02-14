import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';

interface HolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

export function HolidayModal({ isOpen, onClose, date }: HolidayModalProps) {
  const { holidays, addHoliday, deleteHoliday } = useStore();
  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  const existingHoliday = holidays.find(h => h.date === formattedDate);

  const handleToggleHoliday = () => {
    if (existingHoliday) {
      deleteHoliday(existingHoliday.id);
    } else {
      addHoliday({
        id: crypto.randomUUID(),
        date: formattedDate,
        name: 'HOLIDAY',
      });
    }
    onClose();
  };

  if (!isOpen || !date) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {existingHoliday ? 'Remove Holiday' : 'Mark as Holiday'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6 text-gray-600">
          {existingHoliday
            ? 'Are you sure you want to remove this holiday?'
            : 'Mark this date as a holiday? This will prevent any events from being added on this date.'}
        </p>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleToggleHoliday}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
              existingHoliday
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {existingHoliday ? 'Remove Holiday' : 'Mark as Holiday'}
          </button>
        </div>
      </div>
    </div>
  );
}