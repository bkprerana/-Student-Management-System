const { Student } = require('../config/StudentInfoDbConfig');

// ✅ GET STUDENT BY ROLL NUMBER
const getStudentByIdService = async (rollNumber) => {
    try {
        return await Student.findByPk(rollNumber);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getStudentByIdService
};