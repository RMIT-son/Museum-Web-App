// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRoutes');
const artRouter = require('./routers/artRoutes');

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use('/', artRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

