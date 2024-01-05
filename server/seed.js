const { User, Manager, Visitor} = require('./models/userModel');
const Artwork = require('./models/artModel');


const artData = [
    {
        title: "art1",
        description: "art1",
        image: null,
        type: "painting",
        artist: null,
        year: 2021
    },
    {
        title: "art2",
        description: "art2",
        image: null,
        type: "sculpture",
        artist: null,
        year: 2021
    }
];

Artwork.collection
    .drop()
    .then(() => {
        console.log("Art collection dropped");
        return Artwork.insertMany(artData);
    })
    .then(() => console.log("Art collection seeded"))
    .catch((err) => console.error(err));
