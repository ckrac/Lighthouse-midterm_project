
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu').insert({id: 1, name: 'Burger', price: '9', description: 'Bacon ipsum dolor amet ham hock bacon salami picanha sausage.'}),
        knex('menu').insert({id: 2, name: 'Fries', price: '5', description: 'Doner kielbasa pancetta, salami chuck cow sausage chicken pork belly.'}),
        knex('menu').insert({id: 3, name: 'Piza', price: '8', description: 'T-bone burgdoggen bacon cupim shankle porchetta cow sirloin hamburger ham hock salami turkey.'}),
        knex('menu').insert({id: 4, name: 'Milk Shake', price: '4', description: 'Cow andouille pancetta tenderloin. Turkey meatball shank hamburger shoulder.'}),
        knex('menu').insert({id: 5, name: 'Soda', price: '3', description: 'Boudin spare ribs jowl venison ribeye.'})
      ]);
    });
};
