exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('concern');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('concern');
  })
};