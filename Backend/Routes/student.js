const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Public route: join session
router.post('/join', studentController.joinSession);

module.exports = router;