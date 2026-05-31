



const { Student } =
require('../config/StudentInfoDbConfig');

// 🗑 DELETE STUDENT
const deleteStudentService =
async (rollNumber) => {

    try {

        console.log(
            "🗑 Deleting Student:",
            rollNumber
        );

        // FIND STUDENT
        const student =
        await Student.findByPk(
            rollNumber
        );

        // IF NOT FOUND
        if (!student) {

            return null;
        }

        // DELETE STUDENT
        await student.destroy();

        // RETURN SUCCESS
        return {

            success: true,

            message:
            "Student deleted successfully ✅",

            deletedStudent:
            student
        };

    }

    catch (error) {

        console.error(
            "❌ Service Error:",
            error
        );

        throw error;
    }
};

module.exports = {
    deleteStudentService
};