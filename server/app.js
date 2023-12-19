// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const artRouter = require("./routers/artRoutes");
const authRouter = require("./routers/authRoutes");

const homepageRouter = require("./routers/visitorRoutes");
const artShowCaseRouter = require("./routers/artShowCaseRouters");
const managerRouter = require("./routers/managerRoutes");
const overallRouter = require("./routers/overallRoutes");
const collectionListRouter = require("./routers/collectionListRoutes");
const collectionRouter = require("./routers/collectionRoutes");
const personalCollectionRouter = require("./routers/personalCollectionRoutes");
const path = require("path");
const upload = require("./middleware/multer.js");
const artModel = require("./models/artModel.js");

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.engine("html", require("ejs").renderFile);
app.use(express.static("client"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", artRouter);
app.use("/", homepageRouter);

app.get("/form", (req, res) => {
  res.render("./form");
});

app.post("/form", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      // Handle the case when no file is uploaded
      return res.status(400).send("No file uploaded.");
    }

    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    // const artist = req.body.artist;
    const year = req.body.year;
    const image = req.file.path;

    const newArtwork = new artModel({
      title: title,
      description: description,
      image: image,
      type: type,
      year: year,
    });

    await newArtwork.save();
    res.status(500).send('Upload successfully')
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while adding the product");
  }
});

app.use("/art-showcase", artShowCaseRouter);
app.use("/manager", managerRouter);
app.use("/overall", overallRouter);
app.use("/collection-list", collectionListRouter);
app.use("/collection", collectionRouter);
app.use("/personal-collection", personalCollectionRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
