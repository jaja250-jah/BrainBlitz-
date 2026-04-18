// backend/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const teacherRoutes = require('./routes/teacher');

app.use(express.json());

app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`BrainBlitz backend running on port ${PORT}`);
  });