import React from "react";
import { useState, useEffect, useContext } from "react";
import { FaChartBar } from "react-icons/fa"; // Import Font Awesome icon
import AuthContext from "../context/AuthContext";
import { getTasks, deleteTask } from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    console.log("Fetching tasks...");
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      console.log("Tasks fetched:", response.data);
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

  console.log("Rendering Dashboard with user:", user, "and tasks:", tasks);

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <FaChartBar className="icon" color="#9333ea" /> {/* Use FaChartBar with 24px size */}
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b" }}>
          {user?.role === "admin" ? "Admin Dashboard" : "Your Tasks"}
        </h1>
      </div>
      {user?.role === "admin" && <TaskForm onTaskCreated={fetchTasks} />}
      <div className="dashboard-grid">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} />
          ))
        ) : (
          <p style={{ gridColumn: "span 3", textAlign: "center", color: "#666", padding: "20px" }}>
            No tasks yet. {user?.role === "admin" ? "Create one above!" : "Check back later!"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;