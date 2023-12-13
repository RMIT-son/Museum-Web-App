// require('dotenv').config({ path: '../.env' });
// const multer = require('multer');
// const {GridFsStorage} = require('multer-gridfs-storage');
//
// console.log(process.env.MONGODB_URI);
// const storage = new GridFsStorage({
//     url: "mongodb+srv://root:pwd12345@museum-app.pxby5he.mongodb.net/?retryWrites=true&w=majority",
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ['image/png', 'image/jpeg'];
//
//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-image-${file.originalname}`;
//             return { filename };
//         }
//
//         return {
//             bucketName: 'photos',
//             filename: `${Date.now()}-any-name-${file.originalname}`
//         };
//     }
// });
//
// const upload = multer({ storage });
// module.exports = upload;

const multer = require('multer');
const path = require('path');

// Set up Multer storage using disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the destination directory where the uploaded images will be stored
        const destinationPath = path.join(__dirname, '../uploads');
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        // Define the filename for the uploaded image
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

// Create the multer instance with the defined storage
const upload = multer({ storage });

module.exports = upload;

