const express = require("express");
const path = require("path");
const knex = require("../db/knex");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

const getTable = async () => {
  const table = await knex.select("*").from("games");

  return table;
};

app.get("/getTable", async (req, res) => {
  const table = await knex.select("*").from("games");
  res.send(table);
});

// app.get("/dropTable", async () => {
//   await knex.schema.dropTable("games");
// });

// app.get("/createTable", async () => {
//   await knex.schema.createTable("games", (t) => {
//     t.increments("id").primary().unsigned();
//     t.string("board");
//     t.timestamp("created_at").defaultTo(knex.fn.now());
//   });
// });

app.post("/delete/:id", async (req, res) => {
  await knex("games").del().where({ id: req.params.id });
  const table = await getTable();
  await res.send(table);
});

app.post("/add/:board", async (req, res) => {
  const { board } = req.params;
  knex("games")
    .insert({ board })
    .then(async () => {
      const table = await getTable();
      await res.send(table);
    });
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
