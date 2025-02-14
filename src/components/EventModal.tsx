import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import { useStore } from '../store/useStore';
import type { VacationEvent, Location } from '../types';
import { locationColors } from '../lib/utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  event?: VacationEvent;
}

export function EventModal({ isOpen, onClose, selectedDate, event }: EventModalProps) {
  const { persons, addEvent, updateEvent, deleteEvent } = useStore();
  const [formData, setFormData] = React.useState<Partial<VacationEvent>>({
    personId: event?.personId || persons[0]?.id,
    startDate: event?.startDate || format(selectedDate, 'yyyy-MM-dd'),
    endDate: event?.endDate || format(selectedDate, 'yyyy-MM-dd'),
    location: event?.location || 'south-miami',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      updateEvent({
        ...event,
        ...formData as VacationEvent,
      });
    } else {
      addEvent({
        id: crypto.randomUUID(),
        ...formData as VacationEvent,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (event) {
      deleteEvent(event.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {event ? 'Edit Event' : 'New Event'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Person
            </label>
            <select
              value={formData.personId}
              onChange={(e) => setFormData({ ...formData, personId: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {persons.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(Object.keys(locationColors) as Location[]).map((location) => (
                <label
                  key={location}
                  className={`flex cursor-pointer items-center rounded-md border p-2 ${
                    formData.location === location
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={formData.location === location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value as Location })
                    }
                    className="sr-only"
                  />
                  <span className="ml-2 capitalize">
                    {location.replace('-', ' ')}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {event && (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
              >
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {event ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}