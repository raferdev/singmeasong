import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import Factory from "../Factory/index.js";
import { jest } from "@jest/globals";

describe("RECOMMENDATIONS SERVICE TESTS - INSERT FUNCTION", () => {
  it("TEST INSERT FUNCTION, should throw error with duplicate data", async () => {
    const obj = Factory.Recomends.video();
    jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce({
      id: 1,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 12313,
    });
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce();

    try {
      await recommendationService.insert(obj);
    } catch (error) {
      expect(error.type).toEqual("conflict");
    }
  });
  it("TEST INSERT FUNCTION, should call create function when have no duplicate data", async () => {
    const obj = Factory.Recomends.video();
    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(null);
    jest.spyOn(recommendationRepository, "create").mockResolvedValueOnce();

    await recommendationService.insert(obj);

    expect(recommendationRepository.create).toHaveBeenCalled();
  });
});

describe("RECOMMENDATIONS SERVICE TESTS - UPVOTE FUNCTION", () => {
  it("TEST UPVOTE FUNCTION, should receive one number and call repositorie ", async () => {
    const obj = Factory.Recomends.video();
    let video = {
      id: 1,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 2,
    };
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(video);

    try {
      await recommendationService.upvote(1);
      expect(recommendationRepository.updateScore).toHaveBeenCalled();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });

  it("TEST UPVOTE FUNCTION, should receive one wrong number input and throw ", async () => {
    const obj = Factory.Recomends.video();
    let video = {
      id: 1,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 2,
    };
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(video);

    try {
      expect(await recommendationService.upvote(1)).toThrow("not_found")
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

});

describe("RECOMMENDATIONS SERVICE TESTES",()=>{});