require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
const URI = process.env.MONGODB_URI || "mongodb+srv://root:pwd12345@museum-app.pxby5he.mongodb.net/?retryWrites=true&w=majority";
console.log(process.env);
console.log(URI);

// Connect to MongoDB Atlas
mongoose
    .connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

module.exports = mongoose;
