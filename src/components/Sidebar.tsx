import React from 'react';
import { ChevronLeft, LogOut, Menu, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { PersonModal } from './PersonModal';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar, persons } = useStore();
  const [isPersonModalOpen, setIsPersonModalOpen] = React.useState(false);
  const [selectedPerson, setSelectedPerson] = React.useState<undefined | any>(undefined);
  const currentUser = persons[0]; // For demo purposes, using first person as current user

  return (
    <>
      <button
        type="button"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.imageUrl}
                alt={currentUser.name}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h3 className="font-medium">{currentUser.name}</h3>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 space-y-1 p-4">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Persons</h2>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPerson(undefined);
                    setIsPersonModalOpen(true);
                  }}
                  className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Add Person
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {persons.map((person) => (
                  <button
                    key={person.id}
                    onClick={() => {
                      setSelectedPerson(person);
                      setIsPersonModalOpen(true);
                    }}
                    className="flex w-full items-center space-x-3 rounded-md p-2 hover:bg-gray-100"
                  >
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.email}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-4">
            <button
              type="button"
              className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <PersonModal
        isOpen={isPersonModalOpen}
        onClose={() => {
          setIsPersonModalOpen(false);
          setSelectedPerson(undefined);
        }}
        person={selectedPerson}
      />
    </>
  );
}