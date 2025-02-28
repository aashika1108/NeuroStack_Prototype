import React from "react"; // Ensure this is present
import { useState, useEffect } from "react";
import { FaComment } from "react-icons/fa"; // Import Font Awesome comment icon
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
    <div
      className="card"
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
        <FaComment className="icon" color="#9333ea" size={24} /> {/* Use FaComment with 24px size */}
        Comments
      </h3>
      <div style={{ maxHeight: "320px", overflowY: "auto", paddingRight: "8px", marginBottom: "24px" }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              style={{
                display: "flex",
                alignItems: "start",
                gap: "12px",
                padding: "12px",
                background: "#f3f4f6",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background: "#e9d5ff",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#9333ea",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {comment.userId?.name?.[0] || "U"}
              </div>
              <div>
                <p style={{ color: "#666", marginBottom: "4px" }}>{comment.comment}</p>
                <p style={{ fontSize: "12px", color: "#666" }}>
                  {comment.userId?.name || "Unknown"} • {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: "#666", textAlign: "center", padding: "12px" }}>No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment..."
            className="input"
            rows="2"
          />
        </div>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;