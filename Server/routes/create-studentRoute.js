const express = require('express');
const router = express.Router();

const studentController = require('../controller/create-studentController');

// ✅ Only routing here
router.post('/add', studentController.addStudent);

module.exports = router;