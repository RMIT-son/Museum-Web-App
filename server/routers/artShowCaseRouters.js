const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("./visitor/art-showcase");
});

module.exports = router;