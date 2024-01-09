require('dotenv').config({path: '../../.env'});
const AlgoliaSearch = require('algoliasearch');
const { get} = require("axios");
const Artwork = require('../models/artModel.js');

const app_id = process.env.ALGOLIA_APP_ID;
const api_key = process.env.ALGOLIA_ADMIN_KEY;
const client = AlgoliaSearch(app_id, api_key);
const index = client.initIndex('artwork');
index.setSettings(
    {
        searchableAttributes: [
            'title',
            'artist',
            'year',
            'type',
            'objectID'
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


async function searchArtworks(query, filter) {
    try {
        if (filter === '' || filter === undefined || filter === null || filter === 'all') {
            const { hits } = await index.search(query);
            return hits;
        }
        else {
        const { hits } = await index.search(query,
            {
                restrictSearchableAttributes: [filter],
                advancedSyntax: true,
            });
        return hits;
        }
    } catch (error) {
        console.error('Error searching artworks:', error);
        throw error;
    }
}

async function saveArtwork(id) {
    try {
        // Use await to properly retrieve the artwork from MongoDB
        const artwork = await Artwork.findById(id).lean();
        console.log(artwork);
        if (artwork) {
            const object = await transformSingleForAlgolia(artwork);
            const { objectIDs } = await index.saveObject(object);
            console.log('Object saved with ID:', objectIDs);
        } else {
            console.error('Artwork not found with ID:', id);
        }
    } catch (error) {
        console.error('Error saving artwork:', error);
    }
}


async function deleteArtworks() {
    try {
        const { objectIDs } = await index.clearObjects();
        console.log('Objects deleted with IDs:', objectIDs);
    } catch (error) {
        console.error('Error deleting artworks:', error);
    }
}

async function saveArtworks() {
    try {
        let artworks_array = await fetch("http://localhost:3000/api/art/get");
        artworks_array = await artworks_array.json();
        const objects = await transformForAlgolia(artworks_array);
        const { objectIDs } = await index.saveObjects(objects);
        console.log('Objects saved with IDs:', objectIDs);
    } catch (error) {
        console.error('Error saving artworks:', error);
    }
}

async function deleteArtwork(id) {
    try {
        const { objectIDs } = await index.deleteObject(id);
        console.log('Object deleted with ID:', id);
    } catch (error) {
        console.error('Error deleting artwork:', error);
    }
}

async function transformForAlgolia(documents) {
    return documents.map(document => ({
        ...document,
        objectID: String(document._id), // Convert MongoDB _id to string for Algolia objectID
        _id: undefined, // Remove the original _id field
    }));
}

async function transformSingleForAlgolia(document) {
    return {
        ...document,
        objectID: String(document._id), // Convert MongoDB _id to string for Algolia objectID
        _id: undefined, // Remove the original _id field
    };
}


async function updateArtwork(id) {
    try {
        const artwork = await Artwork.findById(id).lean();
        console.log(artwork);
        const object = await transformSingleForAlgolia(artwork);
        const { objectIDs } = await index.partialUpdateObject(object);
        console.log('Object updated with ID:', id);
    } catch (error) {
        console.error('Error updating artwork:', error);
    }
}

module.exports = {
    searchArtworks,
    saveArtwork,
    deleteArtwork,
    updateArtwork,
    saveArtworks,
    deleteArtworks,
};

// deleteArtworks().then(() => saveArtworks());
