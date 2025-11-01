import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle, Clock, TrendingUp } from "lucide-react";
import "./Dashboard.css";

const Dashboard = () => {
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 || hour < 5) setGreeting("Good Evening");
  }, []);

  const stats = [
    { label: "Tasks Completed", value: 12, icon: <CheckCircle size={24} /> },
    { label: "Active Projects", value: 3, icon: <Activity size={24} /> },
    { label: "Focus Time (hrs)", value: 5.5, icon: <Clock size={24} /> },
    { label: "Productivity", value: "87%", icon: <TrendingUp size={24} /> },
  ];

  const activities = [
    { time: "10:30 AM", action: "Finished Sprint Planning" },
    { time: "9:00 AM", action: "Pushed commits to GitHub" },
    { time: "Yesterday", action: "Deployed new Echelon build" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 flex flex-col gap-10">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-6xl font-extrabold glow-pulse">
          {greeting}, Annafi!
        </h1>
        <p className="text-gray-400 text-lg">{new Date().toLocaleDateString()}</p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col gap-3 border border-gray-800"
          >
            <div className="flex items-center gap-3 text-indigo-400">
              {item.icon}
              <span className="text-xl font-semibold">{item.label}</span>
            </div>
            <h2 className="text-4xl font-bold mt-2">{item.value}</h2>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
          Recent Activity
        </h2>
        <ul className="space-y-3">
          {activities.map((a, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-800/40 p-3 rounded-xl hover:bg-gray-800/70 transition"
            >
              <span>{a.action}</span>
              <span className="text-sm text-gray-500">{a.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Dashboard;
