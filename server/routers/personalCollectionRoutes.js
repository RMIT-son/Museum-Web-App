const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("./visitor/personal-collection");
});

module.exports = router;