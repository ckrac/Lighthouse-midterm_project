
exports.seed = function(knex, Promise) {
  return knex('customer').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('customer').insert({id: 1, name: 'Kenneth Brown'}),
        knex('customer').insert({id: 2, name: 'Gabriel Pozo'}),
        knex('customer').insert({id: 3, name: 'Clark Racadio'})
      ]);
    });
};
