const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date }, // New field for due date

  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  
  updatedAt: { type: Date, default: Date.now },
  
  history: [{
    title: { type: String },  // Add title to history
    description: { type: String },  // Add description to history
    dueDate: { type: Date }, // Add due date to history

    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    updatedAt: { type: Date, default: Date.now }
  }]
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;