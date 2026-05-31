


const express = require('express');

const router = express.Router();

const {

    login

} = require('../controller/loginController');


// =========================
// LOGIN ROUTE
// =========================

router.post('/login', login);


// =========================
// EXPORT
// =========================

module.exports = router;