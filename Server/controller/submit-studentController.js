const { submitStudentService } = require('../services/submit-studentService');

const submitStudent = async (req, res) => {
  try {
    console.log("📥 Incoming Data:", req.body);

    const result = await submitStudentService(req.body);

    res.status(201).json({
      message: "✅ Student added successfully",
      data: result
    });

  } catch (error) {
    console.error("❌ Controller Error:", error);

    res.status(500).json({
      message: error.message || "Error submitting student"
    });
  }
};

module.exports = { submitStudent };