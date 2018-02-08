
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orderList', function (table) {
    table.integer('placeOrder_id').unsigned();
    table.foreign('placeOrder_id').references('placeOrder.id');
    table.integer('menu_id').unsigned();
    table.foreign('menu_id').references('menu.id');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('orderList')
  ])
};
