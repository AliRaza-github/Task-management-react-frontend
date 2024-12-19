import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800 ">
        <header className="bg-blue-500 text-white py-4 text-center">
          <h1 className="text-2xl font-bold">Task Management System</h1>
        </header>
        <main className="p-4">
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
