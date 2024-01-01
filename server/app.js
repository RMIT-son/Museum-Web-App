// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRoutes");
const artRouter = require("./routers/artRoutes");
const authRouter = require("./routers/authRoutes");
const {
  Types: { ObjectId },
} = require("mongoose");
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
const collectionModel = require("./models/collectionModel.js");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.engine("html", require("ejs").renderFile);
app.use(express.static("../client"));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", artRouter);
app.use("/", homepageRouter);

app.get("/form", async (req, res) => {
  try {
    const artworks = await artModel.find();
    res.render("form", {artworks: artworks});
  } catch (error) {
    console.error('Error fetching artworks:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.post("/form", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const title = req.body.title;
    const description = req.body.description;
    const type = req.body.type;
    // const artist = req.body.artist;
    const year = req.body.year;
    const imagePath = 'uploads/' + req.file.filename;

    const newArtwork = new artModel({
      title: title,
      description: description,
      image: imagePath,
      type: type,
      year: year,
    });

    await newArtwork.save();
    res.status(200);
    res.redirect("/form")
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
app.use("/personal-collection", personalCollectionRouter, (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
});
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.get("/login", (req, res) => {
  res.redirect("/auth/login");
});
app.get("/logout", (req, res) => {
  res.redirect("/auth/login");
});

// Like
app.post("/like/:artworkId", async (req, res) => {
  try {
    if (!req.oidc.isAuthenticated()) {
      return res.redirect("/login");
    }

    const { artworkId } = req.params;
    const userId = req.oidc.user.sid;

    const artwork = await artModel.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    if (!artwork.likes.includes(userId)) {
      artwork.likes.push(userId);
      await artwork.save();
      return res.status(200).json({ message: "Artwork liked successfully" });
    } else {
      artwork.likes.remove(userId);
      await artwork.save();
      return res.status(200).json({ message: "Artwork disliked successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Bookmark
app.post("/bookmark/:artworkId", async (req, res) => {
  try {
    if (!req.oidc.isAuthenticated()) {
      return res.redirect("/login");
    }

    const { artworkId } = req.params;
    const userId = req.oidc.user.sid;

    const artwork = await artModel.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    if (!artwork.bookmarks.includes(userId)) {
      artwork.bookmarks.push(userId);
      await artwork.save();
      return res.status(200).json({ message: "Artwork bookmark successfully" });
    } else {
      artwork.bookmarks.remove(userId);
      await artwork.save();
      return res
        .status(200)
        .json({ message: "Artwork disbookmark successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add new collection
app.post("/add-new-collection", async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.oidc.user.sid;

    if (!name) {
      return res.status(400).send("Collection name is required");
    }

    const newCollection = new collectionModel({
      name: name,
      user: user,
    });

    await newCollection.save();

    res.status(200).json({ name: newCollection.name });
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred while adding the collection");
  }
});


app.post("/add-to-collection/:artworkId", async (req, res) => {
  try {
    const { artworkId } = req.params;
    console.log(artworkId)
    let selectedCollectionIds = req.body.selectedCollections;

    if (!Array.isArray(selectedCollectionIds)) {
      selectedCollectionIds = [selectedCollectionIds];
    }

    selectedCollectionIds = selectedCollectionIds
      .map((id) => (ObjectId.isValid(id) ? new ObjectId(id) : null))
      .filter((id) => id !== null);

    const artwork = await artModel.findById(artworkId);

    if (!artwork) {
      return res.status(404).send("Artwork not found");
    }

    for (const collectionId of selectedCollectionIds) {
      const collection = await collectionModel.findById(collectionId);

      if (!collection) {
        continue;
      }

      collection.artwork.push(artwork);
      await collection.save();
    }

    res.status(200).send("Artwork added to collections successfully");
  } catch (error) {
    console.error("Error adding artwork to collection:", error);
    res.status(500).send("Server Error");
  }
});
