


const svgCaptcha = require('svg-captcha');
const sharp = require('sharp');

// ============================
// GENERATE CAPTCHA
// ============================

const generateCaptcha = async (req, res) => {

    try {

        const captcha = svgCaptcha.create({

            size: 5,

            noise: 3,

            color: true,

            background: '#ffffff',

            ignoreChars: '0o1i',

            fontSize: 58,

            width: 170,

            height: 60,

            charPreset:
            'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
        });

        // ✅ STORE CAPTCHA IN SESSION
        req.session.captcha = captcha.text;

        console.log(
            'NEW CAPTCHA:',
            req.session.captcha
        );

        // ✅ SVG → PNG
        const pngBuffer = await sharp(
            Buffer.from(captcha.data)
        )
        .png()
        .toBuffer();

        // ✅ SEND IMAGE
        res.json({

            image:
            `data:image/png;base64,${pngBuffer.toString('base64')}`,

            text:
            captcha.text,

            time:
            new Date().getTime()
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({

            message:
            'Captcha failed ❌'
        });
    }
};

// ============================
// REFRESH CAPTCHA
// ============================

const refreshCaptcha = async (req, res) => {

    generateCaptcha(req, res);
};

// ============================
// GET CAPTCHA
// ============================

const getCaptchaText = (req) => {

    return req.session.captcha;
};

module.exports = {

    generateCaptcha,

    refreshCaptcha,

    getCaptchaText
};