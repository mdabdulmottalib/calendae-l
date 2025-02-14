import { create } from 'zustand';
import type { Holiday, Person, VacationEvent } from '../types';

interface State {
  persons: Person[];
  events: VacationEvent[];
  holidays: Holiday[];
  selectedDate: Date;
  isSidebarOpen: boolean;
  selectedPersonIds: string[];
  addPerson: (person: Person) => void;
  updatePerson: (person: Person) => void;
  deletePerson: (id: string) => void;
  addEvent: (event: VacationEvent) => void;
  updateEvent: (event: VacationEvent) => void;
  deleteEvent: (id: string) => void;
  addHoliday: (holiday: Holiday) => void;
  deleteHoliday: (id: string) => void;
  setSelectedDate: (date: Date) => void;
  toggleSidebar: () => void;
  togglePersonFilter: (personId: string) => void;
}

export const useStore = create<State>((set) => ({
  persons: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      color: '#EF4444',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      color: '#3B82F6',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
  events: [],
  holidays: [],
  selectedDate: new Date(),
  isSidebarOpen: true,
  selectedPersonIds: [],
  addPerson: (person) => set((state) => ({ persons: [...state.persons, person] })),
  updatePerson: (person) => set((state) => ({
    persons: state.persons.map((p) => (p.id === person.id ? person : p)),
  })),
  deletePerson: (id) => set((state) => ({
    persons: state.persons.filter((p) => p.id !== id),
    events: state.events.filter((e) => e.personId !== id),
  })),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (event) => set((state) => ({
    events: state.events.map((e) => (e.id === event.id ? event : e)),
  })),
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter((e) => e.id !== id),
  })),
  addHoliday: (holiday) => set((state) => ({ holidays: [...state.holidays, holiday] })),
  deleteHoliday: (id) => set((state) => ({
    holidays: state.holidays.filter((h) => h.id !== id),
  })),
  setSelectedDate: (date) => set({ selectedDate: date }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  togglePersonFilter: (personId) => set((state) => ({
    selectedPersonIds: state.selectedPersonIds.includes(personId)
      ? state.selectedPersonIds.filter((id) => id !== personId)
      : [...state.selectedPersonIds, personId],
  })),
}));