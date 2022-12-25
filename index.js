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
