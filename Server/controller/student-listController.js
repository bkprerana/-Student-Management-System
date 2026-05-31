// ==========================================
// IMPORT STUDENT MODEL
// ==========================================

const { Student } = require('../config/StudentInfoDbConfig');


// ==========================================
// GET STUDENT BY ROLL NUMBER
// ==========================================

const getStudentById = async (req, res) => {

  try {

    const rollNumber = parseInt(req.params.id);

    console.log("🔍 Searching Roll:", rollNumber);

    // FIND STUDENT
    const student = await Student.findOne({

      where: {
        RollNumber: rollNumber
      }

    });

    // NOT FOUND
    if (!student) {

      return res.status(404).json({
        message: "Student not found"
      });

    }

    // SUCCESS
    res.status(200).json(student);

  }

  catch (error) {

    console.error("❌ Controller Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};


// ==========================================
// GET ALL STUDENTS
// ==========================================

const getAllStudents = async (req, res) => {

  try {

    const students = await Student.findAll();

    res.status(200).json(students);

  }

  catch (error) {

    console.error("❌ Fetch Error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message
    });

  }

};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {

  getStudentById,
  getAllStudents

};