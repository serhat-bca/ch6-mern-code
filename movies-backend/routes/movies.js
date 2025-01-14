const express = require("express");
const moviesRouter = express.Router();
const Movie = require("../models/movie");

moviesRouter.post("/", async (req, res, next) => {
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

moviesRouter.get("/", async (req, res) => {
  const movies = await Movie.find({});
  res.json(movies);
});

moviesRouter.get("/:id", async (req, res, next) => {
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

moviesRouter.delete("/:id", async (req, res, next) => {
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

moviesRouter.put("/:id", async (req, res, next) => {
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

module.exports = moviesRouter;
