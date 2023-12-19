const express = require('express');
const fs = require('fs');
const path = require('path');
const supertest = require('supertest');
const app = express();
const port = 3000;
const filePath = path.join(__dirname, 'tables.jpg'); // Replace with your actual file name and extension

require('dotenv').config({ path: '../.env' });
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');


const storage = new GridFsStorage({
    url: "mongodb+srv://root:pwd12345@museum-app.pxby5he.mongodb.net/?retryWrites=true&w=majority",
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

// Read the content of the file
const fileContent = fs.readFileSync(filePath);

app.post('/upload', upload.single('file'), (req, res) => {
    const uploadedFile = req.file;

    if (!uploadedFile) {
        return res.status(400).send('No file uploaded.');
    }

    const { filename, size, mimetype } = uploadedFile;

    res.status(200).json({
        filename,
        size,
        mimetype,
        message: 'File uploaded successfully.',
    });
});

// Start the Express app
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const request = supertest(app);

request
    .post('/upload')
    .attach('file', fileContent, 'tables.jpg')
    .expect(200)
    .end((err, res) => {
        if (err) throw err;

        // Check the response, e.g., res.body, for verification
        console.log(res.body);
    });