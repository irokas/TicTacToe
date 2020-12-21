const environment = process.env.ENVIRONMENT || "development";
const kn = require("knex");
const knexfile = require("../knexfile");

const knex = kn(knexfile[environment]);

module.exports = knex;
