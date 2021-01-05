module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://localhost/results",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },

  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },
};
