
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients_list').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients_list').insert([
        {recipeId: 1, ingredientId: 1, ingredient_qty: 2.0},
        {recipeId: 1, ingredientId: 2, ingredient_qty: 1.0},
        {recipeId: 3, ingredientId: 1, ingredient_qty: 1.5}
      ]);
    });
};
