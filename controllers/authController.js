const User = require('../models/userModel');

// --- Page de login ---
exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

// --- Authentification ---
exports.postLogin = async (req, res) => {
  const { email, password } = req.body; // <-- email au lieu de username

  try {
    // 1️⃣ Cherche l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Identifiant incorrect' });
    }

    // 2️⃣ Compare le mot de passe via la méthode du modèle
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Mot de passe incorrect' });
    }

    // 3️⃣ Sauvegarde en session
    req.session.user = user;
    res.redirect('/dashboard');

  } catch (err) {
    console.error('Erreur login :', err);
    res.status(500).render('login', { error: 'Erreur serveur' });
  }
};

// --- Déconnexion ---
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
