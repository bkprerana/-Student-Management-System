const express = require('express');
const router = express.Router();

const controller = require('../controller/student-updateController');

// ✅ UPDATE ROUTE
// PUT http://localhost:3000/api/students/21
router.put('/:id', controller.updateStudent);

module.exports = router;