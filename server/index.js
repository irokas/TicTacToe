const express = require("express");
const path = require("path");

const environment = process.env.NODE_ENV || "development"; // if something else isn't setting ENV, use development
const database = require("knex")(configuration); // connect to DB via knex using env's settings
const configuration = require("../knexfile")[environment]; // require environment's settings from knexfile

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
