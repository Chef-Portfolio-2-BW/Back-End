const db = require('../dbConfig')

function getRecipes(){

    return db('recipes as r')
    .join('users as u', 'u.id', 'r.userID')
    .join('meal_type as m', 'r.mealID', 'm.id')
    .select('r.id', 'r.name', 'r.img', 'm.type', 'u.username')

}

function myRecipes(userID){
    return db('recipes as r').where({userID})
}

function getRecipesById(id){
    return db('recipes').where({ id }).first()
}

function getIngredients(recipeId){
    return db('ingredients_list as l').where({recipeId})
        .join('ingredients as i', 'l.ingredientId', 'i.id')
        .join('recipes as r', 'r.id', 'l.recipeId')
        .select('name', 'item')
        
}

async function getInstructions(recipeId){
    const [inst] = await db('instructions_list as l').where({recipeId})
        .join('instructions as i', 'l.instructionId', 'i.id')
        .join('recipes as r', 'r.id', 'l.recipeId')
        .select('name', 'step')
    return inst
}

async function addRecipe(payload, ingredients, instructions){
    const [id] = await db('recipes').insert(payload)
    await addIngredients(ingredients)
    await addInstructions(instructions)
    await makeList(id, ingredients)
    await makeInstructions(id, instructions)
    return getRecipesById(id)
}

function remove(id){
    return db('recipes').where({ id }).del()
}

async function updateRecipe(id, recipe, instructions){
    await db('recipes').where({ id }).update(recipe)
    await db('instructions').where({ id }).update({step: instructions})
    await updateInstructions(id, instructions)
}


function addIngredients(ingredient){
    console.log(ingredient)
    ingredient.split(',').map(async ingred => await db('ingredients').insert({
        item: ingred
    })) 
}

function updateIngredients(id, ingredients){
    ingredients.split(',').map(async ingred => await db('ingredients').insert({
        item: ingred
    }))
    return makeList(id, ingredients)
}

function addInstructions(instruction){
    return db('instructions').insert({
        step: instruction
    })
}

async function makeInstructions(recipeId, step){
    const [{ id }] = await db('instructions').where({step}).select('id')
    console.log(step)
    await db('instructions_list').insert({
        recipeId: recipeId,
        instructionId: id
    })
}

async function updateInstructions(recipeId, instructions){
    const [{ instructionId }] = await db('instructions_list').where({ recipeId }).select('instructionId')
    const id = instructionId
    await db('instructions').where({id}).update({step: instructions})
}

async function makeList(recipeId, ingredients){
    console.log(ingredients)
    ingredients.split(',').map(async item => {
        const [{ id }]=  await db('ingredients').where({item}).select('id')
        console.log('ingredient ID in makelist: ', id)
        await db('ingredients_list').insert({
            recipeId: recipeId,
            ingredientId: id
        })
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
    makeList,
    myRecipes,
    updateIngredients,
    getIngredients,
    getInstructions
}