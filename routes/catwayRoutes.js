const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const isAuthenticated = require('../middlewares/isAuthenticaded');

router.get('/', isAuthenticated, catwayController.getCatways);

module.exports = router;
