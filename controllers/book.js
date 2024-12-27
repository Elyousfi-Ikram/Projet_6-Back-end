const Book = require('../models/book');


exports.getAllBook = (req, res, next) => {
    Book.find()
        .then((book) => {
            if (book.length === 0) {
                return res.status(404).json({
                    message: "Aucun livre trouvé.",
                });
            }

            res.status(200).json(book);
        })
        .catch((error) => {
            res.status(500).json({
                message:
                    "Une erreur est survenue lors de la récupération des livres.",
                error: error,
            });
        });
};;

exports.getBookById = (req, res, next) => {
    const bookId = req.params.id;
    Book.findOne(bookId)
        .then((book) => {
            if (!book) {
                return res.status(404).json({
                    message: "Livre non trouvé.",
                    error: error,
                });
            }

            res.status(200).json(book);
        })
        .catch((error) => {
            res.status(500).json({
                message:
                    "Une erreur est survenue lors de la récupération du livre.",
                error: error,
            });
        });
};

exports.getBooksByBestRating = (req, res, next) => {
    Book.find()
        .sort({ averageRating: -1 })
        .limit(3)
        .then((books) => {
            res.status(200).json(books);
        })
        .catch((error) => {
            res.status(500).json({
                message:
                    "Une erreur est survenue lors de la récupération des livres avec la meilleure note.",
                error: error,
            });
        });
};