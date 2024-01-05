require('dotenv').config({path: '../../.env'});
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const URI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose
    .connect(URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

module.exports = mongoose;
