exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("username");
    table.string("password");
  });
};
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users");
};
