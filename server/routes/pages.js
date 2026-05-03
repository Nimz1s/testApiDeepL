const express = require('express');
const router = express.Router();
const path = require('path');

// головна сторінка
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// друга сторінка
router.get('/flashcard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/pages/flashcard.html'));
});

module.exports = router;