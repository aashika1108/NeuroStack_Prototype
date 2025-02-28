import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { getTasks, updateTask } from "../services/api";
import CommentSection from "../components/CommentSection";

// Pencil Square Icon as SVG
const PencilSquareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#9333ea"
    className="w-10 h-10"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
);

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await getTasks();
      const task = response.data.find((t) => t._id === id);
      setTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo.map((u) => u._id),
        dueDate: task.dueDate.split("T")[0],
        status: task.status,
      });
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, formData);
      fetchTask();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (!task) return <div className="container" style={{ textAlign: "center", color: "#666", padding: "40px" }}>Loading...</div>;

  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
        <PencilSquareIcon />
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1e293b" }}>Task Details</h1>
      </div>
      <div className="task-details-grid">
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "40px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
          }}
        >
          <div className="form-group">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input"
            />
          </div>
          <div className="form-group">
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="input"
              rows="3"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
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
          <button type="submit">Update Task</button>
        </form>
        <CommentSection taskId={id} />
      </div>
    </div>
  );
};

export default TaskDetails;