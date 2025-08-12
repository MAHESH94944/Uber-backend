require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/db");
const userRoutes = require("./routes/user.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/users", userRoutes);

connectDB();
module.exports = app;
