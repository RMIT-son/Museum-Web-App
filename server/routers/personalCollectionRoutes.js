const express = require("express");
const router = express.Router();
const artModel = require("../models/artModel.js");
const collectionModel = require("../models/collectionModel.js");

router.get("/", async (req, res) => {
  try {
    const collections = await collectionModel.find({}).populate("artwork");
    const artworks = await artModel.find({});
    res.render("./visitor/personal-collection", {
      user: req.oidc.user,
      collections: collections,
      artworks: artworks,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    res.status(500).send(`Error fetching collections: ${error.message}`);
  }
});

module.exports = router;
