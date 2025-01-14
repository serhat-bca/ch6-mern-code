// require dotenv
require("dotenv").config();
// require mongoose
const mongoose = require("mongoose");

const DB_URI = process.env.MONGODB_URI;
// mongoose setup and connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URI)
  .then(() => console.log("DB Connection Established"))
  .catch((e) => {
    console.log("Error connecting the DB: ", e.message);
  });

// create movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 2 },
  watchlist: Boolean,
});

// configure toJSON method
movieSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

// create mongoose model
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
