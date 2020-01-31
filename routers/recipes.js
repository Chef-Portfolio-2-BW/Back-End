const express = require('express')
const router = express.Router({
    mergeParams: true,
})
const db = require('../dbConfig')
const recipeModel = require('../models/recipe-model')

router.get('/', async(req,res,next)=>{
    try{
        res.json(await recipeModel.getRecipes())
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

router.post('/', async(req,res,next)=>{
    try{
        
        const recipe = req.body

        const ingredients = {
            item: req.body.ingredients
        }
        const instructions = {
            step: req.body.instructions
        }
        console.log(ingredients.item.split(','))
        // ingredients.item.split(',').map(item => recipeModel.addIngredients(item))
        await recipeModel.addIngredients(ingredients.item)
        res.json({message: 'ingredients added'})

    }
    catch(err){
        next(err)
    }
})


// router.post('/' async(req,res,next)=>{
//     try{

//     }
//     catch(err){
//         next(err)
//     }
// })

// router.post('/' async(req,res,next)=>{
//     try{

//     }
//     catch(err){
//         next(err)
//     }
// })
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