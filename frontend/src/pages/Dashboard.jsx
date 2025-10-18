import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle, Brain, Menu } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: sidebarOpen ? 240 : 80, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800 flex flex-col items-center p-4 space-y-6"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-400 hover:text-white mb-6"
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col items-center space-y-6">
          <SidebarIcon icon={<CheckCircle />} label="Tasks" open={sidebarOpen} />
          <SidebarIcon icon={<Brain />} label="AI Insights" open={sidebarOpen} />
          <SidebarIcon icon={<BarChart3 />} label="Analytics" open={sidebarOpen} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 bg-gray-800 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Echelon Dashboard</h1>
          <p className="text-gray-400">Welcome back 👋</p>
        </header>

        {/* Stats Section */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Tasks Completed" value="42" />
            <StatCard title="Active Habits" value="5" />
            <StatCard title="AI Insights Generated" value="3" />
          </div>

          {/* Chart Section */}
          <div className="mt-10 bg-gray-800 rounded-xl p-6 h-80 flex flex-col items-center justify-center border border-gray-700">
            <h2 className="text-xl font-semibold mb-2">Progress Overview</h2>
            <p className="text-gray-500">Chart placeholder — coming soon 📊</p>
          </div>
        </main>
      </div>
    </div>
  );
};

// Sidebar Icon Component
const SidebarIcon = ({ icon, label, open }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="flex items-center cursor-pointer space-x-3"
  >
    <div className="text-blue-400">{icon}</div>
    {open && <span className="text-gray-300 text-sm">{label}</span>}
  </motion.div>
);

// Stat Card Component
const StatCard = ({ title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center shadow-lg"
  >
    <h3 className="text-gray-400 text-sm">{title}</h3>
    <p className="text-3xl font-bold text-blue-400 mt-2">{value}</p>
  </motion.div>
);

export default Dashboard;
