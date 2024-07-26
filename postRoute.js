const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory task storage
let tasks = [];

// POST endpoint to add a new task
app.post('/tasks', (req, res) => {
    const { title, body, status } = req.body;

    // Validate input
    if (!title || !body) {
        return res.status(400).json({
            error: 'Title and body are required'
        });
    }

    const newTask = {
        id: uuidv4(),
        title,
        body,
        status: status || 'pending' // Default status
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
