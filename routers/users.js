const express = require('express')
const router = express.Router({
    mergeParams: true,
})
const db = require('../dbConfig')
const userModel = require('../models/user-model')
const bcrypt = require('bcryptjs')

router.post('/register', async(req,res,next)=>{
    try{
        const user = req.body
        res.status(200).json(await userModel.addUser(user))
    }
    catch(err){
        next(err)
    }
})

router.post('/login', async(req,res,next)=>{
    try{
        const { username, password } = req.body
        const user = await userModel.findBy(username).first()
        const passwordValid = await bcrypt.compare(password, user.password)

        if(user && passwordValid){
            res.status(200).json({message: `welcome, ${user.username}`})
        } else{
            res.status(401).json({message: 'unauthorized user'})
        }
    }

    catch(err){
        next(err)
    }
})

module.exports = router