const express = require('express');
const Project = require('../models/project');
const router = express.Router();

// Create a new project
router.post('/', async (req, res) => {
    const { projectName, status, dueDate } = req.body;
    const userEmail = req.headers['user-email']; // Get user email from the request headers
  
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required to create a project' });
    }
  
    try {
      const project = new Project({
        projectName,
        status,
        dueDate,
        userEmail // Assign the user email
      });
  
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Retrieve all projects for a specific user
router.get('/', async (req, res) => {
    const userEmail = req.headers['user-email']; // Get user email from the request headers
  
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required' });
    }
  
    try {
      const projects = await Project.find({ userEmail })
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Retrieve a specific project by ID for a user
router.get('/:id', async (req, res) => {
    const userEmail = req.headers['user-email']; // Get user email from the request headers
  
    if (!userEmail) {
      return res.status(400).json({ message: 'User email is required' });
    }
  
    try {
      const project = await Project.findOne({ _id: req.params.id, userEmail })
      if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });
  
      res.status(200).json(project);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Update a project for a user
router.put('/:id', async (req, res) => {
    
  
    try {
      const project = await Project.findOne({ _id: req.params.id});
      if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });
  
      // Update project fields
      project.projectName = req.body.projectName || project.projectName;
      project.status = req.body.status || project.status;
      project.dueDate = req.body.dueDate || project.dueDate;
      project.updatedAt = Date.now();
  
      await project.save();
      res.status(200).json(project);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

// Delete a project for a user
router.delete('/:id', async (req, res) => {
    
  
    try {
      const project = await Project.findOneAndDelete({ _id: req.params.id });
      if (!project) return res.status(404).json({ message: 'Project not found or unauthorized' });
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = router;
