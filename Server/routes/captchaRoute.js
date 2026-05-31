const express = require('express');

const router = express.Router();

const {

    generateCaptcha,

    refreshCaptcha

} = require('../controller/captchaController');


// ✅ GET CAPTCHA

router.get(
    '/',
    generateCaptcha
);


// ✅ REFRESH CAPTCHA

router.get(
    '/refresh',
    refreshCaptcha
);

module.exports = router;