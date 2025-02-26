const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    deadline: Date,
  });
  
  module.exports = mongoose.model("Task", TaskSchema);
  