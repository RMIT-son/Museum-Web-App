const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();
    if (req.oidc.isAuthenticated() && req.oidc.user.email === "admin@museum.com") {
            res.redirect('manager');
    } else {
          res.render("index", {isAuthenticated: isAuthenticated});
    }
});

module.exports = router;
