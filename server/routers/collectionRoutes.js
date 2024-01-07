const express = require("express");
const router = express.Router();
const artModel = require("../models/artModel.js");
const collectionModel = require("../models/collectionModel.js");

router.get("/", async (req, res) => {
  try {
    const isAuthenticated = req.oidc.isAuthenticated();
    if (isAuthenticated) {
      const artworks = await artModel.find({});
      const collections = await collectionModel.find({});
      res.render("./visitor/collection", {
        artworks: artworks,
        user: req.oidc.user,
        isAuthenticated: isAuthenticated,
        collections: collections,
      });
    } else {
      const artworks = await artModel.find({});
      res.render("./visitor/collection", {
        artworks: artworks,
        isAuthenticated: isAuthenticated,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
