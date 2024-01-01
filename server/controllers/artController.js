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
    const newArtwork = new Artwork({
        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        image: req.file.path,
        type: req.body.type,
    });

    await newArtwork
        .save()
        .then(() => res.json('Artwork added!'))
        .catch((err) => res.status(400).json(`Error: ${err}`));
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

        artwork.title = req.body.title;
        artwork.description = req.body.description;
        artwork.year = req.body.year;
        artwork.image = req.body.image;
        artwork.type = req.body.type;

        await artwork.save();

        res.json('Artwork updated!');
    } catch (err) {
        res.status(400).json(`Error: ${err.message}`);
    }
}

module.exports = {getAllArt, getArtById, createArt, deleteArt, updateArt};


