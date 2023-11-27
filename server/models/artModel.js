const mongoose = require('../services/mongoose');

const artSchema = new mongoose.Schema({
    title: { type: String,
            required: true },
    description: { type: String,
                    required: true },
    price: { type: Number,
            required: true },
    image: { data: Buffer,
            contentType: String},
    type: { type: String,
            required: true,
            enum: ['painting', 'sculpture', 'photography', 'other'],
            default: 'painting' },
    }, { timestamps: true });

const Artwork = mongoose.model('artwork', artSchema);

module.exports = Artwork;

