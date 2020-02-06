const supertest = require('supertest')
const server = require('./index')
const db = require('./dbConfig')



beforeEach(async ()=>{
    await db.seed.run()
})

let token; 

beforeAll((done) => {
    supertest(server)
      .post('/api/auth/login')
      .send({
        username: 'dang',
        password: 'abc123',
      })
      .end((err, response) => {
        token = response.body.token; // save the token!
        done();
      });
  });

describe("Tests the welcome route", ()=>{

    test('welcome', async ()=>{
        const res = await supertest(server).get('/')
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.message).toMatch(/welcome to the api/i)
    })
})

describe('Test the user registration and login flow', ()=>{

    test('test the registration flow', async ()=>{
        const payload = {
            username: 'dangtest1',
            password: 'abc123',
            email: 'dangtest1@testing.com'
        }
        const res = await supertest(server)
            .post('/api/auth/register')
            .send(payload)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.id).toBeTruthy()
    })

    test('user login receiving token', async ()=>{
        const user ={
            username: 'dang',
            password: 'abc123'
        }
        const res = await supertest(server)
            .post('/api/auth/login')
            .send(user)
        expect(res.status).toBe(200)
        expect(res.type).toBe('application/json')
        expect(res.body.token).toBeTruthy()
    })

})

describe('testing recipe endpoints', ()=>{

    test('add new recipe while logged in', async ()=>{
        const recipe ={
            name: "fish and ice cream",
            category:2,
            userID: 1,
            img: "https://www.momontimeout.com/wp-content/uploads/2018/10/homemade-mac-and-cheese-recipe-titled.jpg",
            ingredients: "cream,vanilla",
            instructions: "mix it and put on ice"
        }
        const res = await supertest(server)
            .post('/api/recipes')
            .send(recipe)
            .set('Authorization', token)
                .then((response)=>{
                    expect(response.statusCode).toBe(200)
                    expect(response.type).toBe('application/json')
                })
            
    })    

    test('update recipe while logged in', async ()=>{
        const recipe ={
            name: "FISH and ICE cream",
            category:2,
            img: "https://www.momontimeout.com/wp-content/uploads/2018/10/homemade-mac-and-cheese-recipe-titled.jpg",
            ingredients: "cream,vanilla",
            instructions: "mix it and put on ice"
        }
        const res = await supertest(server)
            .put('/api/recipes/1')
            .send(recipe)
            .set('Authorization', token)
                .then((response)=>{
                    expect(response.statusCode).toBe(200)
                    expect(response.type).toBe('application/json')
                })
            
    })  

    test('delete recipe while logged in', async ()=>{
        const res = await supertest(server)
            .delete('/api/recipes/1')
            .set('Authorization', token)
                .then((response)=>{
                    expect(response.statusCode).toBe(200)
                    expect(response.type).toBe('application/json')
                })
            
    })  


})