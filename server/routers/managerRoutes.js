require("dotenv").config({ path: "../../.env" });
const express = require("express");
const { UnauthorizedError } = require("express-oauth2-jwt-bearer");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    if (req.oidc.isAuthenticated()) {
      if (req.oidc.user.email === "admin@museum.com") {
        res.render("./manager/manager", { user: req.oidc.user });
      }
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
