




const nodemailer = require('nodemailer');

const crypto = require('crypto');

const { sequelize } =
require('../config/StudentInfoDbConfig');
const { QueryTypes } = require('sequelize');


// =========================
// EMAIL CONFIG
// =========================
const transporter =
nodemailer.createTransport({

  service: 'gmail',

  auth: {

    user: 'studentinfosupport@gmail.com',

    pass: 'vtjuuxervfrtelcs'
  }
});


// =========================
// SEND OTP
// =========================
exports.sendOTP = async (data) => {

  const { email } = data;

  // CHECK USER
  const user = await sequelize.query(

    `SELECT * FROM Users
     WHERE Email = :email`,

    {
      replacements: { email },

      type:
      sequelize.QueryTypes.SELECT
    }
  );

  if (user.length === 0) {

    throw new Error('Email not found');
  }

  // GENERATE OTP
  const otp =
  Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const expiry =
  Date.now() + 5 * 60 * 1000;

  // SAVE OTP
  await sequelize.query(

    `UPDATE Users

     SET otp = :otp,
         otpExpiry = :expiry

     WHERE Email = :email`,

    {
      replacements: {

        otp,
        expiry,
        email
      }
    }
  );

  // SEND EMAIL
  await transporter.sendMail({

    from: 'studentinfosupport@gmail.com',

    to: email,

    subject: 'OTP Verification',

    text:
    `Your OTP is ${otp}`
  });

  return {

    message:
    'OTP sent successfully'
  };
};


// =========================
// VERIFY OTP
// =========================
// =========================
// VERIFY OTP
// =========================
exports.verifyOTP = async (data) => {

  const { email, otp } = data;

  const user =
  await sequelize.query(

    `SELECT * FROM Users

     WHERE Email = :email
     AND otp = :otp`,

    {
      replacements: {

        email,
        otp
      },

      type:
      QueryTypes.SELECT
    }
  );

  if (user.length === 0) {

    throw new Error('Invalid OTP');
  }

  // CHECK EXPIRY
  if (
    Date.now() >
    Number(user[0].otpExpiry)
  ) {

    throw new Error('OTP expired');
  }

  return {

    message:
    'OTP verified'
  };
};


// =========================
// RESET PASSWORD
// =========================


// =========================
// RESET PASSWORD
// =========================
exports.resetPassword = async (data) => {

  const {

    email,
    newPassword

  } = data;

  // HASH PASSWORD USING SHA512
  const hashedPassword =

  crypto
  .createHash('sha512')
  .update(newPassword)
  .digest('hex');

  // UPDATE PASSWORD
  await sequelize.query(

    `UPDATE Users

     SET Password = :password,
         otp = NULL,
         otpExpiry = NULL

     WHERE Email = :email`,

    {
      replacements: {

        password:
        hashedPassword,

        email
      }
    }
  );

  return {

    message:
    'Password reset successful'
  };
};
// exports.resetPassword = async (data) => {

//   const {

//     email,
//     newPassword

//   } = data;

//   // CHECK USER
//   const user = await sequelize.query(

//     `SELECT * FROM Users
//      WHERE Email = :email`,

//     {
//       replacements: { email },

//       type:
//       sequelize.QueryTypes.SELECT
//     }
//   );

//   if (user.length === 0) {

//     throw new Error('User not found');
//   }

//   // HASH PASSWORD
//   const hashedPassword =
//   await bcrypt.hash(newPassword, 10);

//   // UPDATE PASSWORD
//   await sequelize.query(

//     `UPDATE Users

//      SET Password = :password,
//          otp = NULL,
//          otpExpiry = NULL

//      WHERE Email = :email`,

//     {
//       replacements: {

//         password:
//         hashedPassword,

//         email
//       }
//     }
//   );

//   return {

//     message:
//     'Password reset successful'
//   };
// };