const Artwork = require('../models/artModel');

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
            image: 'uploads/' + req.file.filename,
            type: req.body.type,
        });

        await newArtwork.save();
        res.json('Artwork added!');
    } catch (err) {
        res.status(400).json(`Error: ${err.message}`);
    }
}



async function deleteArt(req, res) {
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

        console.log('Received request body:', req.body);

        // Update only the fields that are present and not undefined in the request body
        if (req.body.title !== undefined) {
            artwork.title = req.body.title;
        }
        // Repeat for other fields...

        console.log('Updated artwork:', artwork);

        // Save the updated artwork
        await artwork.save();

        console.log('Artwork saved successfully.');

        res.json('Artwork updated!');
    } catch (err) {
        console.error('Error updating artwork:', err);
        res.status(400).json(`Error: ${err.message}`);
    }
}



module.exports = {getAllArt, getArtById, createArt, deleteArt, updateArt};


