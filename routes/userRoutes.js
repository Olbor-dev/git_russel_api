const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticaded');

router.get('/', isAuthenticated, userController.getUsers);
router.post('/create', isAuthenticated, userController.createUser);
router.post('/update/:id', isAuthenticated, userController.updateUser);
router.get('/delete/:id', isAuthenticated, userController.deleteUser);

module.exports = router;
