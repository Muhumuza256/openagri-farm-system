require('dotenv').config();
const express = require('express');
const app = express();

// Health check route
app.get('/', (req, res) => {
  res.send('🇺🇬 Uganda Farm System Online');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
