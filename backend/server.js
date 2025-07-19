const express = require('express');
const db = require('./db');  // 👈 Add this line

const app = express();

// Test database route
app.get('/test-db', async (req, res) => {
  try {
    await db.authenticate();
    res.send('Database connected successfully!');
  } catch (err) {
    res.status(500).send('Database error: ' + err.message);
  }
});
