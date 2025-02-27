// models/task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Completed'], // Example status
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    }
  ],
  dueDate: {
    type: Date,
  },
  createdBy: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    }
  
});

module.exports = mongoose.model('Task', taskSchema);
