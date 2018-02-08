
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orderList').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('orderList').insert({placeOrder_id: 2, menu_id: 1}),
        knex('orderList').insert({placeOrder_id: 2, menu_id: 2}),
        knex('orderList').insert({placeOrder_id: 2, menu_id: 4}),
      ]);
    });
};
