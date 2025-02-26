const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;  // Assuming user ID is stored in the JWT payload

    // Check if the user is assigned to the task
    const task = await Task.findById(taskId).populate("assignedTo");
    if (!task || !task.assignedTo.some(user => user._id.toString() === userId)) {
      return res.status(403).json({ message: "You are not authorized to view comments for this task" });
    }

    // Fetch comments related to the task
    const comments = await Comment.find({ taskId }).populate("userId", "name");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};
