require('dotenv').config({path: '../../.env'});
const express = require('express');
const { auth } = require('express-openid-connect');
const router = express.Router();


const secret = process.env.SECRET;
const baseURL = process.env.BASEURL;
const clientID = process.env.CLIENTID;
const issuerBaseURL = process.env.ISSUER;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: baseURL,
  clientID: clientID,
  issuerBaseURL: issuerBaseURL,
};

router.use(auth(config));

router.get('/auth', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out")

});

module.exports = router;
