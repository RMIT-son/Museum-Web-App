const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("./visitor/collection-list");
});

module.exports = router;