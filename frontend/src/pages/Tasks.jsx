import React, { useState } from 'react';
import { Plus, MoreVertical, LogOut } from 'lucide-react';

export default function Tasks({ onNavigateToHome }) {
  const [activeTab, setActiveTab] = useState('All');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Finish the Q1 project proposal and send it to the team',
      priority: 'high',
      category: 'work',
      dueDate: 'Oct 28',
      completed: false,
      icon: '⏱'
    },
    {
      id: 2,
      title: 'Team meeting preparation',
      description: "Prepare slides and agenda for Friday's team meeting",
      priority: 'urgent',
      category: 'work',
      dueDate: 'Oct 27',
      completed: false,
      icon: '◯'
    },
    {
      id: 3,
      title: 'Morning workout',
      description: '30 minutes cardio + strength training',
      priority: 'medium',
      category: 'health',
      dueDate: 'Oct 27',
      completed: true,
      icon: '✓'
    },
    {
      id: 4,
      title: 'Plan weekend trip',
      description: 'Book hotel and plan activities for the weekend getaway',
      priority: 'low',
      category: 'personal',
      dueDate: 'Oct 29',
      completed: false,
      icon: '◯'
    }
  ]);

  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'urgent':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-orange-600 text-white';
      case 'medium':
        return 'bg-amber-600 text-white';
      case 'low':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'All') return true;
    if (activeTab === 'To Do') return !task.completed;
    if (activeTab === 'In Progress') return !task.completed;
    if (activeTab === 'Completed') return task.completed;
    return true;
  });

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-xl font-bold shadow-lg shadow-cyan-500/50">
            E
          </div>
          <div>
            <h1 className="text-xl font-bold">Echelon</h1>
            <p className="text-xs text-slate-400">AI Productivity</p>
          </div>
        </div>
        <button 
          onClick={onNavigateToHome}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-2 font-medium shadow-lg shadow-cyan-500/40 transition hover:shadow-cyan-500/60"
        >
          <LogOut size={18} />
          Home
        </button>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold">Tasks</h2>
            <p className="mt-2 text-lg text-slate-300">Manage your to-dos and get things done</p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold shadow-lg shadow-blue-500/40 transition hover:shadow-blue-500/60">
            <Plus size={20} />
            New Task
          </button>
        </div>

        {/* Tabs and Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex gap-1 rounded-lg border border-slate-800 bg-slate-900 p-1">
            {['All', 'To Do', 'In Progress', 'Completed'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-md px-4 py-2 font-medium transition ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3">
            <button className="rounded-lg border border-slate-700 px-4 py-2 font-medium text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400">
              ⚙ Priority
            </button>
            <button className="rounded-lg border border-slate-700 px-4 py-2 font-medium text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400">
              ⚙ Category
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-500/50 hover:bg-cyan-500/5"
            >
              {/* Checkbox/Icon */}
              <button
                onClick={() => toggleTaskComplete(task.id)}
                className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center text-xl transition hover:text-cyan-400"
              >
                {task.completed ? (
                  <span className="text-green-500">✓</span>
                ) : (
                  <span className="text-slate-400">◯</span>
                )}
              </button>

              {/* Task Content */}
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${
                  task.completed ? 'line-through text-slate-500' : 'text-white'
                }`}>
                  {task.title}
                </h3>
                <p className="mt-1 text-slate-400">
                  {task.description}
                </p>
                
                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${getPriorityStyles(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="rounded-md border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-300">
                    {task.category}
                  </span>
                  <span className="rounded-md border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs font-medium text-slate-400">
                    📅 {task.dueDate}
                  </span>
                </div>
              </div>

              {/* Menu Button */}
              <button
                className="flex-shrink-0 text-slate-400 transition hover:text-slate-200"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 py-16 text-center">
            <p className="text-lg text-slate-400">No tasks yet</p>
            <p className="mt-2 text-slate-500">Create a new task to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}