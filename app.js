const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes.js');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes.js');
const reservationRoutes = require('./routes/reservationRoutes.js');

const app = express();

// Connexion à la bdd mongodb
mongoose.connect('mongodb+srv://olbor_admin:txVrQR81ddJlINPW@backenddb.rciapkp.mongodb.net/?retryWrites=true&w=majority&appName=BackendDb')
.then(() => console.log("Connecté à MongoDB"))
.catch(() => console.log("La connexion à MongoDB a échouée"));

// Config ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: 'catway-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    client: mongoose.connection.getClient(),
    collectionName: 'sessions'
  }),
  cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

// Routes
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/users', userRoutes);
app.use('/catways', catwayRoutes);
app.use('/reservations', reservationRoutes);

// Lancement
const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/dashboard'); // si connecté → dashboard
  } else {
    res.redirect('/login');     // sinon → login
  }
});