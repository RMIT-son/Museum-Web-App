require('dotenv').config();
const express = require('express');
const { auth } = require('express-openid-connect');
const router = express.Router();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

router.use(auth(config));

router.get('/auth', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out")

});

module.exports = router;
