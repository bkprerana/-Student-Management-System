

const dashboardService =
require('../services/dashboardService');


// ============================
// MAIN DASHBOARD
// ============================

const getDashboard = async (
    req,
    res
) => {

    try {

        // ============================
        // GET EMAIL
        // ============================

        const email =
            req.query.email;

        // ============================
        // GET TOKEN
        // ============================

        const authHeader =
            req.headers.authorization;

        if (!email || !authHeader) {

            return res.status(401).json({

                message:
                    "Unauthorized ❌"
            });
        }

        // REMOVE Bearer
        const token =
            authHeader.replace(
                'Bearer ',
                ''
            );

        console.log("EMAIL:", email);
        console.log("TOKEN:", token);

        // ============================
        // LOAD DASHBOARD
        // ============================

        const data =
            await dashboardService.getDashboardData(

                email,

                token
            );

        res.status(200).json(data);

    } catch (err) {

        console.log(err);

        res.status(401).json({

            message:
                err.message
        });
    }
};


// ============================
// SEMESTER DATA
// ============================

const getSemesterData = async (
    req,
    res
) => {

    try {

        const roll =
            req.params.roll;

        const semester =
            req.params.semester;

        console.log("ROLL:", roll);
        console.log("SEMESTER:", semester);

        const data =
            await dashboardService.getSemesterData(

                roll,

                semester
            );

        res.status(200).json(data);

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
                'Semester load failed ❌',

            error:
                err.message
        });
    }
};


module.exports = {

    getDashboard,

    getSemesterData
};