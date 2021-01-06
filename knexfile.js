module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/results",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },
};
