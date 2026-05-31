const forgotService =
require('../services/forgotPasswordService');


// =========================
// SEND OTP
// =========================
exports.sendOTP = async (req, res) => {

  try {

    const result =
    await forgotService.sendOTP(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};


// =========================
// VERIFY OTP
// =========================
exports.verifyOTP = async (req, res) => {

  try {

    const result =
    await forgotService.verifyOTP(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};


// =========================
// RESET PASSWORD
// =========================
exports.resetPassword = async (req, res) => {

  try {

    const result =
    await forgotService.resetPassword(req.body);

    res.status(200).json(result);

  } catch (error) {

    res.status(500).json({

      message: error.message
    });
  }
};