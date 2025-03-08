import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onDelete }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', marginBottom: '8px', textAlign: 'center' }}>
        {task.title}
      </h3>
      <p style={{ color: '#666', marginBottom: '6px', textAlign: 'center', padding: '4px' }}>
        {task.description || "No description"}
      </p>
      <p style={{ color: '#666', marginBottom: '6px', textAlign: 'center', padding: '4px' }}>
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p style={{ textAlign: 'center', marginBottom: '6px' }}>
        Status: <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span>
      </p>
      <p style={{ color: '#666', marginBottom: '10px', textAlign: 'center', padding: '4px' }}>
        Assigned: {task.assignedTo.map((user) => user.name).join(", ") || "None"}
      </p>
      <div className="task-actions">
        <Link to={`/tasks/${task._id}`} className="task-actions">
          <FaEye style={{ color: '#20a665' }} size={16} /> View
        </Link>
        <button onClick={() => onDelete(task._id)} className="task-actions">
          <FaTrash style={{ color: '#ef4444' }} size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;