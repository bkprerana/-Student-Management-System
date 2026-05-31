



const loginService =
require('../services/loginService');

const {
    getCaptchaText
} = require('./captchaController');


// =========================
// LOGIN CONTROLLER
// =========================

const login = async (
    req,
    res
) => {

    try {

        const {
            Email,
            Password,
            captcha
        } = req.body;

        // =========================
        // CAPTCHA VALIDATION
        // =========================

        // ✅ GET CAPTCHA FROM SESSION

        const realCaptcha =
            getCaptchaText(req);

        console.log(
            'Frontend CAPTCHA:',
            captcha
        );

        console.log(
            'Backend CAPTCHA:',
            realCaptcha
        );

        // =========================
        // CAPTCHA CHECK
        // =========================

        if (

            !captcha ||

            !realCaptcha ||

            captcha
                .trim()
                .toLowerCase()

            !==

            realCaptcha
                .trim()
                .toLowerCase()

        ) {

            return res.status(400).json({

                message:
                'Invalid CAPTCHA ❌'
            });
        }

        // =========================
        // LOGIN USER
        // =========================

        const user =
            await loginService.loginUser(
                Email,
                Password
            );

        // =========================
        // INVALID LOGIN
        // =========================

        if (!user || user.length === 0) {

            return res.status(401).json({

                message:
                'Invalid Credentials ❌'
            });
        }

        // =========================
        // SUCCESS LOGIN
        // =========================

        res.status(200).json({

            message:
            'Login Successful ✅',

            user: user[0],

            token: user[0].token
        });

    } catch (error) {

        console.log(
            'LOGIN ERROR:',
            error
        );

        res.status(500).json({

            message:
            'Server Error ❌'
        });
    }
};

module.exports = {
    login
};