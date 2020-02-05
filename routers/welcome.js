const express = require('express')
const router = express.Router()


router.get('/', async(req,res,next)=>{
    try{
        res.json({message:'welcome to the API'})
        // res.send()
    }
    catch(err){
        next(err)
    }
})

module.exports = router