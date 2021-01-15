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
    cookie: { maxAge: 36000000 }, // session time = 10 hours
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

const port = process.env.PORT || 5000;

// ---------------------------Authentication---------------------- //
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

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// ---------------------------Gameplay---------------------- //

const getUserId = async (req) => {
  const user = await knex
    .select('id')
    .from('users')
    .where('username', req.user.username);

  return user[0].id;
};

const getTable = async (req) => {
  const userId = await getUserId(req);
  const table = await knex
    .select('*')
    .from('games')
    .where('user_id', userId);

  return table;
};

app.get("/getTable", async (req, res) => {
  res.send(await getTable(req));
});

app.get("/dropTable", async () => {
  await knex.schema.dropTable("games");
});

app.get("/createTable", async () => {
  await knex.schema.createTable("games", (t) => {
    t.increments("id").primary().unsigned();
    t.string("board");
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.integer("user_id");
  });
});

app.post("/delete/:id", async (req, res) => {
  await knex("games").del().where({ id: req.params.id });
  const table = await getTable(req);
  await res.send(table);
});

app.post("/add/:board", async (req, res) => {
  const userId = await getUserId(req);
  const { board } = req.params;
  knex("games")
    .insert({ board, user_id: userId })
    .then(async () => {
      const table = await getTable(req);
      await res.send(table);
    });
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
