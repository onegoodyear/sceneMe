const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MediaSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    poster: {
      type: String,
    },
    imdbID: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const ListSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    items: {
      type: [MediaSchema],
    },
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);
module.exports = List;
