
exports.up = async function(knex) {
    await knex.schema.createTable('users', tbl =>{
        tbl.increments()
        tbl.string('username').unique()
        tbl.string('password').notNullable()
        tbl.string('email').notNullable().unique()
    })

    await knex.schema.createTable('ingredients', tbl=>{
        tbl.increments()
        tbl.string('item')
    })

    await knex.schema.createTable('instructions', tbl=>{
        tbl.increments()
        tbl.string('step')
    })

    await knex.schema.createTable('meal_type', tbl=>{
        tbl.increments()
        tbl.string('type')
    })

    await knex.schema.createTable('recipes', tbl=>{
        tbl.increments()
        tbl.integer('userID')
            .notNullable()
            .references('id')
            .inTable('users')
        tbl.string('name')
        tbl.integer('mealID')
            .notNullable()
            .references('id')
            .inTable('meal')
        tbl.string('img')
        
    })

    await knex.schema.createTable('ingredients_list', tbl=>{
        tbl.integer('recipeId')
            .notNullable()
            .references('id')
            .inTable('recipes')
        tbl.integer('ingredientId')
            .references('id')
            .inTable('ingredients')
        tbl.float('ingredient_qty')
        tbl.primary(['recipeId', 'ingredientId'])
    })

    await knex.schema.createTable('instructions_list', tbl=>{
        tbl.integer('recipeId')
            .notNullable()
            .references('id')
            .inTable('recipes')
        tbl.integer('instructionId')
            .references('id')
            .inTable('instructions')
        tbl.primary(['recipeId', 'instructionId'])
    })

};


exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('instructions_list')
    await knex.schema.dropTableIfExists('ingredients_list')
    await knex.schema.dropTableIfExists('recipes')
    await knex.schema.dropTableIfExists('meal')
    await knex.schema.dropTableIfExists('instructions')
    await knex.schema.dropTableIfExists('ingredients')
    await knex.schema.dropTableIfExists('users')

};
