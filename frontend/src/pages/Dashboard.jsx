import React, { useState, useEffect, useContext } from "react";
import { FaChartBar } from "react-icons/fa"; // Import Font Awesome icon
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
      <div className="dashboard-card no-scroll" style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", padding: "20px", margin: "10px" }}> {/* Adjusted padding and margin to match screenshot */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px", textAlign: "left" }}> {/* Adjusted margin and gap to match screenshot */}
          <FaChartBar className="icon" color="#20a665" size={24} /> {/* Green icon, matching theme */}
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#20a665", margin: "0" }}>Admin Dashboard</h1> {/* Left-aligned, matching screenshot */}
        </div>
        {user?.role === "admin" && <TaskForm onTaskCreated={fetchTasks} style={{ marginBottom: "15px" }} />} {/* Adjusted margin to match screenshot */}
        <div className="dashboard-grid" style={{ textAlign: "center", gap: "15px", padding: "0 10px", maxHeight: "70vh", overflowY: "auto" }}> {/* Adjusted gap and padding to match screenshot */}
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={handleDelete} style={{ display: "block", width: "180px", maxWidth: "100%", margin: "0 auto 15px", padding: "10px" }} /> // Moved comment outside JSX
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#666", padding: "10px", margin: "0" }}>
              No tasks yet. Create one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;