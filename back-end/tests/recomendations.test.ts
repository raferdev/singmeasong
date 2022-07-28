import app from '../src/app.js';
import supertest from 'supertest';
import Factory from './Factory/index.js';
import Repositories from './Repositories/index.js';

beforeAll(async  ()=> {
    await Repositories.Recomendations.clean();
});

describe("POST RECOMENDATIONS /recommendations ", () => {
    it("User can post recomendation, expected status 200", async () => {
        const video = Factory.Recomends.video();
        const result = await supertest(app).post("/recommendations").send(video)
        expect(result.status).toEqual(201)
    })
  });

  afterAll(async () => {
    await Repositories.Prisma.disconnect();
  })