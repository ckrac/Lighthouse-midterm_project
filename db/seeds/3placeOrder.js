
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('placeOrder').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('placeOrder').insert({id: 1, customer_id: '1'}),
        knex('placeOrder').insert({id: 2, customer_id: '2'}),

      ]);
    });
};
