const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log("Ok"));

// (/test)

app.get("/test", (req, res, next) => {
  res.json({ status: 200, message: "ok" });
});

// (/time)

app.get("/time", (req, res, next) => {
  let currentDate = new Date();
  res.json({
    status: 200,
    message: `${currentDate.getHours()}:${currentDate.getSeconds()}`,
  });
});

// (/Hello/ID)

app.get("/hello/:id", (req, res, next) => {
  res.json({ status: 200, message: `Hello, ${req.params.id}` });
});

// (/search?s=<SEARCH>)

app.get("/search", (req, res, next) => {
  if (req.query.s) {
    res.json({ status: 200, message: "ok", data: req.query.s });
  } else {
    res.status = 500;
    res.json({
      status: 500,
      error: true,
      message: "you have to provide a search",
    });
  }
});

// Movies Array

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

// Create

app.get("/movies/create", (req, res, next) => {
  res.json("CREATE");
});

// Read

app.get("/movies/read", (req, res, next) => {
  res.json({ status: 200, data: movies });
});

// Update

app.get("/movies/update", (req, res, next) => {
  res.json("UPDATE");
});

// Delete

app.get("/movies/delete", (req, res, next) => {
  res.json("DELETE");
});

// Read/by-date

app.get("/movies/read/by-date", (req, res, next) => {
  const sortMovies = movies.sort((a, b) => b.year - a.year);
  res.json({ status: 200, data: sortMovies });
});

// Read/by-rating

app.get("/movies/read/by-rating", (req, res, next) => {
  const sortMoviesR = movies.sort((a, b) => b.rating - a.rating);
  res.json({ status: 200, data: sortMoviesR });
});

// Read/by-title

app.get("/movies/read/by-title", (req, res, next) => {
  const sortMoviesT = movies.sort((a, b) => a.title.localeCompare(b.title));
  res.json({ status: 200, data: sortMoviesT });
});

// Read/id/

app.get("/movies/read/:id", (req, res, next) => {
  if (req.params.id < movies.length - 1) {
    res.json({ status: 200, data: movies[req.params.id] });
  } else {
    res.status = 404;
    res.json({
      status: 404,
      error: true,
      message: "the movie <ID> does not exist",
    });
  }
});

// Add

app.get("/movies/add", (req, res, next) => {
  if (
    req.query.title === "" ||
    req.query.year.length > 4 ||
    req.query.year === "" ||
    isNaN(req.query.year) === true ||
    isNaN(req.query.rating) === true
  ) {
    res.json({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  } else if (req.query.rating === "") {
    movies.push({
      title: req.query.title,
      year: parseInt(req.query.year),
      rating: 4,
    });
    res.json(movies);
  } else {
    movies.push({
      title: req.query.title,
      year: parseInt(req.query.year),
      rating: parseInt(req.query.rating),
    });
    res.json(movies);
  }
});

// Delete/id

app.get("/movies/delete/:id", (req, res, next) => {
  if (req.params.id < movies.length - 1) {
    movies.splice(req.params.id, 1);
    res.json(movies);
  } else {
    res.json({
      status: 404,
      error: true,
      message: "the movie <ID> does not exist",
    });
  }
});

// Update/id

app.get("/movies/update/:id", (req, res, next) => {
  if (req.query.title == undefined) {
    movies[req.params.id - 1].year = parseInt(req.query.year);
    movies[req.params.id - 1].rating = parent(req.query.rating);
    movies[req.params.id - 1].title = movies[req.params.id - 1].title;
    res.json(movies);
  } else if (req.query.year == undefined) {
    movies[req.params.id - 1].title = req.query.title;
    movies[req.params.id - 1].rating = parseInt(req.query.rating);
    movies[req.params.id - 1].year = movies[req.params.id - 1].year;
    res.json(movies);
  } else if (req.query.rating == undefined) {
    movies[req.params.id - 1].title = req.query.title;
    movies[req.params.id - 1].year = parseInt(req.query.year);
    movies[req.params.id - 1].rating = movies[req.params.id - 1].rating;
    res.json(movies);
  }
});
