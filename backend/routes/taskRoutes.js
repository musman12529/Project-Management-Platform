const express = require('express');
const Task = require('../models/task');
const router = express.Router();



// Retrieve all overdue tasks (this should come before the :id route)
router.get('/overdue', async (req, res) => {
  try {
    const now = new Date(); // Get the current date and time

    // Find tasks with a dueDate in the past and that are not marked as completed
    const overdueTasks = await Task.find({
      dueDate: { $lt: now },
      status: { $ne: 'completed' }
    });

    res.status(200).json(overdueTasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDate } = req.body; // Include dueDate
  const task = new Task({ title, description, dueDate }); // Save dueDate
  
  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
// Update a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Push current title and description to history before updating
    task.history.push({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate, // Save current dueDate

      status: task.status,
      updatedAt: task.updatedAt
    });

    // Update task with new values

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate; // Update dueDate

    task.status = req.body.status || task.status;
    task.updatedAt = Date.now();

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Retrieve task history at a specified time
router.get('/history/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json(task.history);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retrieve all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete a specific task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id); // Attempt to find and delete the task by ID
    if (!task) return res.status(404).json({ message: 'Task not found' }); // If no task is found, return 404

    res.status(200).json({ message: "Task Deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle any errors that occur
  }
});




module.exports = router;
