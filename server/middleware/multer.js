const multer = require('multer');
const GridFsStorage = require('multer');

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpeg'];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-image-${file.originalname}`;
            return { filename };
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-any-name-${file.originalname}`
        };
    }
});

const upload = multer({ storage });

module.exports = upload;
