const express = require('express');
const router = express.Router();

// Importation du middleware authentification et multer pour les images
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
// Importation du controller pour les sauces
const sauceCtrl = require('../controllers/sauce');

// Routes de l'application
router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrNot)

module.exports = router;