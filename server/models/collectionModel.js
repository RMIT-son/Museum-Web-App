const mongoose = require("../services/mongoose");

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    require: true,
    ref: "User",
  },
  artwork: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    },
  ],
});

const Collection = mongoose.model("collection", collectionSchema);

module.exports = Collection;