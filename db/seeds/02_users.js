exports.seed = (knex) => {
  return knex("users")
    .del()
    .then(() => {
      return knex('users').insert([
        {
          username: 'irokasidiari',
          password:
            '$2b$10$rWkjEz1nMpasxVqRMoQuVOR3jsQdt8e2W/130odWVBJIRxVC2VtZG',
        },
      ]);
    });
};
