const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const knex = require("../db/knex");
require("./passportConfig")(passport);

const app = express();
// ---------------------------Middleware---------------------- //
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
// ---------------------------Routing---------------------- //

const PORT = process.env.PORT || 5000;

app.post("/register", async (req, res) => {
  knex
    .select("*")
    .from("users")
    .where("username", req.body.username)
    .then(async (userList) => {
      if (userList.length === 0) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await knex("users")
          .insert({
            username: req.body.username,
            password: hashedPassword,
          })
          .then(() => {
            res.send("Successful Registration! Now you can Login");
          });
      } else {
        res.send("Username Exists! Try another");
      }
    });
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect("/");
    } else {
      req.logIn(user, (erro) => {
        if (erro) {
          return next(erro);
        }
        res.redirect("/");
      });
    }
  })(req, res, next);
});

app.get("/getUser", async (req, res) => {
  res.send(req.user);
});

const getTable = async () => {
  const table = await knex.select("*").from("games");

  return table;
};
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/getTable", async (req, res) => {
  const table = await knex.select("*").from("games");
  res.send(table);
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
