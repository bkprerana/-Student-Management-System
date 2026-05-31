// const express = require('express');
// const router = express.Router();
// const dashboardController = require('../controller/dashboardController');

// router.get('/', dashboardController.getDashboard);

// module.exports = router;
const express = require('express');

const router = express.Router();

const dashboardController =
require('../controller/dashboardController');


// ==============================
// MAIN DASHBOARD
// ==============================

router.get(
  '/',
  dashboardController.getDashboard
);


// ==============================
// SEMESTER DATA
// ==============================

router.get(
  '/semester/:roll/:semester',
  dashboardController.getSemesterData
);

module.exports = router;