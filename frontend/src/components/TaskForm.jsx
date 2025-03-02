import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"; // Import Font Awesome plus icon

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: [],
    dueDate: "",
    status: "Pending",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.description && formData.dueDate) {
      onTaskCreated(formData);
      setFormData({
        title: "",
        description: "",
        assignedTo: [],
        dueDate: "",
        status: "Pending",
      });
    }
  };

  return (
    <div className="card" style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", padding: "15px", marginBottom: "15px", textAlign: "left", width: "70%" }}> {/* Set width to 70% to match request */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}> {/* Adjusted gap and margin to match screenshot */}
        <FaPlus className="task-form-icon" color="#20a665" size={20} /> {/* Green plus icon, matching theme and screenshot */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#20a665", margin: "0", width: "100%" }}>Create Task</h2> {/* Full width within 70%, left-aligned */}
      </div>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input"
            style={{ textAlign: "center", padding: "12px" }} /* Increased padding for visibility */
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input"
            rows="3"
            style={{ textAlign: "center", resize: "vertical", padding: "12px" }} /* Increased padding for visibility */
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Assigned To (comma-separated IDs)"
            value={formData.assignedTo.join(",")}
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value.split(",") })}
            className="input"
            style={{ textAlign: "center", padding: "12px" }} /* Increased padding for visibility */
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="input"
            style={{ textAlign: "center", padding: "12px" }} /* Increased padding for visibility */
          />
        </div>
        <div className="form-group">
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="input"
            style={{ textAlign: "center", padding: "12px" }} /* Increased padding for visibility */
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: "10px", padding: "12px 24px" }}>Add Task</button> {/* Increased padding for visibility */}
      </form>
    </div>
  );
};

export default TaskForm;