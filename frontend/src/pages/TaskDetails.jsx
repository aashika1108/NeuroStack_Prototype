import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { getTasks, updateTask } from "../services/api";
import CommentSection from "../components/CommentSection";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    console.log("Fetching task details...");
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await getTasks();
      console.log("Tasks fetched:", response.data);
      const task = response.data.find((t) => t._id === id);
      setTask(task);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          assignedTo: task.assignedTo.map((u) => u._id),
          dueDate: task.dueDate.split("T")[0],
          status: task.status,
        });
      }
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

  if (!task) return <div className="container" style={{ textAlign: 'center', color: '#666', padding: '40px' }}>Loading...</div>;

  return (
    <div className="container">
      <div className="flex items-center gap-3 mb-8">
        <FaEdit style={{ color: '#20a665' }} size={24} />
        <h1>Task Details</h1>
      </div>
      <div className="task-details-grid">
        <form onSubmit={handleSubmit} className="card">
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
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input"
              rows="3"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={formData.assignedTo.join(",")}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value.split(",") })}
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