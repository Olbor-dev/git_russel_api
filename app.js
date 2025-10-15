const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Port = process.env.Port || 8080;

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
