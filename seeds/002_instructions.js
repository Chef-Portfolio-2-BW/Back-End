
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        {id: 1, step: 'add salt'},
        {id: 2, step: 'mix in sauce'},
        {id: 3, step: 'flip it once'}
      ]);
    });
};
