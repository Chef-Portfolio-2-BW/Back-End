const db = require('../dbConfig')

function getRecipes(){

    // do your JOINS in her
    return db('recipes') 
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

async function addIngredients(ingredient){
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