// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); // New state for filtered tasks
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search input

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTasks(res.data);
      setFilteredTasks(res.data); // Initialize filtered tasks with all tasks
    } catch (err) {
      alert(err.response?.data?.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error('Error decoding token:', err);
        setRole('user');
      }
    }
    fetchTasks();
  }, []);

  // Filter tasks based on search query
  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title,
          description,
          assignedTo: assignedTo.split(',').map((id) => id.trim()),
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
      alert(err.response?.data?.message || 'Error creating task');
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          {role === 'admin' && (
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
          )}

          <div>
            <h2>Your Tasks</h2>
            {filteredTasks.length === 0 ? (
              <p>No tasks yet{role === 'admin' ? '. Create one to get started!' : ' assigned to you.'}{searchQuery && ' matching your search.'}</p>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;