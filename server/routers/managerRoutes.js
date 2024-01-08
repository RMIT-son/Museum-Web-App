const express = require('express');
const router = express.Router();
const artRouter = require("./artRoutes")
const axios = require("axios");

router.get('/', async (req, res) => {
    try {
        let instance = axios.create({baseURL: `${req.protocol}://${req.get('host')}`});
        let artworks = await instance("/api/art/get")
        artworks = await artworks.data;
        res.render("./manager/manager", { artworks: artworks });
    } catch (error) {
        console.error('Error fetching artworks:', error.message);
        res.status(500).send('Internal Server Error');
    }
});
// router.get('/', async (req, res) => {
//     try {
//         let artworks = await fetch("http://localhost:3000/api/art/get")
//         artworks = await artworks.json()
//         res.render("./manager/manager2", { artworks: artworks });
//     } catch (error) {
//         console.error('Error fetching artworks:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// });

module.exports = router;