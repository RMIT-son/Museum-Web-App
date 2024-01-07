require('dotenv').config({path: '../../.env'});
const AlgoliaSearch = require('algoliasearch');
const {get} = require("axios");

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

async function saveArtwork(artwork) {
    try {
        const object = await transformForAlgolia(artwork);
        const { objectIDs } = await index.saveObject(object);
        console.log('Object saved with ID:', objectIDs);
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
        const artworks_array = await fetchArtworks();
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
        console.log('Object deleted with ID:', objectIDs);
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

async function fetchArtworks() {
    try {
        const response = await get('/api/art/get');
        console.log(response);
        return await response.data;
    } catch (error) {
        console.error('Error fetching artworks:', error);
        throw error;
    }
}

async function updateArtwork(artwork) {
    try {
        const object = await transformForAlgolia(artwork);
        const { objectIDs } = await index.partialUpdateObject(object);
        console.log('Object updated with ID:', objectIDs);
    } catch (error) {
        console.error('Error updating artwork:', error);
    }
}

module.exports = {
    searchArtworks,
    saveArtwork,
    deleteArtwork,
    updateArtwork
};

// deleteArtworks().then(r => console.log(r));
// saveArtworks().then(r => console.log(r));
