import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa"; // Import Font Awesome icons

const TaskCard = ({ task, onDelete }) => {
  return (
    <div className="card" style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", padding: "10px", margin: "0 auto 15px", width: "180px", maxWidth: "100%" }}> {/* Adjusted width, padding, and margin to match screenshot */}
      <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#333", marginBottom: "8px", textAlign: "center" }}> {/* Adjusted margin to match screenshot */}
        {task.title}
      </h3>
      <p style={{ color: "#666", marginBottom: "6px", textAlign: "center", padding: "4px" }}> {/* Added padding for visibility */}
        {task.description || "No description"}
      </p>
      <p style={{ color: "#666", marginBottom: "6px", textAlign: "center", padding: "4px" }}> {/* Added padding for visibility */}
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p style={{ color: "#20a665", marginBottom: "6px", textAlign: "center" }}> {/* Adjusted margin to match screenshot */}
        Status: <span className="status" style={{ padding: "4px 8px" }}>{task.status}</span> {/* Added padding for visibility */}
      </p>
      <p style={{ color: "#666", marginBottom: "10px", textAlign: "center", padding: "4px" }}> {/* Added padding for visibility */}
        Assigned: {task.assignedTo.map((user) => user.name).join(", ") || "None"}
      </p>
      <div className="task-actions" style={{ textAlign: "center", marginTop: "8px" }}> {/* Adjusted margin to match screenshot */}
        <Link to={`/tasks/${task._id}`} style={{ color: "#20a665", marginRight: "8px", padding: "6px 12px" }}> {/* Increased padding for visibility */}
          <FaEye className="task-card-icon" color="#20a665" size={20} /> {/* Green icon, matching theme and screenshot */}
          View
        </Link>
        <button onClick={() => onDelete(task._id)} style={{ color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: "6px 12px" }}> {/* Increased padding for visibility */}
          <FaTrash className="task-card-icon" color="#ef4444" size={20} /> {/* Red icon for delete, matching theme and screenshot */}
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;