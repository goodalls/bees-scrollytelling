exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('location');
      table.string('age');

      table.timestamps(true, true);
    }),
    //each user can have many questions answered
    knex.schema.createTable('bees', function(table) {
      table.increments('id').primary();
      table.string('question');
      table.string('user_answer');
      table.integer('users_id').unsigned();
      table.foreign('users_id').references('users.id');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('bees'),
    knex.schema.dropTable('users')
  ]);
};
