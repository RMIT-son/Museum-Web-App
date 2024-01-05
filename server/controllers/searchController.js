const {searchArtworks, searchArtworksByType, searchArtworksByTitle, searchArtworksByArtist, searchArtworksByYear } = require('../services/algolia');

async function search(req, res) {
    const filter = req.query.filter;
    const query = req.query.query;

    if (filter === 'artist') {
        searchArtworksByArtist(query).then(artworks => {
            // res.render("search", { artworks, query });
            res.json(artworks);
            console.log(artworks);
        });
    }
    else if (filter === 'year') {
        searchArtworksByYear(query).then(artworks => {
            // res.render("search", { artworks, query });
            res.json(artworks);
            console.log(artworks);
        });
    }
    else if (filter === 'title') {
        searchArtworksByTitle(query).then(artworks => {
            // res.render("search", { artworks, query });
            res.json(artworks);
            console.log(artworks);
        });
    }
    else if (filter === 'type') {
        searchArtworksByType(query).then(artworks => {
            // res.render("search", { artworks, query });
            res.json(artworks);
            console.log(artworks);
        });
    }
    else {
        searchArtworks(query).then(artworks => {
            // res.render("search", { artworks, query });
            res.json(artworks);
            console.log(artworks);
        });
    }
}

module.exports = { search };