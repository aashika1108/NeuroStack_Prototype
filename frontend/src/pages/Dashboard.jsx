// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(res.data);
    } catch (err) {
      alert('Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title,
          description,
          assignedTo: assignedTo.split(','), 
          dueDate,
          status,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setDueDate('');
      setStatus('Pending');
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
        />
        <input
          type="text"
          placeholder="Assigned To (comma-separated IDs)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Create Task</button>
      </form>

      <div>
        <h2>Your Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet. Create one to get started!</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;