const mongoose = require('../services/mongoose');

const artSchema = new mongoose.Schema({
    title: { type: String,
            required: true },
    description: { type: String,
                    required: true },
    image: { type: mongoose.Schema.Types.ObjectId,
            ref: 'artImage' },
    type: { type: String,
            required: true,
            enum: ['painting', 'sculpture', 'photography', 'other'],
            default: 'painting' },
    artist: { type: mongoose.Schema.Types.ObjectId,
              ref: 'artist' },
    year: { type: Number,
            required: true },
    }, { timestamps: true });

const Artwork = mongoose.model('artwork', artSchema);

module.exports = Artwork;

