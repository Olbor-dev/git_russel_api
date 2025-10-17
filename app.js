const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/authMiddleware');
const session = require('express-session');
//const path = require('path');
//const userModel = require('./models/userModel');

const app = express();

// Variable du port localhost
const Port = process.env.Port || 8080;

// Config ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    secret: 'secret-catway', // 🔒 change ça pour un vrai secret en prod
    resave: false,
    saveUninitialized: false
  }));

// Connexion à la bdd mongodb
mongoose.connect('mongodb+srv://olbor_admin:txVrQR81ddJlINPW@backenddb.rciapkp.mongodb.net/?retryWrites=true&w=majority&appName=BackendDb')
.then(() => console.log("Connecté à MongoDB"))
.catch(() => console.log("La connexion à MongoDB a échouée"));

// Connexion au serveur
app.listen(Port, () => {
    console.log("Le serveur foctionne sur le port " + Port)
});

// Middlewares
app.use(express.static('public')); // Eploitation du dossier public pour les fichiers statiques (HTML, CSS, JS, images)
app.use(express.urlencoded({ extended: true})); //Pour les formulaires
app.use(express.json()); //Pour lire le json depuis le front

app.use('/', authRoutes);
app.use('/', userRoutes);

// Route protégée
app.get('/catways', isAuthenticated, (req, res) => {
    res.render('catways', { user: req.session.user });
  });