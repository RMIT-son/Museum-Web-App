const express = require("express");
const router = express.Router();
const artModel = require("../models/artModel.js");

router.get("/", async (req, res) => {
  const artworks = await artModel.find({});
  res.render("./visitor/personal-collection", {
    user: req.oidc.user,
    artworks: artworks,
  });
});

module.exports = router;
