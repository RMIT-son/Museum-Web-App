const express = require("express");
const router = express.Router();
const artModel = require("../models/artModel.js");

router.get("/", async (req, res) => {
  try {
    const artworks = await artModel.find({});
    res.render("./visitor/art-showcase", {
      artworks: artworks,
      user: req.oidc.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
