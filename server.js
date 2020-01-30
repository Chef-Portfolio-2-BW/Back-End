const express = require('express');
const cors = require('cors')
const dbConfig = require('./dbConfig')
const welcomeRouter = require('./routers/welcome')
const recipeRouter = require('./routers/recipes')

const server = express();
server.use(cors())
server.use(express.json());

server.use('/', welcomeRouter)
server.use('/api/recipes', recipeRouter)


server.use((err, req, res, next)=>{
    console.log(err)
    res.status(500).json({message:'something went wrong'})
})


module.exports = server;