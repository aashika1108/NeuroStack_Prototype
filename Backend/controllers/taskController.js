// controllers/taskController.js
const Task = require("../models/task");
const User = require("../models/user");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    
    // Ensure only admins or the assigned user can create tasks
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(400).json({ message: "Assigned user does not exist" });
    }

    const task = new Task({ title, description, assignedTo });
    await task.save();

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      // Admin can view all tasks
      const tasks = await Task.find().populate("assignedTo", "name email");
      return res.json(tasks);
    } else {
      // User can only view their own tasks
      const tasks = await Task.find({ assignedTo: req.user.userId }).populate("assignedTo", "name email");
      return res.json(tasks);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, title, description } = req.body;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure user is either admin or the assigned user
    if (task.assignedTo.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();

    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure user is either admin or the assigned user
    if (task.assignedTo.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
