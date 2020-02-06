const recipeModel = require('./recipe-model')
const db = require('../dbConfig')
const recipeArray = require('./data')

beforeEach(async ()=>{
    await db.seed.run()
})

describe("Tests the recipe models", ()=>{
    test('get all recipes', async ()=>{
        const res = await recipeModel.getRecipes()
        expect(res.length).toBe(4)
        expect.arrayContaining(recipeArray)
    })

    test('get my recipes for user 1', async ()=>{
        const res = await recipeModel.getRecipesById(1)
        expect(res.id).toBe(1)
         
    })

    test('add recipe', async ()=>{
        const recipe ={
            userID: 3,
            name: "mac and cheese",
            mealID: 3,
            img: "https://www.momontimeout.com/wp-content/uploads/2018/10/homemade-mac-and-cheese-recipe-titled.jpg",
        }
        const ingredients = "mac and cheese noodles, kraft cheese powder"
        const instructions = "follow instructions on box"
        await recipeModel.addRecipe(recipe, ingredients, instructions)
        const food = await db('recipes').select()
        expect(food).toHaveLength(5)
    })

    test('delete recipe', async ()=>{
        await recipeModel.remove(2)
        const food = await db('recipes').select()
        expect(food).toHaveLength(3)
    })

    test('update recipe', async ()=>{
        const recipe ={
            userID: 3,
            name: "mac and cheese",
            mealID: 3,
            img: "https://www.momontimeout.com/wp-content/uploads/2018/10/homemade-mac-and-cheese-recipe-titled.jpg",
        }
        const instructions = 'open box and throw everything in'
        await recipeModel.updateRecipe(1, recipe, instructions)
        const food = await db('recipes').where({id:1}).select()
        expect(food[0].name).toMatch(/mac and cheese/i)
    })
})
