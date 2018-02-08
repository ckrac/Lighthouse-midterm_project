//Customer Table

exports.up = function(knex, Promise) {
  return knex.schema.createTable('customer', function (table) {
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customer')
  ])
};
