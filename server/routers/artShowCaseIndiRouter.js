const express = require('express');
const router = express.Router();
const collectionModel = require('../models/collectionModel.js');
const { getArtById } = require('../controllers/artController');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id.trim();
        const isAuthenticated = req.oidc.isAuthenticated();
        if (isAuthenticated) {
            let artwork = await fetch(`http://localhost:3000/api/art/get/${id}`)
            artwork = await artwork.json();
            console.log(artwork);
            const collections = await collectionModel.find({});
            res.render('./visitor/art-showcase-indi', {
                artwork: artwork,
                user: req.oidc.user,
                isAuthenticated: isAuthenticated,
                collections: collections,
            });
        } else {
            let artwork = await fetch(`http://localhost:3000/api/art/get/${id}`);
            artwork = await artwork.json();
            console.log(artwork);
            res.render('./visitor/art-showcase-indi', {
                artwork: artwork,
                isAuthenticated: isAuthenticated,
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;