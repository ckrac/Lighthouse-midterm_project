exports.up = function(knex, Promise) {
  return knex.schema.table('orderList', function (table) {
    table.string('quantity');

  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orderList')
  ])
};
