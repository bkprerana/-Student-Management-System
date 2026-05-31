const { Student } = require('../config/StudentInfoDbConfig');

const submitStudentService = async (data) => {
  try {
    console.log("📥 Service Data:", data);

    // Check if already exists
    const existing = await Student.findByPk(data.RollNumber);

    if (existing) {
      throw new Error("Student with this Roll Number already exists");
    }

    const student = await Student.create(data);

    return student;

  } catch (error) {
    console.error("❌ Service Error:", error);
    throw error;
  }
};

module.exports = { submitStudentService };