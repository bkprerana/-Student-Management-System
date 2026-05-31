const { Student } = require('../config/StudentInfoDbConfig');

// ✅ UPDATE STUDENT
const updateStudentService = async (rollNumber, data) => {
    try {
        const student = await Student.findByPk(rollNumber);

        if (!student) {
            return null;
        }

        // Update fields
        student.StudentName = data.StudentName;
        student.Semester = data.Semester;
        student.Class = data.Class;
        student.Address = data.Address;
        student.JoiningDate = data.JoiningDate;

        await student.save();

        return student;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    updateStudentService
};