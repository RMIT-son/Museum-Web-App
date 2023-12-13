const mongoose = require('../services/mongoose');

const artistSchema = new mongoose.Schema({
    name: { type: String,
            required: true },
    bio: { type: String,
           required: true },
    birthYear: { type: Number,
                 required: true },
    deathYear: { type: Number },
    }, { timestamps: true }
);

const Artist = mongoose.model('artist', artistSchema);
module.exports = Artist;