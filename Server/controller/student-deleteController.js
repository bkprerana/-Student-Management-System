




const studentService =
require('../services/student-deleteService');

// 🗑 DELETE CONTROLLER
const deleteStudent =
async (req, res) => {

    try {

        const rollNumber =
        req.params.id;

        console.log(
            "🗑 Deleting Student:",
            rollNumber
        );

        // CALL SERVICE
        const result =

        await studentService
        .deleteStudentService(
            rollNumber
        );

        // STUDENT NOT FOUND
        if (!result) {

            return res.status(404).json({

                success: false,

                message:
                "Student not found ❌"
            });
        }

        // SUCCESS RESPONSE
        return res.status(200).json({

            success: true,

            message:
            "Student deleted successfully ✅",

            data: result
        });

    }

    catch (error) {

        console.error(
            "❌ Delete Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
            "Server error ❌",

            error:
            error.message
        });
    }
};

module.exports = {
    deleteStudent
};