const studentService = require('../services/create-studentService');

const addStudent = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    // ✅ Validation
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data received"
      });
    }

    // ✅ Call service
    const result = await studentService.addStudentService(req.body);

    // ✅ Response
    res.status(201).json({
      message: "Student Added Successfully",
      data: result
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);

    res.status(500).json({
      message: "Error adding student",
      error: error.message
    });
  }
};

module.exports = {
  addStudent
};