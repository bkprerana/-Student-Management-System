

const {
  Student,
  Academic,
  Attendance,
  Fees,
  Notifications
} = require('../config/StudentInfoDbConfig');


// =========================
// 🔄 UPDATE STUDENT
// =========================
const updateStudent = async (data) => {

  const [updated] = await Student.update(
    {
      StudentName: data.StudentName,
      Semester: data.Semester,
      Class: data.Class,
      Address: data.Address
    },
    {
      where: {
        RollNumber: data.RollNumber
      }
    }
  );

  if (updated === 0) {
    throw new Error("Student not found");
  }

  return {
    message: "Student updated successfully ✅"
  };
};


// =========================
// 🗑 DELETE STUDENT
// =========================
const deleteStudent = async (roll) => {

  const deleted = await Student.destroy({
    where: {
      RollNumber: roll
    }
  });

  if (deleted === 0) {
    throw new Error("Student not found");
  }

  return {
    message: "Student deleted successfully 🗑"
  };
};


// =========================
// 📚 ADD ACADEMIC
// =========================
const addAcademic = async (data) => {

  if (!data.RollNumber) {
    throw new Error("RollNumber required");
  }

  return await Academic.create({

    RollNumber: data.RollNumber,

    Subject: data.Subject,

    Marks: data.Marks,

    Grade: data.Grade,

    Semester: data.Semester
  });
};


// =========================
// 📅 ADD ATTENDANCE
// =========================
const addAttendance = async (data) => {

  if (!data.RollNumber) {
    throw new Error("RollNumber required");
  }

  return await Attendance.create({

    RollNumber: data.RollNumber,

    TotalClasses: data.TotalClasses,

    Present: data.Present,

    Absent: data.Absent,

    Semester: data.Semester
  });
};


// =========================
// 💰 ADD FEES
// =========================
const addFees = async (data) => {

  if (!data.RollNumber) {
    throw new Error("RollNumber required");
  }

  return await Fees.create({

    RollNumber: data.RollNumber,

    TotalFees: data.TotalFees,

    Paid: data.Paid,

    Pending: data.Pending,

    Semester: data.Semester
  });
};


// =========================
// 🔔 ADD NOTIFICATION
// =========================
const addNotification = async (data) => {

  if (!data.RollNumber) {
    throw new Error("RollNumber required");
  }

  return await Notifications.create({

    RollNumber: data.RollNumber,

    Message: data.Message,

    Semester: data.Semester,

    // ✅ SQL SERVER DATE FORMAT
    Date: new Date()
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
  });
};


// =========================
// 📤 EXPORTS
// =========================
module.exports = {

  updateStudent,

  deleteStudent,

  addAcademic,

  addAttendance,

  addFees,

  addNotification
};