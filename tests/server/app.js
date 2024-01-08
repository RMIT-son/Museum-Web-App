const express = require("express");
const cors = require("cors");
const AlgoliaSearch = require('algoliasearch');
const axios = require('axios');


const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("search");
});

const app_id = '77YVM2ITEQ';
const api_key = 'c1ccefb35119a91df62dec09c553ba8f';
const client = AlgoliaSearch(app_id, api_key);
const index = client.initIndex('artwork');
index.setSettings(
    {
        searchableAttributes: [
            'title',
            'artist',
            'year',
            'type',
        ],
        attributesForFaceting: [
            'artist',
            'year',
            'type',
        ],
    },
    (err, content) => {
        if (err) {
            console.error(err);
        }
        console.log(content);
    }
)


async function fetchArtworks() {
    try {
        const response = await axios.get('http://localhost:3000/api/art/get');
        console.log(response);
        return await response.data;
    } catch (error) {
        console.error('Error fetching artworks:', error);
        throw error;
    }
}

async function transformForAlgolia(documents) {
    return documents.map(document => ({
        ...document,
        objectID: String(document._id), // Convert MongoDB _id to string for Algolia objectID
        _id: undefined, // Remove the original _id field
    }));
}


async function saveArtworks() {
    try {
        const artworks_array = await fetchArtworks();
        const objects = await transformForAlgolia(artworks_array);
        const { objectIDs } = await index.saveObjects(objects);
        console.log('Objects saved with IDs:', objectIDs);
    } catch (error) {
        console.error('Error saving artworks:', error);
    }
}

async function searchArtworks(query, filter) {
    try {
        if (filter !== '' ) {
            console.log('is filtered');
            console.log(query);
            console.log(filter);
            console.log(index)
            const {hits} = await index.search(query,{
                restrictSearchableAttributes: [`${filter}`]
            });
            console.log(hits);
            return hits;
        }
        else {
            console.log('not filtered');
            console.log(query);
            console.log(filter);
            console.log(index)
            const { hits } = await index.search(query);
            console.log(hits);
            return hits;
        }
    } catch (error) {
        console.error('Error searching artworks:', error);
        throw error;
    }
}


app.get("/search", (req, res) => {
    const query = req.query.query;
    const filter = req.query.filter;

    searchArtworks(query, filter).then(artworks => {
        res.render("search", { artworks, query, filter });
        console.log(artworks);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);
});