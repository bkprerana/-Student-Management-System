const express = require('express');
const router = express.Router();
const { register } = require('../controller/registerController');

router.post('/register', register);

module.exports = router;