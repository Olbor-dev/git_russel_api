const Catway = require('../models/catwayModel');

exports.getCatways = async (req, res) => {
  const catways = await Catway.find();
  res.render('catways', { catways, user: req.session.user });
};

// Liste des catways
exports.getAllCatways = async (req, res) => {
  const catways = await Catway.find();
  res.render('catways', { catways });
};

// Créer un catway
exports.createCatway = async (req, res) => {
  try {
    await Catway.create(req.body);
    res.redirect('/catways');
  } catch (err) {
    res.status(400).send('Erreur création catway');
  }
};

// Modifier un catway
exports.updateCatway = async (req, res) => {
  const { id } = req.params;
  await Catway.findByIdAndUpdate(id, req.body);
  res.redirect('/catways');
};

// Supprimer un catway
exports.deleteCatway = async (req, res) => {
  const { id } = req.params;
  await Catway.findByIdAndDelete(id);
  res.redirect('/catways');
};