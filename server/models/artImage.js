const mongoose = require('../services/mongoose');
const upload = require('../middleware/multer');

const artImageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
});

const ArtImage = mongoose.model('artImage', artImageSchema);

module.exports = ArtImage;
