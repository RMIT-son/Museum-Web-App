const Artwork = require('../models/artModel');
const {saveArtwork, deleteArtwork, updateArtwork} = require('../services/algolia');

async function getAllArt(req, res) {
    Artwork.find()
        .then((artwork) => res.json(artwork))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function getArtById(req, res) {
    Artwork.findById(req.params.id)
        .then((artwork) => res.json(artwork))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function createArt(req, res) {
    try {
        const newArtwork = new Artwork({
            title: req.body.title,
            description: req.body.description,
            year: req.body.year,
            artist: req.body.artist,
            image: '/uploads/' + req.file.filename,
            type: req.body.type,
        });

        await newArtwork.save();
        await saveArtwork(newArtwork);
        res.json('Artwork added!');
    } catch (err) {
        res.status(400).json(`Error: ${err.message}`);
    }
}

async function deleteArt(req, res) {
    await deleteArtwork(req.params.id);
    Artwork.findByIdAndDelete(req.params.id)
        .then(() => res.json('Artwork deleted.'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

async function updateArt(req, res) {
    try {
        const artwork = await Artwork.findById(req.params.id);

        if (!artwork) {
            return res.status(404).json('Artwork not found');
        }

        if (req.body.title !== undefined) {
            artwork.title = req.body.title;
        }
        if (req.body.description !== undefined) {
            artwork.description = req.body.description;
        }
        if (req.body.year !== undefined) {
            artwork.year = req.body.year;
        }
        if (req.body.artist !== undefined) {
            artwork.artist = req.body.artist;
        }
        if (req.file !== undefined && req.file.filename !== undefined) {
            artwork.image = 'uploads/' + req.file.filename;
        }
        if (req.body.type !== undefined) {
            artwork.type = req.body.type;
        }

        // Save the updated artwork
        await artwork.save();
        await updateArtwork(artwork);

        res.json('Artwork updated!');
    } catch (err) {
        console.error('Error updating artwork:', err);
        res.status(400).json(`Error: ${err.message}`);
    }
}



module.exports = {getAllArt, getArtById, createArt, deleteArt, updateArt};


