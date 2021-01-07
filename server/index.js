const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const knex = require("../db/knex");

const SECRET = "something_secret";
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

// app.post("/login", (request, response) => {
//   knex("users")
//     .where({ username: request.body.username })
//     .first()
//     .then((user) => {
//       if (!user) {
//         response.status(401).json({
//           error: "No user by that name",
//         });
//       } else {
//         return bcrypt
//           .compare(request.body.password, user.password_digest)
//           .then((isAuthenticated) => {
//             if (!isAuthenticated) {
//               response.status(401).json({
//                 error: "Unauthorized Access!",
//               });
//             } else {
//               return jwt.sign(user, SECRET, (error, token) => {
//                 response.status(200).json({ token });
//               });
//             }
//           });
//       }
//     });
// });

// app.get("/verify", (request, response) => {
//   const token = request.headers.authorization.split(" ")[1];
//   jwt.verify(token, SECRET, (error, decodedToken) => {
//     if (error) {
//       response.status(401).json({
//         message: "Unauthorized Access!",
//       });
//     } else {
//       response.status(200).json({
//         id: decodedToken.id,
//         username: decodedToken.username,
//       });
//     }
//   });
// });

// app.post("/users", (request, response, next) => {
//   bcrypt.hash(request.body.password, 10).then((hashedPassword) => {
//     return knex("users")
//       .insert({
//         username: request.body.username,
//         password: hashedPassword,
//       })
//       .returning(["id", "username"])
//       .then((users) => {
//         response.json(users[0]);
//       })
//       .catch((error) => next(error));
//   });
// });

// app.get("/users", (request, response) => {
//   knex("users").then((users) => {
//     response.json(users);
//   });
// });

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
