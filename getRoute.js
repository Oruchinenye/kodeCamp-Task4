require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API Key for authentication from environment variables
const API_KEY = process.env.API_KEY;

// Middleware to check API key
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== API_KEY) {
        return res.status(401).json({
            error: {
                name: 'AuthenticationError',
                message: 'Invalid API Key. Every request requires a valid API Key to be sent.'
            }
        });
    }
    next();
});

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
