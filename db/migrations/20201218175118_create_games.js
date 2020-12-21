exports.up = (knex) => {
  return knex.schema.createTable("games", (t) => {
    t.increments("id").primary().unsigned();
    t.string("board");
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("games");
};
