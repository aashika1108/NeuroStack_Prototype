// controllers/taskController.js
const Task = require("../models/task");
const User = require("../models/user");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, status } = req.body;

    // Ensure assignedTo is an array
    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "assignedTo must be an array of user IDs." });
    }

    // Check if all users in assignedTo exist
    const assignedUsers = await User.find({ _id: { $in: assignedTo } });
    if (assignedUsers.length !== assignedTo.length) {
      return res
        .status(400)
        .json({ message: "One or more users in assignedTo do not exist." });
    }

    const task = new Task({
      title,
      description,
      assignedTo,
      dueDate,
      status,
      createdBy: req.user.userId,
    });
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
      const tasks = await Task.find({ assignedTo: req.user.userId }).populate(
        "assignedTo",
        "name email"
      );
      return res.json(tasks);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const { id: taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure user is either admin or one of the assigned users
    if (
      !task.assignedTo.includes(req.user.userId) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    if (assignedTo) {
      // Ensure that the new assignedTo array only includes valid user IDs
      const assignedUsers = await User.find({ _id: { $in: assignedTo } });
      if (assignedUsers.length !== assignedTo.length) {
        return res
          .status(400)
          .json({ message: "One or more users in assignedTo do not exist." });
      }
      task.assignedTo = assignedTo; // Update the assignedTo field
    }

    await task.save();
    res.json({ message: "Task updated", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // Retrieve taskId from the URL parameter (from req.params)
    const { id: taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Ensure user is either admin or one of the assigned users
    if (
      !task.assignedTo.includes(req.user.userId) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
