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
        // Assuming you have a user ID available in req.user (you might need to handle authentication)
        // const userId = req.user._id;

        // Check if a profile picture was uploaded
        const profilePicture = req.file ? req.file : null;

        // Create the art object
        const newArtwork = new Artwork({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            type: req.body.type,
            profilePicture,
        });

        // Save the art object to the database
        await newArtwork.save();

        // Update the user's profile with the created art
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { arts: newArtwork._id } }, { new: true });

        res.json({ message: 'Artwork added successfully', artwork: newArtwork, user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
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


