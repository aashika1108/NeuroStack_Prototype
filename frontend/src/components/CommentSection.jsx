import React, { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import { createComment, getComments } from "../services/api";

const CommentSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    console.log("Fetching comments for task:", taskId);
    fetchComments();
  }, [taskId]);

  const fetchComments = async () => {
    try {
      const response = await getComments(taskId);
      console.log("Comments fetched:", response.data);
      setComments(response.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createComment(taskId, newComment);
      setNewComment("");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="card comment-section">
      <h3 className="flex items-center gap-3 mb-6">
        <FaComment style={{ color: '#20a665' }} size={24} />
        Comments
      </h3>
      <div className="custom-scrollbar max-h-80 mb-6 pr-2">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-avatar">
                {comment.userId?.name?.[0] || "U"}
              </div>
              <div>
                <p style={{ color: '#666', marginBottom: '4px' }}>{comment.comment}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>
                  {comment.userId?.name || "Unknown"} • {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#666', textAlign: 'center', padding: '12px' }}>No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type your comment..."
          className="input"
          rows="3"
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;