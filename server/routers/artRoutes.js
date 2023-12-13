const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {getAllArt, getArtById, createArt, deleteArt, updateArt} = require('../controllers/artController');

router.get('/api/art/get', (req, res) => getAllArt(req, res));
router.get('/api/art/get/:id', (req, res) => getArtById(req, res));
router.post('/api/art/create', (req, res) => createArt(req, res));
router.delete('/api/art/delete/:id', (req, res) => deleteArt(req, res));
router.put('/api/art/update/:id', (req, res) => updateArt(req, res));

router.post('/api/art/upload', upload.single('image'), async(req, res) => {
    try {
        const uploadedFile = req.file;
        // Process the file or store it as needed
        res.status(200).json({ message: 'File uploaded successfully', file: uploadedFile });
    } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
