const express = require("express");
const path = require("path");
const knex = require("../db/knex");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
