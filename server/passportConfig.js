const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const knex = require("../db/knex");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((username, password, done) => {
      knex
        .select("*")
        .from("users")
        .where("username", username)
        .then((userList) => {
          if (!userList.length) {
            return done(null, false);
          }

          bcrypt.compare(password, userList[0].password, (err, result) => {
            if (err) throw err;
            if (result) {
              return done(null, userList[0]);
            }

            return done(null, false);
          });
        });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    knex
      .select("*")
      .from("users")
      .where("id", id)
      .then(async (userList) => {
        if (userList.length) {
          cb(null, { username: userList[0].username });
        } else {
          console.log("error in deserialize");
          cb(null, false);
        }
      });
  });
};
