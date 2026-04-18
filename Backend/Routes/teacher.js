// backend/routes/teacher.js
const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');

// Public
router.post('/register', teacherController.registerTeacher);
router.post('/login', teacherController.loginTeacher);

// Example protected route (teacher only)
router.get('/me', auth('teacher'), (req, res) => {
  res.json({
      id: req.user.id,
          email: req.user.email,
              role: req.user.role,
                });
                });

                module.exports = router;