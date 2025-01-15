const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const { uploadImage, compressImage } = require("../middleware/multer-config");

const bookCtrl = require('../controllers/book');

// Créer un livre
router.post("/", auth, uploadImage, compressImage, bookCtrl.createBook);

// Obtenir la liste des livres
router.get('/', bookCtrl.getAllBook);

// Obtenir les livres ayant la meilleure note
router.get('/bestrating', bookCtrl.getBooksByBestRating);

// Obtenir les détails d'un livre spécifique
router.get('/:id', bookCtrl.getBookById);

// Mettre à jour un livre
router.put("/:id", auth, uploadImage, compressImage, bookCtrl.modifyBook);

// Supprimer un livre
router.delete("/:id", auth, bookCtrl.deleteBook);

//Noter un livre
router.post("/:id/rating", auth, bookCtrl.createRating);

module.exports = router;
