const express = require('express');
const router = express.Router();
const collectionModel = require('../models/collectionModel.js');
const axios = require('axios');
const { getArtById } = require('../controllers/artController');

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id.trim();
        const isAuthenticated = req.oidc.isAuthenticated();
        const instance = axios.create({ baseURL: `${req.protocol}://${req.get('host')}` });
        let artwork = await instance(`/api/art/get/${id}`);
        artwork = await artwork.data;
        if (isAuthenticated) {
            const collections = await collectionModel.find({});
            res.render('./visitor/art-showcase-indi', {
                artwork: artwork,
                user: req.oidc.user,
                isAuthenticated: isAuthenticated,
                collections: collections,
            });
        } else {
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