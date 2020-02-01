const express = require('express')
const router = express.Router({
    mergeParams: true,
})
const db = require('../dbConfig')
const userModel = require('../models/user-model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const restricted = require('../middleware/restricted')
const secret = require('../config/secret')

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
            const token = await generateToken(user)
            res.status(200).json({message: `welcome, ${user.username}`, token: token})
        } else{
            res.status(401).json({message: 'unauthorized user'})
        }
    }

    catch(err){
        next(err)
    }
})

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d',
    }
    return jwt.sign(payload, secret.jwtSecret, options)
}

module.exports = router