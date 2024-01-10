require("dotenv").config({ path: "../../.env" });
const express = require("express");
const { UnauthorizedError } = require("express-oauth2-jwt-bearer");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let instance = axios.create({
        baseURL: `${req.protocol}://${req.get("host")}`,
    });
    let artworks = await instance("/api/art/get");
    artworks = await artworks.data;
    if ((req.oidc.isAuthenticated) && (req.oidc.user.email === "admin@museum.com")) {
        res.render("./manager/manager", {artworks: artworks, user: req.oidc.user });
    } else {
        res.send("You are not authorized to view this page.");
    }
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/overall", async (req, res) => {
  try {
    let instance = axios.create({
      baseURL: `${req.protocol}://${req.get("host")}`,
    });
    let artworks = await instance("/api/art/get");
    artworks = await artworks.data;
    res.render("./manager/manager", {
      artworks: artworks,
      user: req.oidc.user,
    });
  } catch (error) {
    console.error("Error fetching artworks:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
