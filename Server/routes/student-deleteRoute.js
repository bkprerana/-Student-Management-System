const express = require('express');
const router = express.Router();

const controller = require('../controller/student-deleteController');

// 🗑 DELETE ROUTE
// DELETE http://localhost:3000/api/students/21
router.delete('/:id', controller.deleteStudent);

module.exports = router;