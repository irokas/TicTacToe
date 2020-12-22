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

app.get("/dropTable", async () => {
  await knex.schema.dropTable("games");
});

app.get("/createTable", async () => {
  await knex.schema.createTable("games", (t) => {
    t.increments("id").primary().unsigned();
    t.string("board");
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
});

app.post("/add/:board", (req, res) => {
  const { board } = req.params;
  knex("games")
    .insert({ board })
    .then(() => {
      console.log("inserted");
    });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
