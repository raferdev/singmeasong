import app from "../../src/app.js";
import supertest from "supertest";
import Factory from "../Factory/index.js";
import Repositories from "../Repositories/index.js";

beforeEach(async () => {
  await Repositories.Recomendations.clean();
});

describe("POST /RECOMMENDATIONS/ ", () => {
  it("User can post recommendation, expected status 201", async () => {
    const video = Factory.Recomends.video();
    const result = await supertest(app).post("/recommendations").send(video);
    expect(result.status).toEqual(201);
  });
});

describe("GET /RECOMMENDATIONS/ ", () => {
  it("User can get recommendations, expected array with the video added previously", async () => {
    const video = Factory.Recomends.video();

    try {
      const videoDb = await Repositories.Recomendations.add(video);
      const result = await supertest(app).get("/recommendations");
      expect(result.body[0]).toEqual(videoDb);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });
});

describe("GET /RECOMMENDATIONS/random ", () => {
  it("User can get random video, expected one video", async () => {
    const video1 = Factory.Recomends.video();
    const video2 = Factory.Recomends.video();
    const video3 = Factory.Recomends.video();
    const videoArr = [video1, video2, video3];
    let test = false;
    try {
      await Repositories.Recomendations.addMany(videoArr);
      const result = await supertest(app).get("/recommendations/random");
      if(typeof result.body === "object") {
        if(result.body.name && result.body.youtubeLink){
          test = true
        }
      }
      expect(test).toEqual(true);
    } catch (error) {
      console.log(error);
      expect(error).toBeUndefined();
    }
  });
});

afterAll(async () => {
  await Repositories.Prisma.disconnect();
});
