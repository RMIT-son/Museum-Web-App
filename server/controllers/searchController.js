const {searchArtworks} = require('../services/algolia');

async function search(req, res) {
    try {
        const filter = req.query.filter;
        const query = req.query.query;
        const isAuthenticated = req.oidc.isAuthenticated();
        const artworks = await searchArtworks(query, filter);
        res.render("./visitor/collection", { artworks: artworks, isAuthenticated: isAuthenticated, user: req.oidc.user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { search };