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
        price: req.body.price,
        image: req.file.path,
        type: req.body.type,
    });

    newArtwork
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
    Artwork.findById(req.params.id)
        .then((artwork) => {
            artwork.title = req.body.title;
            artwork.description = req.body.description;
            artwork.price = req.body.price;
            artwork.image = req.body.image;
            artwork.type = req.body.type;
            artwork
                .save()
                .then(() => res.json('Artwork updated!'))
                .catch((err) => res.status(400).json(`Error: ${err}`));
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
}

module.exports = {getAllArt, getArtById, createArt, deleteArt, updateArt};


