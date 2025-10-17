const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getHomePage);
router.post('/add-user', userController.createUser);
router.post('/delete-user/:id', userController.deleteUser);
// Routes pour la modification de l'utilisateur
router.get('/edit-user/:id', userController.editUserForm);
router.post('/update-user/:id', userController.updateUser);

module.exports = router;