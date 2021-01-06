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
    connection:
      "postgres://rvyndmeitruxxa:aa09cc19ca085f350eab4b7f86401019cf1c5425556ea39a5a4163af72b10cee@ec2-3-251-0-202.eu-west-1.compute.amazonaws.com:5432/d8tovifnpgq6ff",
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds/",
    },
  },
};
