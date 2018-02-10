
exports.up = function(knex, Promise) {
  return knex.schema.table('placeOrder', function (table) {
    table.string('status');
    table.string('eta');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('placeOrder')
  ])
};
