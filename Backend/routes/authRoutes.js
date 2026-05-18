const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer'); // fotoğraf yükleme kütüphanesi

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // dosyaya fotoğraf yolla
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // doya isimlerini değiştir
    }
});
const upload = multer({ storage: storage });

router.post('/register', upload.single('profilePicture'), authController.register);
router.post('/login', authController.login);

module.exports = router;