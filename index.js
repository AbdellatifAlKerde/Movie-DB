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
