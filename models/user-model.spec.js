const db = require('../dbConfig')
const userModel = require('../models/user-model')

beforeEach(async ()=>{
    await db.seed.run()
})

describe('testing user registration and login models', () =>{
    test('create a user', async ()=>{
        const payload ={
            username: 'dangtest',
            password: 'abc123',
            email: 'dangtest@testing.com'
        }
        const addUser = await userModel.addUser(payload)
        const newUser = await db('users').where({username: 'dangtest'}).select()
        const users = await db('users').select()
        expect(addUser.id).toBe(4)
        expect(newUser[0].username).toMatch(/dangtest/i)
        expect(users).toHaveLength(4)
        
        
    })

})