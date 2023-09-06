const request = require('supertest');
const {mongoConnect, mongoDisconnect} = require('../../services/mongo');

const app = require('../../app');

describe('Launches API', ()=>{
    beforeAll(async () => {
        await mongoConnect();
    });
    
    afterAll(async () => {
        await mongoDisconnect();
    });

describe('Test GET /planets', () => {
    test('It should respond with 200 success', async ()=>{
        const response = await request(app)
        .get('/v1/planets')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});
});