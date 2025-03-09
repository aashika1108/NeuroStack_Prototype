// src/pages/TaskDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [taskLoading, setTaskLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [taskError, setTaskError] = useState(null);
  const [commentsError, setCommentsError] = useState(null);

  const fetchTaskDetails = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const taskData = res.data.find((t) => t._id === id);
      if (!taskData) {
        throw new Error('Task not found or you are not authorized to view it');
      }
      console.log('Task Data:', taskData); // Debug log
      setTask(taskData);
      setTaskError(null);
    } catch (err) {
      console.error('Fetch Task Error:', err.response?.data || err.message);
      setTaskError(err.message || 'Failed to fetch task details');
    } finally {
      setTaskLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${id}/comments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Comments Response:', res.data); // Debug log
      setComments(Array.isArray(res.data) ? res.data : []);
      setCommentsError(null);
    } catch (err) {
      console.error('Fetch Comments Error:', err.response?.data || err.message);
      if (err.response?.status === 403) {
        setCommentsError('You are not authorized to view comments for this task');
        setComments([]);
      } else {
        setCommentsError('Failed to fetch comments');
        setComments([]);
      }
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/tasks/${id}/comments`,
        { comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log('Post Comment Response:', res.data); // Debug log
      setComment('');
      await fetchComments();
    } catch (err) {
      console.error('Post Comment Error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Error adding comment');
    }
  };

  return (
    <div className="task-details">
      {taskLoading ? (
        <p className="loading">Loading task details...</p>
      ) : taskError ? (
        <p className="error">{taskError}</p>
      ) : !task ? (
        <p>No task found.</p>
      ) : (
        <>
          <h2>{task.title}</h2>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Assigned To:</strong> {task.assignedTo.map((user) => user.name).join(', ')}</p>
          <p><strong>Created By:</strong> {task.createdBy.name || 'Unknown'}</p>
        </>
      )}

      <h3>Comments</h3>
      {commentsLoading ? (
        <p className="loading">Loading comments...</p>
      ) : commentsError ? (
        <p className="error">{commentsError}</p>
      ) : comments.length === 0 ? (
        <p>No comments yet. Be the first to add one!</p>
      ) : (
        comments.map((c) => (
          <div key={c._id} className="comment">
            <p>{c.comment}</p>
            <small>
              By User ID: {c.userId} on {new Date(c.createdAt).toLocaleString()}
            </small>
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