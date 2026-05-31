

const express = require('express');

const router = express.Router();

const {
  getAllStudents,
  getStudentById
} = require('../controller/student-listController');


// ALL STUDENTS
router.get('/', getAllStudents);


// SINGLE STUDENT
router.get('/:id', getStudentById);


module.exports = router;