const express = require("express");
const path = require("path");
const knex = require("../db/knex");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.get("/getTable", async (req, res) => {
  const bots = await knex.select("*").from("games");
  res.send(bots);
});

app.post("/add/:board", (req, res) => {
  const { board } = req.params;
  knex("games")
    .insert({ board })
    .then(() => {
      console.log("inserted");
    });
  console.log(board.split(","));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
