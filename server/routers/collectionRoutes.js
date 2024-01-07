const express = require('express');
const router = express.Router();
const { search } = require('../controllers/searchController');

router.get('/', (req, res) => search(req, res));

module.exports = router;