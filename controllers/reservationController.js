const Reservation = require('../models/reservationModel');
const Catway = require('../models/catwayModel');

// Liste des réservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ catwayNumber: 1, checkOut: 1 });
    const catways = await Catway.find();
    res.render('reservations', { reservations, catways, user: req.session.user, error: null });
  } catch (err) {
    console.error('Erreur getReservations:', err);
    res.status(500).send('Erreur serveur');
  }
};

// Créer une réservation
exports.createReservation = async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

    // Vérifie qu’aucune autre réservation ne chevauche la même période pour le même catway
    const overlap = await Reservation.findOne({
      catwayNumber,
      $or: [
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }
      ]
    });

    if (overlap) {
      const reservations = await Reservation.find().sort({ checkIn: 1 });
      const catways = await Catway.find();
      return res.status(406).send('<script>alert("Le catway est déjà réservé sur cette période."); window.location.href="/reservations";</script>');
    }

    await Reservation.create(req.body);
    res.redirect('/reservations');
  } catch (err) {
    res.status(400).send('<script>alert("erreur création réservation."); window.location.href="/reservations";</script>');
  }
};

// Modifier une réservation
exports.updateReservation = async (req, res) => {
  try {
    const { catwayNumber, checkIn, checkOut } = req.body;

    // Vérifie qu’une autre réservation n’existe pas pour la même période
    const overlap = await Reservation.findOne({
      _id: { $ne: req.params.id }, // exclut la réservation actuelle
      catwayNumber,
      $or: [
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkIn } }
      ]
    });

    if (overlap) {
      const reservations = await Reservation.find().sort({ checkIn: 1 });
      const catways = await Catway.find();
      return res.status(406).send('<script>alert("Le catway est déjà réservé sur cette période."); window.location.href="/reservations";</script>');
    }

    await Reservation.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/reservations');
  } catch (err) {
    res.status(400).send('<script>alert("Erreur de mise à jour de la réservation."); window.location.href="/reservations";</script>');
  }
};

// Supprimer
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
  } catch (err) {
    res.status(400).send('<script>alert("Erreur suppression réservation."); window.location.href="/reservations";</script>');
  }
};
