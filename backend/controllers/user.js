// On utilise bcrypt pour hasher le mot de passe des utilisateurs
const bcrypt = require('bcrypt');
// On récupère le model pour les utilisateurs
const User = require('../models/user');
// Package jsonwebtoken pour attribuer un token à un utilisateur 
const jwt = require('jsonwebtoken');

// On sauvegarde un nouvel utilisateur et crypte son mot de passe avec un hash généré par bcrypt
exports.signup = (req, res, next) => {
    // Appel de la méthode hash de bcrypt et on le passe le mot de passe, le 10 correspond au nombre de tours de l'algorithme
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          // On passe le email trouvé dans le corps de la réquête
          email: req.body.email,
          // Récupération de la mot de passe hachè
          password: hash
        });
        // On enregistre l'utilisateur dans la base de données
        user.save()
          // Si le tout se passe bien on affiche le message: 'Utilisateur créé !'
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          // Dans le cas où utilisateur existe dejà on affiche le message: "Ce nom d'utilisateur existe déjà !" 
          .catch(error => res.status(400).json({ message: "Ce nom d'utilisateur existe déjà !" }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) => {
    // Cherche l'utilisateur dans la base de données qui correspond à l'adresse entrée par l'utilisateur
    User.findOne({ email: req.body.email })
      .then(user => {
        // Si l'utilisateur existe pas on envoie un message 401 ('Utilisateur non trouvé !')
        if (!user) {
          return res.status(401).json({ message: 'Utilisateur non trouvé !' });
        }
        // Bcrypt compare le hash avec le mot de passe entrée par l'utilisateur
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            // Si le mot de passe est pas valide on envoie un message 401 ('Mot de passe incorrect !')
            if (!valid) {
              return res.status(401).json({ message: 'Mot de passe incorrect !' });
            }
            // Si les données sont correctes on renvoie un statut 200 et un objet JSON avec un userID + un token
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };