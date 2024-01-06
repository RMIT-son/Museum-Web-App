// require('dotenv').config({path: '../../.env'});
// const AlgoliaSearch = require('algoliasearch');
// const {get} = require("axios");

// const app_id = process.env.ALGOLIA_APP_ID;
// const api_key = process.env.ALGOLIA_ADMIN_KEY;
// const client = AlgoliaSearch(app_id, api_key);
// const index = client.initIndex('artwork');


// async function searchArtworks(query) {
//     try {
//         const { hits } = await index.search(query);
//         return hits;
//     } catch (error) {
//         console.error('Error searching artworks:', error);
//         throw error;
//     }
// }

// async function searchArtworksByArtist(query) {
//     try {
//         const { hits } = await index.search(query, {
//             filters: 'artist: ' + query,
//         });
//         return hits;
//     } catch (error) {
//         console.error('Error searching artworks:', error);
//         throw error;
//     }
// }

// async function searchArtworksByYear(query) {
//     try {
//         const { hits } = await index.search(query, {
//             filters: 'year: ' + query,
//         });
//         return hits;
//     } catch (error) {
//         console.error('Error searching artworks:', error);
//         throw error;
//     }
// }

// async function searchArtworksByTitle(query) {
//     try {
//         const { hits } = await index.search(query, {
//             filters: 'title: ' + query,
//         });
//         return hits;
//     } catch (error) {
//         console.error('Error searching artworks:', error);
//         throw error;
//     }
// }

// async function searchArtworksByType(query) {
//     try {
//         const { hits } = await index.search(query, {
//             filters: 'type: ' + query,
//         });
//         return hits;
//     } catch (error) {
//         console.error('Error searching artworks:', error);
//         throw error;
//     }
// }

// async function saveArtwork(artwork) {
//     try {
//         const object = await transformForAlgolia(artwork);
//         const { objectIDs } = await index.saveObject(object);
//         console.log('Object saved with ID:', objectIDs);
//     } catch (error) {
//         console.error('Error saving artwork:', error);
//     }
// }

// async function deleteArtworks() {
//     try {
//         const { objectIDs } = await index.clearObjects();
//         console.log('Objects deleted with IDs:', objectIDs);
//     } catch (error) {
//         console.error('Error deleting artworks:', error);
//     }
// }

// async function saveArtworks() {
//     try {
//         const artworks_array = await fetchArtworks();
//         const objects = await transformForAlgolia(artworks_array);
//         const { objectIDs } = await index.saveObjects(objects);
//         console.log('Objects saved with IDs:', objectIDs);
//     } catch (error) {
//         console.error('Error saving artworks:', error);
//     }
// }

// async function deleteArtwork(id) {
//     try {
//         const { objectIDs } = await index.deleteObject(id);
//         console.log('Object deleted with ID:', objectIDs);
//     } catch (error) {
//         console.error('Error deleting artwork:', error);
//     }
// }

// async function transformForAlgolia(documents) {
//     return documents.map(document => ({
//         ...document,
//         objectID: String(document._id), // Convert MongoDB _id to string for Algolia objectID
//         _id: undefined, // Remove the original _id field
//     }));
// }

// async function fetchArtworks() {
//     try {
//         const response = await get('http://localhost:3000/api/art/get');
//         console.log(response);
//         return await response.data;
//     } catch (error) {
//         console.error('Error fetching artworks:', error);
//         throw error;
//     }
// }

// module.exports = {
//     searchArtworks,
//     deleteArtworks,
//     saveArtworks,
//     deleteArtwork,
//     fetchArtworks,
//     searchArtworksByArtist,
//     searchArtworksByTitle,
//     searchArtworksByYear,
//     searchArtworksByType
// };