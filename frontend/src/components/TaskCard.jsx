import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa"; // Import Font Awesome icons

const TaskCard = ({ task, onDelete }) => {
  console.log("Rendering TaskCard with task:", task);
  if (!task) return null;

  const statusStyles = {
    Pending: "status-pending",
    "In Progress": "status-in-progress",
    Completed: "status-completed",
  };

  const statusClass = statusStyles[task.status] || "status";

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {task.title || "No Title"}
        </h3>
        <span className={statusClass}>
          {task.status || "Unknown"}
        </span>
      </div>
      <p style={{ color: "#666", marginTop: "12px", lineHeight: "1.5", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>
        {task.description || "No Description"}
      </p>
      <div style={{ marginTop: "16px", color: "#666", fontSize: "14px" }}>
        <p>
          <span style={{ fontWeight: "500", color: "#1e293b" }}>Due:</span>{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </p>
        <p>
          <span style={{ fontWeight: "500", color: "#1e293b" }}>Assigned:</span>{" "}
          {task.assignedTo?.length
            ? task.assignedTo.map((u) => u.name || "Unknown").join(", ")
            : "None"}
        </p>
      </div>
      <div className="task-actions" style={{ marginTop: "24px", display: "flex", gap: "16px" }}>
        <Link
          to={`/tasks/${task._id}`}
          style={{
            fontWeight: "500",
          }}
        >
          <FaEye className="icon" color="#9333ea" /> {/* Use FaEye with 24px size */}
          View
        </Link>
        <button
          onClick={() => onDelete(task._id)}
          style={{
            fontWeight: "500",
          }}
        >
          <FaTrash className="icon" color="#ef4444" /> {/* Use FaTrash with 24px size */}
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;