const express = require('express');
const mongoose = require('mongoose');
//const path = require('path');
const userModel = require('./models/userModel');

const app = express();

// Variable du port localhost
const Port = process.env.Port || 8080;

// Déclaration du moteur de template ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Connexion à la bdd mongodb
mongoose.connect('mongodb+srv://olbor_admin:txVrQR81ddJlINPW@backenddb.rciapkp.mongodb.net/?retryWrites=true&w=majority&appName=BackendDb')
.then(() => {
    console.log("Connecté à MongoDB");
})
.catch(() => {
    console.log("La connexion à MongoDB a échouée");
});

// Connexion au serveur
app.listen(Port, () => {
    console.log("Le serveur foctionne sur le port " + Port)
});

// Middlewares
app.use(express.static('public')); // Eploitation du dossier public pour les fichiers statiques (HTML, CSS, JS, images)
app.use(express.json()); //Pour lire le json depuis le front

/* // Liste des utilisateurs
app.get('/api/users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); */

app.get('/', async (req, res) => {
    //Ouverture de la page d'accueil;
    try {
        const users = await userModel.find();
        res.render('index', { users });
        console.log("pas d'erreur users");
      } catch (err) {
        res.status(500).send('Erreur serveur');
      }
});

/* app.get('/', async (req, res) => {
    try {
      const users = await userModel.find();
      res.render('index', { users });
      console.log("pas d'erreur users");
    } catch (err) {
      res.status(500).send('Erreur serveur');
    }
  }); */