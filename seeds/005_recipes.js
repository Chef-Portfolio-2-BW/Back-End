
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        {id: 1, userId:1,  name: 'lasagna', mealId: 3 },
        {id: 2, userId:1,  name: 'pancakes', mealId: 1 },
        {id: 3, userId:2,  name: 'meatball', mealId: 3 },
        {id: 4, userId:3,  name: 'BLT', mealId: 4 }
      ]);
    });
};
