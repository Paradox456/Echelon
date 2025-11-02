import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Plus, Edit, Trash, Check } from 'lucide-react';


const STORAGE_KEY = 'echelon:tasks:v1';

const priorityOrder = { high: 0, medium: 1, low: 2 };

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatDateISO(date) {
  if (!date) return '';
  try { return new Date(date).toISOString().slice(0, 10); } catch { return ''; }
}

export default function Tasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all / completed / pending
  const [sortBy, setSortBy] = useState('created'); // created / due / priority
  const [form, setForm] = useState({ title: '', notes: '', due: '', priority: 'medium' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Replace this with your API integration if you want cloud sync
  async function syncWithApi(updatedTasks) {
    // Example:
    // await fetch('/api/tasks/sync', { method: 'POST', body: JSON.stringify(updatedTasks) })
    return true;
  }

  function resetForm() {
    setForm({ title: '', notes: '', due: '', priority: 'medium' });
    setEditing(null);
  }

  function openNew() {
    resetForm();
    setShowForm(true);
  }

  function handleAddOrSave(e) {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editing) {
      setTasks(prev => {
        const next = prev.map(t => t.id === editing.id ? { ...t, ...form } : t);
        syncWithApi(next);
        return next;
      });
    } else {
      const newTask = {
        id: uid(),
        title: form.title.trim(),
        notes: form.notes || '',
        createdAt: new Date().toISOString(),
        due: form.due || null,
        priority: form.priority || 'medium',
        completed: false
      };
      setTasks(prev => {
        const next = [newTask, ...prev];
        syncWithApi(next);
        return next;
      });
    }

    resetForm();
    setShowForm(false);
  }

  function handleEdit(task) {
    setEditing(task);
    setForm({ title: task.title, notes: task.notes || '', due: task.due || '', priority: task.priority || 'medium' });
    setShowForm(true);
  }

  function handleDelete(id) {
    if (!confirm('Delete this task?')) return;
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      syncWithApi(next);
      return next;
    });
  }

  function toggleComplete(id) {
    setTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
      syncWithApi(next);
      return next;
    });
  }

  function filteredAndSorted() {
    const q = query.trim().toLowerCase();
    let out = tasks.filter(t => {
      if (filter === 'completed') return t.completed;
      if (filter === 'pending') return !t.completed;
      return true;
    }).filter(t => {
      if (!q) return true;
      return t.title.toLowerCase().includes(q) || (t.notes || '').toLowerCase().includes(q);
    });

    if (sortBy === 'due') {
      out.sort((a, b) => {
        if (!a.due && !b.due) return 0;
        if (!a.due) return 1;
        if (!b.due) return -1;
        return new Date(a.due) - new Date(b.due);
      });
    } else if (sortBy === 'priority') {
      out.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else { // created
      out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return out;
  }

  const list = filteredAndSorted();
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <p className="text-sm text-muted-foreground">Track tasks, set priorities, and focus your day.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <input
              className="input input-sm" 
              placeholder="Search tasks..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <select className="select select-sm" value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            <select className="select select-sm" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="created">Newest</option>
              <option value="due">Due Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <button className="btn btn-primary btn-sm flex items-center gap-2" onClick={openNew}>
            <Plus size={14} /> New
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{tasks.length} tasks — {completedCount} completed</div>
              <div className="text-sm">Progress: <strong>{tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0}%</strong></div>
            </div>

            <div className="bg-card p-4 rounded-lg shadow-sm">
              <AnimatePresence>
                {list.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 text-center text-sm text-muted-foreground">
                    No tasks found — add your first task.
                  </motion.div>
                )}

                <div className="space-y-2">
                  {list.map(task => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={`flex items-start gap-3 p-3 rounded-md border ${task.completed ? 'opacity-70 bg-success/5' : 'bg-background'}`}>

                      <button onClick={() => toggleComplete(task.id)} className="flex items-center justify-center w-8 h-8 rounded-md border">
                        {task.completed ? <Check size={16} /> : <div className="w-3 h-3 rounded-full bg-slate-400" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</div>
                            {task.notes && <div className="text-xs text-muted-foreground">{task.notes}</div>}
                          </div>

                          <div className="flex items-center gap-2">
                            {task.due && (
                              <div className="text-xs px-2 py-1 rounded-md border flex items-center gap-1"><CalendarDays size={14}/> <span>{task.due}</span></div>
                            )}

                            <div className={`text-xs px-2 py-1 rounded-md border ${task.priority === 'high' ? 'border-red-300' : task.priority === 'medium' ? 'border-yellow-300' : 'border-green-300'}`}>{task.priority}</div>

                            <button onClick={() => handleEdit(task)} className="p-1 rounded hover:bg-muted">
                              <Edit size={14} />
                            </button>

                            <button onClick={() => handleDelete(task.id)} className="p-1 rounded hover:bg-muted">
                              <Trash size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-card p-4 rounded-lg">
            <h3 className="text-sm font-medium">Quick Stats</h3>
            <div className="mt-2 text-sm text-muted-foreground">
              <div>All tasks: <strong>{tasks.length}</strong></div>
              <div>Completed: <strong>{completedCount}</strong></div>
              <div>High priority: <strong>{tasks.filter(t => t.priority === 'high').length}</strong></div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-lg">
            <h3 className="text-sm font-medium">Shortcuts</h3>
            <div className="mt-2 flex flex-col gap-2">
              <button className="btn btn-outline btn-sm" onClick={() => setFilter('all')}>Show All</button>
              <button className="btn btn-outline btn-sm" onClick={() => setFilter('pending')}>Pending</button>
              <button className="btn btn-outline btn-sm" onClick={() => setFilter('completed')}>Completed</button>
            </div>
          </div>
        </aside>
      </section>

      {/* Form modal / panel */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={() => { setShowForm(false); resetForm(); }} />
            <motion.form onSubmit={handleAddOrSave} layout className="relative w-full max-w-xl bg-card rounded-lg p-6 z-10 shadow-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">{editing ? 'Edit Task' : 'New Task'}</h4>
                <div className="flex items-center gap-2">
                  <button type="button" className="btn btn-ghost" onClick={() => { setShowForm(false); resetForm(); }}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Save</button>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-sm block mb-1">Title</label>
                  <input value={form.title} onChange={e => setForm(s => ({ ...s, title: e.target.value }))} className="input w-full" placeholder="What do you want to get done?" />
                </div>

                <div>
                  <label className="text-sm block mb-1">Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(s => ({ ...s, notes: e.target.value }))} className="textarea w-full" rows={3} placeholder="Optional notes or context" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm block mb-1">Due date</label>
                    <input type="date" value={form.due} onChange={e => setForm(s => ({ ...s, due: e.target.value }))} className="input w-full" />
                  </div>

                  <div>
                    <label className="text-sm block mb-1">Priority</label>
                    <select value={form.priority} onChange={e => setForm(s => ({ ...s, priority: e.target.value }))} className="select w-full">
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
