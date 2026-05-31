



const { sequelize } =
require('../config/StudentInfoDbConfig');

const {
    verifySession
} = require('./loginService');


// ============================
// MAIN DASHBOARD
// ============================

const getDashboardData = async (
    email,
    token
) => {

    // ============================
    // VERIFY SESSION
    // ============================

    const isValid =
        verifySession(
            email,
            token
        );

    if (!isValid) {

        throw new Error(
            "Session expired ❌"
        );
    }

    // ============================
    // GET STUDENT
    // ============================

    const [students] =
        await sequelize.query(

            `
            SELECT *
            FROM Students
            WHERE Email = ?
            `,

            {
                replacements: [email]
            }
        );

    const student =
        students[0];

    // ============================
    // NO STUDENT
    // ============================

    if (!student) {

        return {

            student: {},

            academic: [],

            attendance: {},

            fees: {},

            notifications: [],

            gpa: 0
        };
    }

    const rollNumber =
        student.RollNumber;

    const semester =
        student.Semester;

    console.log("DEFAULT SEM:", semester);

    // ============================
    // LOAD SEMESTER DATA
    // ============================

    return await getSemesterData(
        rollNumber,
        semester,
        student
    );
};


// ============================
// SEMESTER DATA
// ============================

const getSemesterData = async (
    roll,
    semester,
    studentData = null
) => {

    console.log("SERVICE ROLL:", roll);
    console.log("SERVICE SEM:", semester);

    // ============================
    // ACADEMIC
    // ============================

    const [academic] =
        await sequelize.query(

            `
            SELECT *
            FROM Academic
            WHERE RollNumber = ?
            AND Semester = ?
            `,

            {
                replacements: [
                    roll,
                    semester
                ]
            }
        );

    // ============================
    // ATTENDANCE
    // ============================

    const [attendance] =
        await sequelize.query(

            `
            SELECT *
            FROM Attendance
            WHERE RollNumber = ?
            AND Semester = ?
            `,

            {
                replacements: [
                    roll,
                    semester
                ]
            }
        );

    // ============================
    // FEES
    // ============================

    const [fees] =
        await sequelize.query(

            `
            SELECT *
            FROM Fees
            WHERE RollNumber = ?
            AND Semester = ?
            `,

            {
                replacements: [
                    roll,
                    semester
                ]
            }
        );

    // ============================
    // NOTIFICATIONS
    // ============================

    const [notifications] =
        await sequelize.query(

            `
            SELECT *
            FROM Notifications
            WHERE RollNumber = ?
            AND Semester = ?
            ORDER BY Date DESC
            `,

            {
                replacements: [
                    roll,
                    semester
                ]
            }
        );

    // ============================
    // GPA
    // ============================

    let totalMarks = 0;

    academic.forEach(a => {

        totalMarks +=
            Number(a.Marks || 0);
    });

    const gpa =
        academic.length > 0

            ? (totalMarks / academic.length) / 10

            : 0;

    return {

        student:
            studentData || {},

        academic,

        attendance:
            attendance[0] || {},

        fees:
            fees[0] || {},

        notifications,

        gpa:
            Number(gpa.toFixed(2))
    };
};


module.exports = {

    getDashboardData,

    getSemesterData
};