const express = require('express');
const router = express.Router();

const { submitStudent } = require('../controller/submit-studentController');

// POST API
router.post('/submit', submitStudent);

module.exports = router;