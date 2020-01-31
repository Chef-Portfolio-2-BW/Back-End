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

async function addRecipe(payload){
    const [id] = await db('recipes').insert(payload)
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
    // await db('ingredients').insert({item: ingredient})
    ingredient.split(',').map(async ingred => await db('ingredients').insert({
        item: ingred
    }))
    
}

module.exports = {
    getRecipes,
    getRecipesById,
    addRecipe,
    remove,
    updateRecipe,
    addIngredients
}