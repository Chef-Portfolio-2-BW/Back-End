const db = require('../dbConfig')

function getRecipes(){
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

module.exports = {
    getRecipes,
    getRecipesById,
    addRecipe,
    remove,
    updateRecipe
}