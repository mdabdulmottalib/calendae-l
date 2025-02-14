import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Person } from '../types';

interface PersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person?: Person;
}

export function PersonModal({ isOpen, onClose, person }: PersonModalProps) {
  const { addPerson, updatePerson, deletePerson } = useStore();
  const [formData, setFormData] = React.useState<Partial<Person>>({
    name: person?.name || '',
    email: person?.email || '',
    color: person?.color || '#000000',
    imageUrl: person?.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (person) {
      updatePerson({
        ...person,
        ...formData as Person,
      });
    } else {
      addPerson({
        id: crypto.randomUUID(),
        ...formData as Person,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (person) {
      deletePerson(person.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {person ? 'Edit Person' : 'New Person'}
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
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              type="color"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="mt-1 h-10 w-full rounded-md border border-gray-300 p-1"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {person && (
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
              {person ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}