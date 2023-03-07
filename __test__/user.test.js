const request = require('supertest');
const app = require('express')();
 
// app.get('/user-grid', function(req, res) {
//     res.status(200).json({ 
//         message : 'https://example.com/',
//         status : 'success'
//     });
// });

describe('GET user-grid', () => {
  const agent = request.agent(app);
  it('should get 401', async function(done) {
    const response = await request(app)
    .get('/user-grid')
    .set('Accept', 'application/json');
    // expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(401);
    // expect(response.body.email).toEqual('foo@bar.com');
  });
 });

 describe('GET user-grid', () => {
  const agent = request.agent(app);
  it('should get validation error ', async function(done) {
    const response = await request(app)
    .post('/user-create')
    .field('complex_object', '{"username": "rang5674", "email": "rang@gmail.com", "password":"124141", "confirm_pasword":"dsdsadaa"}', {contentType: 'application/json'})
    .set('Accept', 'application/json');
    expect(response.status).toEqual(422);
  });
 });
 
 describe('GET user-grid', () => {
  const agent = request.agent(app);
  it('should create user ', async function(done) {
    const response = await request(app)
    .post('/user-create')
    .field('complex_object', '{"username": "rang5674", "email": "rang@gmail.com", "password":"123456", "confirm_pasword":"123456"}', {contentType: 'application/json'})
    .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
  });
 });

 describe('GET user-grid', () => {
  const agent = request.agent(app);
  it('should login error 401 ', async function(done) {
    const response = await request(app)
    .post('/user-login')
    .field('complex_object', '{"username": "rang5674", "password":"12345fghh6",}', {contentType: 'application/json'})
    .set('Accept', 'application/json');
    expect(response.status).toEqual(401);
  });
 });

 describe('GET user-grid', () => {
  const agent = request.agent(app);
  it('should login user and access token', async function(done) {
    const response = await request(app)
    .post('/user-login')
    .field('complex_object', '{"username": "rang5674", "password":"123456",}', {contentType: 'application/json'})
    .set('Accept', 'application/json');
    expect(response.status).toEqual(200);
  });
 });