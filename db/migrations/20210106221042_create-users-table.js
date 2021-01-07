exports.up = (knex) => {
  let createQuery = `CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    username TEXT,
    token TEXT,
    password TEXT,
    created_at TIMESTAMP
  )`;

  return knex.raw(createQuery);
};

exports.down = (knex) => {
  let dropQuery = `DROP TABLE users`;

  return knex.raw(dropQuery);
};
