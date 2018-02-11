exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('menu').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('menu').insert({id: 1, name: 'Burger', price: '9', description: 'Three lbs angus beef, hot off the grill, house made special sauce, and placed on a soft, toasted bun.'}),
        knex('menu').insert({id: 2, name: 'Fries', price: '5', description: 'Fresh cut large fries drenched in garlic parmesan sauce.'}),
        knex('menu').insert({id: 3, name: 'Pizza', price: '8', description: 'Capicollo, fior di latte, marinated red onions, fresh chilli peppers, garlic infused olive oil, grana padano, chive.'}),
        knex('menu').insert({id: 4, name: 'Milk Shake', price: '5', description: 'Kitchen sink milk shake with all your favorite toppings.'}),
        knex('menu').insert({id: 5, name: 'Soda', price: '3', description: 'Hand picked oranges from our garden. Freshly squeez upon order.'})
      ]);
    });
};