const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');
const isAuthenticated = require('../middlewares/isAuthenticaded');

router.get('/', isAuthenticated, catwayController.getCatways);
router.post('/create', isAuthenticated, catwayController.createCatway);
router.post('/update/:id', isAuthenticated, catwayController.updateCatway);
router.get('/delete/:id', isAuthenticated, catwayController.deleteCatway);

module.exports = router;
