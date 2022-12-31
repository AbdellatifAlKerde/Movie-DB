// require("dotenv").config();

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to Database"));

// app.use(express.json());

// const moviesRouter = require("./routers/datas");
// app.use("/data", moviesRouter);

// app.listen(3000, () => console.log("Server Started"));

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connect to the database
mongoose.set("strictQuery", true);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to Database");
});

// Import routes

const userRoute = require("./routers/user");
const postRoute = require("./routers/posts");
const moviesRouter = require("./routers/datas");

// Middleware

app.use(express.json());

// Route middleware

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/data", moviesRouter);

app.listen(3000, () => console.log("Server Started"));
