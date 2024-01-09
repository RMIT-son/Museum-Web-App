const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) and (req.oidc.user.email === "admin@museum.com") {
            res.redirect('manager');
    } else {
        res.render("index");
    }
});

module.exports = router;
