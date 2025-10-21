const Reservation = require('../models/reservationModel');
const Catway = require('../models/catwayModel');

// 📋 Liste des réservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ checkIn: 1 });
    const catways = await Catway.find();
    res.render('reservations', { reservations, catways, user: req.session.user, error: null });
  } catch (err) {
    console.error('Erreur getReservations:', err);
    res.status(500).send('Erreur serveur');
  }
};

// ➕ Créer une réservation
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
      return res.render('reservations', {
        reservations,
        catways,
        user: req.session.user,
        error: `❌ Le catway ${catwayNumber} est déjà réservé sur cette période.`
      });
    }

    await Reservation.create(req.body);
    res.redirect('/reservations');
  } catch (err) {
    console.error('Erreur création réservation:', err);
    res.status(400).send('Erreur création réservation');
  }
};

// ✏️ Modifier une réservation
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
      return res.render('reservations', {
        reservations,
        catways,
        user: req.session.user,
        error: `❌ Le catway ${catwayNumber} est déjà réservé sur cette période.`
      });
    }

    await Reservation.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/reservations');
  } catch (err) {
    console.error('Erreur mise à jour réservation:', err);
    res.status(400).send('Erreur mise à jour réservation');
  }
};

// ❌ Supprimer
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect('/reservations');
  } catch (err) {
    console.error('Erreur suppression réservation:', err);
    res.status(400).send('Erreur suppression réservation');
  }
};
