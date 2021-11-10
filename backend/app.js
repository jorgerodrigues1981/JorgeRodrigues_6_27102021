// Importation d'express
const express = require('express');
const app = express();
// Plugin Mongoose pour se connecter à la data base Mongo Db
const mongoose = require('mongoose');
// On donne accès au chemin de notre système de fichier
const path = require('path');
// Importation d'helmet
const helmet = require("helmet");

// Sécuriser Express en définissant divers en-têtes HTTP
app.use(helmet());

//Module dotenv
require('dotenv').config()

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

//Connection à la base de données Mongoose, le username et le mot de pass sont chargés à partir du fichier .env
mongoose.connect(`${process.env.DB_ORIGIN}${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_URL}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Eviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Pour analyser le corps de la requête
app.use(express.json());


// Permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;