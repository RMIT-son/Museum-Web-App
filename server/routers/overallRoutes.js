const express = require('express');
const router = express.Router();
const artModel = require("../models/artModel.js");

router.get('/', async (req, res) => {
    try {
        const artworks = await artModel.find({});
        res.render("./manager/overall", {artworks: artworks, user: req.oidc.user});
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;