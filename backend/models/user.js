const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const sanitizerPlugin = require('mongoose-sanitizer-plugin');

//Schéma de données pour les users
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true,  match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]},
    password: {type: String, required: true, unique: true} 
});

// Plugin pour garantir un email unique
userSchema.plugin(uniqueValidator);
// Plugin pour Mongoose qui vérifie les champs du model avant de les enregistrer dans la base MongoDB.
userSchema.plugin(sanitizerPlugin);

module.exports = mongoose.model('User', userSchema);