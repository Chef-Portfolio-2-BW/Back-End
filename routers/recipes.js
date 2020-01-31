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