const {searchArtworks} = require('../services/algolia');

async function search(req, res) {
    const query = req.query.query;
    searchArtworks(query).then(artworks => {
        res.json(artworks)
    });
}

module.exports = { search };