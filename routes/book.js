const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const bookCtrl = require('../controllers/book');

// router.get('/', bookCtrl.getAllBooks);
// router.get('/:id', bookCtrl.getBookById);
// router.get('/bestrating', bookCtrl.getBooksByBestRating);

module.exports = router;