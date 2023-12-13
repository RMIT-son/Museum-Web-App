const { User, Manager, Visitor} = require('./models/userModel');
const Artwork = require('./models/artModel');

const userData = [
    {
        name: "mana1",
        password: "mana1",
        email: "mana1@email.com",
        userType: "manager",
        profilePicture: null
    },
    {
        name: "mana2",
        password: "mana2",
        email: "mana1@email.com",
        userType: "manager",
        profilePicture: null
    }
];
console.log(Artwork);
Manager.collection
    .drop()
    .then(() => {
        console.log("User collection dropped");
        return Manager.insertMany(userData);
    })
    .then(() => console.log("User collection seeded"))
    .catch((err) => console.error(err));

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
        price: 200,
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
