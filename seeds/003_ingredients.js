
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        {id: 1, item: 'eggs'},
        {id: 2, item: 'flour'},
        {id: 3, item: 'sugar'}
      ]);
    });
};
