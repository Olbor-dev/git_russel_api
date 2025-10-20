const Catway = require('../models/catwayModel');

exports.getCatways = async (req, res) => {
  const catways = await Catway.find();
  res.render('catways', { catways, user: req.session.user });
};
