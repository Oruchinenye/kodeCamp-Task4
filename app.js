const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

app.use(express.json());

let tasks = [];

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
