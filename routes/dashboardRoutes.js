const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const isAuthenticated = require('../middlewares/isAuthenticaded');

router.get('/', isAuthenticated, dashboardController.getDashboard);

module.exports = router;
