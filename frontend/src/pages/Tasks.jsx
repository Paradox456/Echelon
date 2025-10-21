import { useEffect, useState } from "react";
import { fetchFromAPI } from "../api"; // assumes you created api.js earlier
import { Plus, CheckCircle2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all tasks
  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      try {
        const data = await fetchFromAPI("/api/tasks");
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  // ✅ Add new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const added = await fetchFromAPI("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title: newTask }),
      });
      setTasks([...tasks, added]);
      setNewTask("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // ✅ Mark as complete
  const handleComplete = async (id) => {
    try {
      const updated = await fetchFromAPI(`/api/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: true }),
      });
      setTasks(tasks.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // ✅ Delete task
  const handleDelete = async (id) => {
    try {
      await fetchFromAPI(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 Tasks</h1>

      {/* New Task Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 border rounded-xl p-2 focus:ring focus:ring-blue-300 outline-none"
        />
        <Button onClick={handleAddTask} className="flex items-center gap-1">
          <Plus size={18} /> Add
        </Button>
      </div>

      {/* Task List */}
      {loading ? (
        <div className="flex justify-center items-center h-24">
          <Loader2 className="animate-spin text-gray-500" size={24} />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks yet. Add one above!</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card
              key={task._id}
              className={`border rounded-2xl shadow-sm transition ${
                task.completed ? "opacity-60" : ""
              }`}
            >
              <CardContent className="flex justify-between items-center p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    size={22}
                    className={`cursor-pointer ${
                      task.completed ? "text-green-500" : "text-gray-400"
                    }`}
                    onClick={() => handleComplete(task._id)}
                  />
                  <span
                    className={`text-lg ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <Trash2
                  size={20}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleDelete(task._id)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
