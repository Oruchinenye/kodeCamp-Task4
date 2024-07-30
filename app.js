const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory task storage
let tasks = [];

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Task API! Use /tasks to manage your tasks.');
});

// POST endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { title, body, status } = req.body;
    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required' });
    }
    const newTask = {
        id: uuidv4(),
        title,
        body,
        status: status || 'pending', // Default status
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// GET endpoint to get a list of all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET endpoint to get a task by its ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// PUT endpoint to change the title and body of a task
app.put('/tasks/:id', (req, res) => {
    const { title, body } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], title, body };
    res.json(tasks[taskIndex]);
});

// PATCH endpoint to change the status of a task
app.patch('/tasks/:id/status', (req, res) => {
    const { status } = req.body;
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    tasks[taskIndex] = { ...tasks[taskIndex], status };
    res.json(tasks[taskIndex]);
});

// DELETE endpoint to remove a task from the array of tasks
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const deletedTask = tasks.splice(taskIndex, 1)[0];
    res.json(deletedTask);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});