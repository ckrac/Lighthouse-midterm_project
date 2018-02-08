
exports.up = function(knex, Promise) {
  return knex.schema.createTable('placeOrder', function (table) {
    table.increments();
    table.integer('customer_id').unsigned();
    table.foreign('customer_id').references('customer.id');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('placeOrder')
  ])
};
