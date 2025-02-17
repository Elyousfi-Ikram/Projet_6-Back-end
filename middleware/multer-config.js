const multer = require("multer");
const sharp = require("sharp");

// Liste des types MIME des images acceptés
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

// Configuration du stockage des fichiers
const storage = multer.diskStorage({
    // Configuration du dossier de destination
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    //Configuration du nom du fichier
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, Date.now() + name + "." + extension);
    },
});

// Filtrage des types de fichiers acceptés
const fileFilter = (req, file, callback) => {
    const isValid = MIME_TYPES[file.mimetype];
    if (isValid) {
        callback(null, true);
    } else {
        callback(new Error("Type de fichier non pris en charge."), false);
    }
};

// Stockage d'un fichier image
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024, // Limite la taille des fichiers à 4 Mo
    },
    fileFilter: fileFilter,
}).single("image");

// Redimensionnement de l'image
const compressImage = (req, res, next) => {
    // Vérifie s'il y a bien un fichier
    if (!req.file) {
        return next();
    }

    //Récupère l'image
    const filePath = req.file.path;

    sharp(filePath)
        .resize({ height: 650, width: 500 })
        .webp({ quality: 85 })
        .toBuffer()
        .then((data) => {
            sharp(data)
                .toFile(filePath)
                .then(() => {
                    next();
                })
                .catch((error) => {
                    next(error);
                });
        })
        .catch((err) => {
            next(err);
        });
};

// Téléchargement de l'image
const uploadImage = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            if (err.code === "LIMIT_FILE_SIZE") {
                // Erreur de taille de fichier
                return res.status(400).json({
                    message:
                        "La taille du fichier est trop importante (4 Mo maximum).",
                });
            } else if (err.message === "Type de fichier non pris en charge.") {
                // Erreur de type de fichier non pris en charge
                return res.status(400).json({ message: err.message });
            } else {
                // Autre erreur
                return res.status(400).json({ message: err.message });
            }
        }

        next();
    });
};

module.exports = {
    uploadImage,
    compressImage,
};