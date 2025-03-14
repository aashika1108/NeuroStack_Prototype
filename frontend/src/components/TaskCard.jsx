import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskCard = ({ task, fetchTasks }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting task');
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
        <button onClick={handleDelete} style={{ background: 'linear-gradient(90deg, #e74c3c, #c0392b)' }}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;