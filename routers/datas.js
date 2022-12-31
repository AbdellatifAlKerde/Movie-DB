const { json } = require("body-parser");

const express = require("express");
const router = express.Router();
const Movies = require("../models/data");

router.get("/", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getMovies, (req, res) => {
  res.json(res.movie);
});

router.post("/", async (req, res) => {
  const movie = new Movies({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
  });
  // console.log(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getMovies, async (req, res) => {
  if (req.body.title != null) {
    res.movie.title = req.body.title;
  } else if (req.body.year != null) {
    res.movie.year = req.body.year;
  } else if (req.body.rating != null) {
    res.movie.rating = req.body.rating;
  }
  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getMovies, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMovies(req, res, next) {
  let movie;
  try {
    movie = await Movies.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  next();
}

module.exports = router;
