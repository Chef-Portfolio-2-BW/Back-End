const express = require('express');
const cors = require('cors')
const dbConfig = require('./dbConfig')
const welcomeRouter = require('./routers/welcome')
const recipeRouter = require('./routers/recipes')
const userRouter = require('./routers/users')


const server = express();
server.use(cors())
server.use(express.json());

server.use('/', welcomeRouter)
server.use('/api/recipes', recipeRouter)
server.use('/api/auth', userRouter)



server.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).json({message:'something went wrong'})
})


module.exports = server;