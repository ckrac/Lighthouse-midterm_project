
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orderList').del()
    .then(function () {
      return knex('placeOrder').del();
    }).then(function () {
        return knex('customer').del()
      }).then(function () {
          return knex('menu').del()
        })
};
