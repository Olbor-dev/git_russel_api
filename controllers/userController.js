const userService = require('../services/userService');

// Ouvre la homePage avec tous les utilisateurs
exports.getHomePage = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.render('index', { users });
    } catch (error) {
      console.error('Erreur getHomePage:', error);
      res.status(500).send('Erreur serveur');
    }
};

// Crée un utilisateur depuis le formulaire
exports.createUser = async (req, res) => {
    try {
      const { name, email } = req.body;
      await userService.createUser({ name, email });
      res.redirect('/'); // recharge la page
    } catch (error) {
      console.error('Erreur createUser:', error.message);
      res.status(500).send('Erreur serveur');
    }
};

// Supprime un utilisateur
exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;
      await userService.deleteUser(userId);
      res.redirect('/');
    } catch (error) {
      console.error('Erreur deleteUser:', error);
      res.status(500).send('Erreur serveur');
    }
};


exports.editUserForm = async (req, res) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) return res.status(404).send('Utilisateur non trouvé');
      res.render('editUser', { user });
    } catch (error) {
      console.error('Erreur editUserForm:', error);
      res.status(500).send('Erreur serveur');
    }
  };
  
  exports.updateUser = async (req, res) => {
    try {
      const { name, email } = req.body;
      await userService.updateUser(req.params.id, { name, email });
      res.redirect('/');
    } catch (error) {
      console.error('Erreur updateUser:', error);
      res.status(500).send('Erreur serveur');
    }
  };