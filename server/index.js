const express = require("express");

const app = express();
const path = require("path");

const PORT = process.env.port || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
