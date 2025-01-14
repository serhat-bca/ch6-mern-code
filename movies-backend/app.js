const express = require("express");
const app = express();
const cors = require("cors");
// Movie model
const Movie = require("./models/movie");

// middleware for parsing body into js object
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const requestLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log("Request body:", req.body);
  console.log("------------");
  next();
};

// middleware for error handling
const errorHandler = (error, req, res, next) => {
  console.log("error message: ", error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

// utilize requestLogger middleware
app.use(requestLogger);

const port = 3001;

app.post("/api/movies", async (req, res, next) => {
  try {
    const { title, watchlist } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    } else {
      const movie = new Movie({ title, watchlist: watchlist || false });
      const savedMovie = await movie.save();
      res.json(savedMovie);
    }
  } catch (error) {
    next(error);
  }
});

app.get("/api/movies", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

app.get("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (error) {
    next(error);
  }
});

app.delete("/api/movies/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).json({ error: "Movie not found!" });
    } else {
      res
        .status(200)
        .json({ message: `The Movie [${movie.title}] deleted successfully.` });
    }
  } catch (error) {
    next(error);
  }
});

app.put("/api/movies/:id", async (req, res, next) => {
  try {
    const { title, watchlist } = req.body;
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, watchlist },
      { new: true, runValidators: true }
    );
    if (updatedMovie) {
      res.status(200).json(updatedMovie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("Whats up");
});

app.use(errorHandler);


module.exports = app;