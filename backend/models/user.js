const mongoose = require('mongoose');
// Importation du module Mongoose unique validator
const uniqueValidator = require('mongoose-unique-validator');

//Schéma de données pour les users
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true} 
});

// Plugin pour garantir un email unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);