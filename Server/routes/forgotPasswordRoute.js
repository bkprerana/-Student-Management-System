const express = require('express');

const router = express.Router();

const forgotController =
require('../controller/forgotPasswordController');


// SEND OTP
router.post(
  '/send-otp',
  forgotController.sendOTP
);


// VERIFY OTP
router.post(
  '/verify-otp',
  forgotController.verifyOTP
);


// RESET PASSWORD
router.post(
  '/reset-password',
  forgotController.resetPassword
);

module.exports = router;