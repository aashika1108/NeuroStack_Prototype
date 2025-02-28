import { useState, useEffect } from "react";
import React from "react";
import { createComment, getComments } from "../services/api";

// Chat Bubble Icon as SVG
const ChatBubbleLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#9333ea"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
    />
  </svg>
);

const CommentSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const fetchComments = async () => {
    try {
      const response = await getComments(taskId);
      setComments(response.data);
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
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "40px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
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
        <ChatBubbleLeftIcon />
        Comments
      </h3>
      <div style={{ maxHeight: "320px", overflowY: "auto", paddingRight: "8px", marginBottom: "24px" }}>
        {comments.map((comment) => (
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
        ))}
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