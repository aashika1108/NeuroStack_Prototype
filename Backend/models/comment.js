const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Comment", CommentSchema);