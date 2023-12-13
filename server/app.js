require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRoutes');
const artRouter = require('./routers/artRoutes');
const authRouter = require('./routers/authRoutes');


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.static('../client'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', artRouter);

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

