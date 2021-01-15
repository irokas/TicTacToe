exports.seed = (knex) => {
  return knex("games")
    .del()
    .then(() => {
      return knex("games").insert([{ board: "X,O,,X,O,,X,,", user_id: 2 }]);
    });
};
