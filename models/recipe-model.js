const db = require('../dbConfig')

function getRecipes(){

    return db('recipes as r')
    .join('users as u', 'u.id', 'r.userID')
    .join('meal_type as m', 'r.mealID', 'm.id')
    .select('r.id', 'r.name', 'r.img', 'm.type', 'u.username')

}

function getRecipesById(id){
    return db('recipes').where({ id }).first()
}

async function addRecipe(payload, ingredients){
    const [id] = await db('recipes').insert(payload)
    await makeList(id, ingredients)
    return getRecipesById(id)
}

function remove(id){
    return db('recipes').where({ id }).del()
}

async function updateRecipe(id, payload){
    await db('recipes').where({ id }).update(payload)
}

function addIngredients(ingredient){
    console.log(ingredient)
    ingredient.split(',').map(async ingred => await db('ingredients').insert({
        item: ingred
    })) 
}

function addInstructions(instruction){
    instruction.split(',').map(async info => await db('instructions').insert({
        step: info
    }))
}

function makeList(recipeId, ingredientId){
    return db('ingredients_list').insert({
        recipeId: recipeId,
        ingredientId: ingredientId
    })
}




module.exports = {
    getRecipes,
    getRecipesById,
    addRecipe,
    remove,
    updateRecipe,
    addIngredients,
    addInstructions,
    makeList
}