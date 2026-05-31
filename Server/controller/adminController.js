


const adminService = require('../services/adminService');


// =========================
// 🔄 UPDATE STUDENT
// =========================
exports.updateStudent = async (req, res) => {

  try {

    if (!req.body.RollNumber) {

      return res.status(400).json({
        message: "RollNumber is required"
      });
    }

    const result =
      await adminService.updateStudent(req.body);

    res.status(200).json({

      message: "Student updated successfully ✅",

      data: result
    });

  } catch (err) {

    console.error("Update Error:", err);

    res.status(500).json({

      message: "Update failed ❌",

      error: err.message
    });
  }
};


// =========================
// 🗑 DELETE STUDENT
// =========================
exports.deleteStudent = async (req, res) => {

  try {

    const roll = req.params.roll;

    if (!roll) {

      return res.status(400).json({
        message: "RollNumber is required"
      });
    }

    const result =
      await adminService.deleteStudent(roll);

    res.status(200).json({

      message: "Student deleted successfully 🗑",

      data: result
    });

  } catch (err) {

    console.error("Delete Error:", err);

    res.status(500).json({

      message: "Delete failed ❌",

      error: err.message
    });
  }
};


// =========================
// 📚 ADD ACADEMIC
// =========================
exports.addAcademic = async (req, res) => {

  try {

    const {

      RollNumber,

      Subject,

      Marks,

      Grade,

      Semester

    } = req.body;

    if (!RollNumber || !Subject || !Semester) {

      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const result =
      await adminService.addAcademic({

        RollNumber,

        Subject,

        Marks,

        Grade,

        Semester
      });

    res.status(200).json({

      message: "Academic saved ✅",

      data: result
    });

  } catch (err) {

    console.error("Academic Error:", err);

    res.status(500).json({

      message: "Academic save failed ❌",

      error: err.message
    });
  }
};


// =========================
// 📅 ADD ATTENDANCE
// =========================
exports.addAttendance = async (req, res) => {

  try {

    const {

      RollNumber,

      TotalClasses,

      Present,

      Absent,

      Semester

    } = req.body;

    if (!RollNumber || !Semester) {

      return res.status(400).json({
        message: "RollNumber & Semester required"
      });
    }

    const result =
      await adminService.addAttendance({

        RollNumber,

        TotalClasses,

        Present,

        Absent,

        Semester
      });

    res.status(200).json({

      message: "Attendance saved ✅",

      data: result
    });

  } catch (err) {

    console.error("Attendance Error:", err);

    res.status(500).json({

      message: "Attendance failed ❌",

      error: err.message
    });
  }
};


// =========================
// 💰 ADD FEES
// =========================
exports.addFees = async (req, res) => {

  try {

    const {

      RollNumber,

      TotalFees,

      Paid,

      Pending,

      Semester

    } = req.body;

    if (!RollNumber || !Semester) {

      return res.status(400).json({
        message: "RollNumber & Semester required"
      });
    }

    const result =
      await adminService.addFees({

        RollNumber,

        TotalFees,

        Paid,

        Pending,

        Semester
      });

    res.status(200).json({

      message: "Fees saved ✅",

      data: result
    });

  } catch (err) {

    console.error("Fees Error:", err);

    res.status(500).json({

      message: "Fees save failed ❌",

      error: err.message
    });
  }
};


// =========================
// 🔔 ADD NOTIFICATION
// =========================
exports.addNotification = async (req, res) => {

  try {

    const {

      RollNumber,

      Message,

      Semester

    } = req.body;

    if (!RollNumber || !Message || !Semester) {

      return res.status(400).json({
        message: "Missing fields"
      });
    }

    const result =
      await adminService.addNotification({

        RollNumber,

        Message,

        Semester
      });

    res.status(200).json({

      message: "Notification sent 🔔",

      data: result
    });

  } catch (err) {

    console.error("Notification Error:", err);

    res.status(500).json({

      message: "Notification failed ❌",

      error: err.message
    });
  }
};