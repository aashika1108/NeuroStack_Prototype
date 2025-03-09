// src/components/TaskCard.jsx
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react'; // Update this

const TaskCard = ({ task, fetchTasks }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTasks(); // Refresh tasks after deletion
    } catch (err) {
      alert('Error deleting task');
    }
  };

  return (
    <div className="task-card">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div>
        <button onClick={() => navigate(`/tasks/${task._id}`)}>View</button>
        <button onClick={handleDelete} style={{ backgroundColor: '#e74c3c' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;