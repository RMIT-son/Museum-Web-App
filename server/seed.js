const User = require('/models/userModel');

const userData = [
    {
        name: "admin1",
        password: "admin1",
        email: "admin1@email.com",
        userType: "admin",
        profilePicture: null
    },
    {
        name: "user1",
        password: "user1",
        email: "user1@email.com",
        userType: "user",
        profilePicture: null
    }
];

User.collection
    .drop()
    .then(() => {
        console.log("User collection dropped");
        return User.insertMany(userData);
    })
    .then(() => console.log("User collection seeded"))
    .catch((err) => console.error(err));
