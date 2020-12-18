module.exports = {
  development: {
    client: "postgres",
    connection: "postgres://localhost/games",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/dev",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "postgres",
    connection: "postgres://localhost/games_test",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/test",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "postgres",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/production",
    },
    useNullAsDefault: true,
  },
};
