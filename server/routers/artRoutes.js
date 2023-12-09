const express = require('express');
const router = express.Router();
const {getAllArt, getArtById, createArt, deleteArt, updateArt} = require('../controllers/artController');

router.get('/api/art/get', (req, res) => getAllArt(req, res));
router.get('/api/art/get/:id', (req, res) => getArtById(req, res));
router.post('/api/art/create', (req, res) => createArt(req, res));
router.delete('/api/art/delete/:id', (req, res) => deleteArt(req, res));
router.put('/api/art/update/:id', (req, res) => updateArt(req, res));

module.exports = router;