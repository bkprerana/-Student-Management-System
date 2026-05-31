const { sequelize } = require('../config/StudentInfoDbConfig');
const crypto = require('crypto');

const hashPassword = (password) => {
  return crypto.createHash('sha512')
    .update(password)
    .digest('hex');
};

const registerUser = async (data) => {
  try {
    const { Name, Email, Password } = data;

    const hashedPassword = hashPassword(Password);

    await sequelize.query(`
      INSERT INTO Users (Name, Email, Password)
      VALUES (:Name, :Email, :Password)
    `, {
      replacements: {
        Name,
        Email,
        Password: hashedPassword
      }
    });

    return { success: true, message: "User Registered Successfully" };

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    throw err;
  }
};

module.exports = { registerUser };