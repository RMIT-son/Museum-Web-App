const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const isAuthenticated = req.oidc.isAuthenticated();
    res.render("index", {isAuthenticated: isAuthenticated});
});

module.exports = router;
