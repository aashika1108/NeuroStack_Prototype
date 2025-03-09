// src/pages/TaskDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const fetchTask = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTask(res.data.task);
    } catch (err) {
      alert('Error fetching task');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/${id}/comments`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setComments(res.data);
    } catch (err) {
      alert('Error fetching comments');
    }
  };

  useEffect(() => {
    fetchTask();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5000/api/tasks/${id}/comments`,
        { comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setComment('');
      fetchComments();
    } catch (err) {
      alert('Error adding comment');
    }
  };

  if (!task) return <p className="loading">Loading task details...</p>;

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <p><strong>Assigned To:</strong> {task.assignedTo.map((user) => user.name).join(', ')}</p>

      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to add one!</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="comment">
            <p>{c.comment}</p>
            <small>{new Date(c.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows="3"
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default TaskDetails;