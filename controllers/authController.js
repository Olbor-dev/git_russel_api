const userService = require('../services/userService');

exports.showLoginPage = (req, res) => {
  res.render('login', { error: null });
};

exports.showRegisterPage = (req, res) => {
  res.render('register', { error: null });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.render('register', { error: 'Cet email est déjà utilisé.' });
    }

    await userService.createUser({ name, email, password });
    res.redirect('/login');
  } catch (error) {
    console.error('Erreur registerUser:', error);
    res.render('register', { error: 'Erreur serveur lors de la création.' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.render('login', { error: 'Utilisateur non trouvé' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Mot de passe incorrect' });
    }

    req.session.user = { id: user._id, name: user.name };
    res.redirect('/catways');
  } catch (error) {
    console.error('Erreur loginUser:', error);
    res.render('login', { error: 'Erreur serveur' });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
