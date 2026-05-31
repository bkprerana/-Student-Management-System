const express = require('express');
const router = express.Router();   // ✅ THIS LINE WAS MISSING

const adminController = require('../controller/adminController');


// =========================
// 👨‍🎓 STUDENT
// =========================
router.put('/student', adminController.updateStudent);
router.delete('/student/:roll', adminController.deleteStudent);


// =========================
// 📚 ACADEMIC
// =========================
router.post('/academic', adminController.addAcademic);


// =========================
// 📅 ATTENDANCE
// =========================
router.post('/attendance', adminController.addAttendance);


// =========================
// 💰 FEES
// =========================
router.post('/fees', adminController.addFees);


// =========================
// 🔔 NOTIFICATION
// =========================
router.post('/notification', adminController.addNotification);


// ✅ EXPORT ROUTER
module.exports = router;