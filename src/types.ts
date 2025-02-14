export interface Person {
  id: string;
  name: string;
  email: string;
  color: string;
  imageUrl: string;
}

export interface VacationEvent {
  id: string;
  personId: string;
  startDate: string;
  endDate: string;
  location: Location;
}

export type Location = 'south-miami' | 'calle-ocho' | 'bird-road' | 'doral' | 'remote';

export interface Holiday {
  id: string;
  date: string;
  name: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: VacationEvent[];
  holiday?: Holiday;
}