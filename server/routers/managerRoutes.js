const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("./manager/manager2");
});

module.exports = router;