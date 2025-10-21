const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const isAuthenticated = require('../middlewares/isAuthenticaded');

// Liste des réservations
router.get('/', isAuthenticated, reservationController.getReservations);

// Créer
router.post('/create', isAuthenticated, reservationController.createReservation);

// Modifier
router.post('/update/:id', isAuthenticated, reservationController.updateReservation);

// Supprimer
router.get('/delete/:id', isAuthenticated, reservationController.deleteReservation);

module.exports = router;
