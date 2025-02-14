import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Calendar } from './components/Calendar';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 lg:pl-64">
        <Calendar />
      </main>
    </div>
  );
}

export default App;