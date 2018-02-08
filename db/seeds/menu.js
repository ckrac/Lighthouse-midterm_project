
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu').insert({id: 1, name: 'Burger', price: '9', descrdescription: 'Bacon ipsum dolor amet ham hock bacon salami picanha sausage.'}),
        knex('menu').insert({id: 2, name: 'Fries', price: '5', descrdescription: 'Doner kielbasa pancetta, salami chuck cow sausage chicken pork belly.'}),
        knex('menu').insert({id: 3, name: 'Piza', price: '8', descrdescription: 'T-bone burgdoggen bacon cupim shankle porchetta cow sirloin hamburger ham hock salami turkey.'}),
        knex('menu').insert({id: 4, name: 'Milk Shake', price: '4', descrdescription: 'Cow andouille pancetta tenderloin. Turkey meatball shank hamburger shoulder.'}),
        knex('menu').insert({id: 5, name: 'Soda', price: '3', descrdescription: 'Boudin spare ribs jowl venison ribeye.'})
      ]);
    });
};
