const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); 
const Task = require('../models/task');

// Mock Task data
const mockTask = {
  title: "Test Task",
  description: "This is a test task.",
  dueDate: new Date('2024-12-31'),
  status: 'pending'
};

let taskId; // Variable to store the ID of a created task

// Before each test, clear the database and create a new task
beforeEach(async () => {
  await Task.deleteMany({}); // Clear all tasks in the database
  const task = new Task(mockTask);
  await task.save();
  taskId = task._id;
});

// Test for GET /api/tasks
describe('GET /api/tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1); // Should return 1 task
  });

  it('should return a 500 error if the server fails', async () => {
    jest.spyOn(Task, 'find').mockRejectedValueOnce(new Error('Database failure'));
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Database failure');
  });
});

// Test for GET /api/tasks/:id
describe('GET /api/tasks/:id', () => {
  it('should return the task for the given ID', async () => {
    const res = await request(app).get(`/api/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(mockTask.title);
  });

  it('should return 404 if task not found', async () => {
    const res = await request(app).get('/api/tasks/609bfe418b5ae2a0c8f5a6d0'); // Invalid ID
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });
});

// Test for POST /api/tasks
describe('POST /api/tasks', () => {
  it('should create a new task', async () => {
    const newTask = {
      title: "New Task",
      description: "This is a new task.",
      dueDate: new Date('2024-12-31'),
      status: 'pending'
    };
    const res = await request(app).post('/api/tasks').send(newTask);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newTask.title);
  });

  it('should return a 400 error if the request body is invalid', async () => {
    const invalidTask = { description: "No title" }; // Missing title
    const res = await request(app).post('/api/tasks').send(invalidTask);
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Task validation failed');
  });
});

// Test for PUT /api/tasks/:id
describe('PUT /api/tasks/:id', () => {
  it('should update the task for the given ID', async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated description",
      dueDate: new Date('2024-12-31'),
      status: 'completed'
    };
    const res = await request(app).put(`/api/tasks/${taskId}`).send(updatedTask);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedTask.title);
    expect(res.body.status).toBe(updatedTask.status);
  });

  it('should return 404 if task not found', async () => {
    const updatedTask = {
      title: "Updated Task",
      description: "Updated description",
      dueDate: new Date('2024-12-31'),
      status: 'completed'
    };
    const res = await request(app).put('/api/tasks/609bfe418b5ae2a0c8f5a6d0').send(updatedTask); // Invalid ID
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });
});

// Test for DELETE /api/tasks/:id
describe('DELETE /api/tasks/:id', () => {
  it('should delete the task for the given ID', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task Deleted');
  });

  it('should return 404 if task not found', async () => {
    const res = await request(app).delete('/api/tasks/609bfe418b5ae2a0c8f5a6d0'); // Invalid ID
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });
});

// Test for GET /api/tasks/overdue
describe('GET /api/tasks/overdue', () => {
  it('should return overdue tasks', async () => {
    const overdueTask = new Task({
      title: "Overdue Task",
      description: "This task is overdue.",
      dueDate: new Date('2023-12-31'), // Overdue date
      status: 'pending'
    });
    await overdueTask.save();
    const res = await request(app).get('/api/tasks/overdue');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0); // Should return the overdue task
  });

  it('should return an empty array if no tasks are overdue', async () => {
    const res = await request(app).get('/api/tasks/overdue');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0); // Should return an empty array if no tasks are overdue
  });
});

// Test for GET /api/tasks/history/:id
describe('GET /api/tasks/history/:id', () => {
  it('should return task history for the given ID', async () => {
    // First, create a task and add some history to it.
    const task = new Task({
      title: "History Task",
      description: "This task has history.",
      dueDate: new Date('2024-12-31'),
      status: 'pending',
      history: [
        { title: "Initial Task", description: "Initial description", dueDate: new Date('2024-11-30'), status: 'pending' }
      ]
    });
    await task.save();

    const res = await request(app).get(`/api/tasks/history/${task._id}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0); // Should return history
    expect(res.body[0].title).toBe("Initial Task"); // Check if history is correct
  });

  it('should return 404 if task not found', async () => {
    const res = await request(app).get('/api/tasks/history/609bfe418b5ae2a0c8f5a6d0'); // Invalid ID
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Task not found');
  });
});


