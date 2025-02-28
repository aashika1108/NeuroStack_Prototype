import React from "react";
import { useState, useContext } from "react";
import { FaPlusCircle } from "react-icons/fa"; // Import Font Awesome icon
import AuthContext from "../context/AuthContext";
import { createTask } from "../services/api";

const TaskForm = ({ onTaskCreated }) => {
  console.log("Rendering TaskForm");
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    dueDate: "",
    status: "Pending",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      onTaskCreated();
      setFormData({ title: "", description: "", assignedTo: [], dueDate: "", status: "Pending" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form className="card">
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <FaPlusCircle className="icon" color="#9333ea" /> {/* Use FaPlusCircle with 24px size */}
        Create Task
      </h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="input"
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input"
          rows="3"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Assigned To (comma-separated IDs)"
          value={formData.assignedTo.join(",")}
          onChange={(e) =>
            setFormData({ ...formData, assignedTo: e.target.value.split(",") })
          }
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="input"
        />
      </div>
      <div className="form-group">
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="input"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;