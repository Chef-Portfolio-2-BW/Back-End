const express = require('express')
const router = express.Router({
    mergeParams: true,
})
const db = require('../dbConfig')
const recipeModel = require('../models/recipe-model')
const restricted = require('../middleware/restricted')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')



router.get('/', async(req,res,next)=>{
    try{
        res.json(await recipeModel.getRecipes())
    }
    catch(err){
        next(err)
    }
})

router.get('/myrecipes', async(req,res,next)=>{
    try{
        const token = req.headers.authorization
        const username = jwt.decode(token, secret.jwtSecret)['username']

        const [{id}] = await db('users').where({username}).select('id')
        console.log(id)

        res.json(await recipeModel.myRecipes(id))

    }
    catch(err){
        next(err)
    }
})

router.get('/:id', async(req,res,next)=>{
    try{
        res.json(await recipeModel.getRecipesById(req.params.id))
    }
    catch(err){
        next(err)
    }
})

router.post('/', restricted, async(req,res,next)=>{
    try{
        const token = req.headers.authorization
        const username = jwt.decode(token, secret.jwtSecret)['username']

        const [{id}] = await db('users').where({username}).select('id')
 
        const recipe = {
            name: req.body.name,
            img: req.body.img,
            mealID: req.body.category,
            userID: id
        }

        const ingredients = {
            item: req.body.ingredients
        }
        const instructions = {
            step: req.body.instructions
        }

        await recipeModel.addRecipe(recipe, ingredients.item, instructions.step)

        res.json({message: 'recipe added'})

    }
    catch(err){
        next(err)
    }
})


router.put('/:id', async(req,res,next)=>{
    try{
        const payload = req.body
        res.status(200).json(await recipeModel.updateRecipe(payload))
    }
    catch(err){
        next(err)
    }
})

router.delete('/:id', async(req,res,next)=>{
    try{
        await recipeModel.remove(req.params.id)
        res.status(200).json({message: 'recipe has been deleted'})
    }
    catch(err){
        next(err)
    }
})


module.exports = router