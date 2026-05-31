const { Student } = require('../config/StudentInfoDbConfig');

const addStudentService = async (studentData) => {
  try {

    const { RollNumber, StudentName, Semester, Class, Address, JoiningDate } = studentData;

    // ✅ Business logic (if needed)
    if (!RollNumber || !StudentName) {
      throw new Error("RollNumber and StudentName are required");
    }

    // ✅ DB operation (Sequelize)
    const result = await Student.create({
      RollNumber,
      StudentName,
      Semester,
      Class,
      Address,
      JoiningDate
    });

    console.log("✅ Inserted:", result.dataValues);

    return result;

  } catch (error) {
    console.error("❌ Service Error:", error);
    throw error;
  }
};

module.exports = {
  addStudentService
};