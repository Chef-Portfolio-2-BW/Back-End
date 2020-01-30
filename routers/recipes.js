const express = require('express')
const router = express.Router()
const db = require('../dbConfig')

router.get('/', async(req,res,next)=>{
    try{
        res.json(await db('recipes'))
    }
    catch(err){
        next(err)
    }
})

module.exports = router