
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions_list').insert([
        {recipeId: 1, instructionId: 1},
        {recipeId: 1, instructionId: 2},
        {recipeId: 3, instructionId: 1}
      ]);
    });
};
