import React, { useState, useEffect, useContext } from "react";
import { FaChartBar } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import { getTasks, deleteTask } from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="dashboard-card">
        <div className="flex items-center gap-3 mb-6">
          <FaChartBar style={{ color: '#20a665' }} size={24} />
          <h1>Admin Dashboard</h1>
        </div>
        {user?.role === "admin" && <TaskForm onTaskCreated={fetchTasks} />}
        <div className="dashboard-grid">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDelete} />
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#666', padding: '10px', margin: '0' }}>
              No tasks yet. Create one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;