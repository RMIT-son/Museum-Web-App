const mongoose = require("../services/mongoose");

const artSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    type: {
      type: String,
      required: true,
      enum: ["painting", "sculpture", "photography", "other"],
      default: "painting",
    },
    artist: { type: String },
    year: { type: Number, required: true },
    likes: [{ type: String, ref: 'User' }],
    bookmarks: [{ type: String, ref: 'User' }],
  },
  { timestamps: true }
);

const Artwork = mongoose.model("artwork", artSchema);

module.exports = Artwork;
