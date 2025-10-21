const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.render('users', { users, user: req.session.user });
};

/* // Liste des utilisateurs
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.render('users', { users });
}; */

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect('/users');
  } catch (err) {
    res.status(400).send('Erreur création utilisateur');
  }
};

// --- Modifier un utilisateur ---
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send('<script>alert("Utilisateur introuvable."); window.location.href="/users";</script>');
    }

    // Vérifie le mot de passe actuel
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('<script>alert("Le mot de passe actuel est erroné."); window.location.href="/users";</script>');
    }

    // Met à jour les infos
    user.name = name;
    user.email = email;

    // Si nouveau mot de passe fourni → on le hash
    if (newPassword && newPassword.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();
    res.redirect('/users');
  } catch (err) {
    console.error('Erreur update user:', err);
    res.status(500).send('<script>alert("Erreur serveur."); window.location.href="/users";</script>');
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.redirect('/users');
};