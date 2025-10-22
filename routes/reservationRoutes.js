const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const isAuthenticated = require('../middlewares/isAuthenticaded');

router.get('/', isAuthenticated, reservationController.getReservations);
router.post('/create', isAuthenticated, reservationController.createReservation);
router.post('/update/:id', isAuthenticated, reservationController.updateReservation);
router.get('/delete/:id', isAuthenticated, reservationController.deleteReservation);

module.exports = router;
