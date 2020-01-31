const db = require('../dbConfig')
const bcrypt = require('bcryptjs')

function findUserById(id){
    return db('users').where({ id }).first()
}

async function addUser(payload){
    payload.password = await bcrypt.hash(payload.password, 14)
    const [id] = await db('users').insert(payload)
    return findUserById(id).select('id', 'username')

}

function findBy(username){
    return db('users').where({ username }).select('id', 'username', 'password')
}

module.exports = {
    addUser,
    findBy
}