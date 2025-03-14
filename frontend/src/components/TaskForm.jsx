import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

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
    <div className="card task-form-card">
      <div className="flex items-center gap-3 mb-6">
        <FaPlus style={{ color: '#20a665' }} size={20} />
        <h2>Create Task</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
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
            onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value.split(",") })}
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
    </div>
  );
};

export default TaskForm;