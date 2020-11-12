const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://vivek:" + process.env.MONGO_ATLAS_PW + "@vivekcluster.mxgf5.mongodb.net/vivekdb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to database');
})
  .catch((error) => {
    console.log('Connection failed! ' + error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

/* app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS");
  next();
}); */

app.use("/api/posts", postsRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"))
});

module.exports = app;
