const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, musicController.getSongs);
router.post('/', verifyToken, musicController.addSong);
router.delete('/:songName', verifyToken, musicController.deleteSong);

module.exports = router;