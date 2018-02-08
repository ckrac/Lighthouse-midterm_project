
exports.up = function(knex, Promise) {
    return knex.schema.createTable('menu', function (table) {
    table.increments();
    table.string('name');
    table.string('price');
    table.string('description');
  });

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('menu')
  ])
};
