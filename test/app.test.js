const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('Express App', () => {
  it('should return a message from GET /', () => {
    return supertest(app)
    .get('/')
    .expect(200, 'Hello Express!')
  })
})

describe('GET /apps endpoint', () => {
  it('should return 200 with an object', () => {
    supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.be.an('object')
        expect(res.body[0].to.include.keys(
          "App", "Category", "Rating", "Reviews", "Size", 
          "Installs", "Type", "Price", "Content Rating", 
          "Genres", "Last Updated", "Current Ver", "Android Ver"
        ))
        
        })
      
    })
  it('should return 400 if genres are invalid', () => {
    supertest(app) 
    .get('/apps')
    .query({genres: 'invalid'})
    .expect(400, 'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card') 
    

  })
  })

  it('it should return 200 and filtered dataset', () => {
    supertest(app)
    .get('/app')
    .query({Genres : 'Action'})
    .then(res => {
      const expectedBody = res.body.filter(app => app.Genres.includes(action))
      expect(res.body).to.eql(expectedBody);
    })
  })

  // it('it should return 200 and sorted dataset', () => {
  //   supertest(app)
  //   .get('/app')
  //   .query{}
  // })

it('should sort by title', () => { 
  
  return supertest(app) 
  .get('/apps') 
  .query({ sort: 'app' })
  .query({ sort: 'rating'}) 
  .expect(200) 
  .expect('Content-Type', /json/) 
  .then(res => { expect(res.body).to.be.an('array') 
  
    let sorted = true;

    let i = 0
    //iterate once less than the length of the array because we're comparing 2 items inthe array at a time
    while (i < res.body.length - 1){
      //compare app at 'i' with the next app at i +1
      const appAtI = res.body[i]
      const appAtIPlus1 = res.body[i + 1]
      //if the next app is less than the app at i,
      if (appAtIPlus1.App > appAtI.App) {
      //the apps were not sorted correctly
        sorted = false
        break; //exit the loop
      }
      i++ 
    }
    expect(sorted).to.be.true
  })
})