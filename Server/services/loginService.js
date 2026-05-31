



const { sequelize } =
require('../config/StudentInfoDbConfig');

const crypto = require('crypto');

const jwt = require('jsonwebtoken');


// =========================
// ACTIVE SESSIONS
// =========================

const activeSessions = new Map();


// =========================
// SECRET KEY
// =========================

const SECRET_KEY = 'MY_SECRET_KEY';


// =========================
// LOGIN USER
// =========================

const loginUser = async (
    Email,
    Password
) => {

    // HASH PASSWORD
    const hashedPassword = crypto
        .createHash('sha512')
        .update(Password)
        .digest('hex');

    // FIND USER
    const [user] = await sequelize.query(

        `
        SELECT *
        FROM Users
        WHERE Email = :Email
        AND Password = :Password
        `,

        {
            replacements: {
                Email,
                Password: hashedPassword
            }
        }
    );

    // INVALID USER
    if (user.length === 0) {

        return [];
    }

    // =========================
    // REMOVE OLD SESSION
    // =========================

    activeSessions.delete(Email);

    // =========================
    // CREATE NEW JWT TOKEN
    // =========================

    const token = jwt.sign(

        {
            Id: user[0].Id,
            Email: user[0].Email,
            Role: user[0].Role
        },

        SECRET_KEY,

        {
            expiresIn: '1h'
        }
    );

    // SAVE ACTIVE SESSION
    activeSessions.set(
        Email,
        token
    );

    // ADD TOKEN
    user[0].token = token;

    return user;
};


// =========================
// VERIFY SESSION
// =========================

const verifySession = (
    Email,
    token
) => {

    const activeToken =
        activeSessions.get(Email);

    return activeToken === token;
};


module.exports = {

    loginUser,

    verifySession
};