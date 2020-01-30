

exports.seed = async function(knex) {
  await knex('recipes').truncate()
  await knex('meal_type').truncate()
  await knex('instructions').truncate()
  await knex('ingredients').truncate()
  await knex('users').truncate()
}
