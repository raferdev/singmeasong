import app from '../src/app.js';
import supertest from 'supertest';
import Factory from './Factory/index.js';

describe("POST RECOMENDATIONS /recommendations ", () => {
    it("User can post recomendation, expected status 200", async () => {
        const video = Factory.Recomends.video();
        const result = await supertest(app).post("/recommendations").send(video)
        expect(result.status).toEqual(200)
    })
  })