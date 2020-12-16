const express = require("express");

const app = express();
const path = require("path");

const port = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
