const studentService = require('../services/student-updateService');

// ✅ UPDATE CONTROLLER
const updateStudent = async (req, res) => {
    try {
        const rollNumber = req.params.id;
        const data = req.body;

        console.log("✏️ Updating Student:", rollNumber);
        console.log("📥 Data:", data);

        const updatedStudent = await studentService.updateStudentService(rollNumber, data);

        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            data: updatedStudent
        });

    } catch (error) {
        console.error("❌ Update Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    updateStudent
};