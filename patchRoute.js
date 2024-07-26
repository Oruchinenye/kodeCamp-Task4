const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, body, status } = req.body;
  const newTask = {
    id: uuidv4(),
    title: "Test Task",
    body: "This is a simple test task",
    status: "Pending"
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task's title and body
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.title = title;
  task.body = body;

  res.json(task);
});

// Update a task's status
app.patch('/tasks/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.status = status;

  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter(task => task.id !== id);

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
