//Customer Table

exports.up = function(knex, Promise) {
  return knex.schema.table('customer', function (table) {
    table.string('phone');
  });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('customer', function(table){
      table.dropColumn('phone');
    })
  ])
};
