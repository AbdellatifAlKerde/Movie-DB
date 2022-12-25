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
