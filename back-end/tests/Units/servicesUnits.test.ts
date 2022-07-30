import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";
import { recommendationService } from "../../src/services/recommendationsService.js";
import Factory from "../Factory/index.js";
import { jest } from "@jest/globals";

describe("RECOMMENDATIONS SERVICE TESTS - INSERT FUNCTION", () => {
  it("TEST INSERT FUNCTION, should throw error with duplicate data", async () => {
    const obj = Factory.Recomends.video();
    const video = {
        id: 1,
        name: obj.name,
        youtubeLink: obj.youtubeLink,
        score: 12313,
      };
    jest.spyOn(recommendationRepository, "findByName").mockResolvedValueOnce(video);
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
  it("TEST UPVOTE FUNCTION, should receive one number and call repository ", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 2,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 2,
    };
    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(video);

    try {
      await recommendationService.upvote(2);
      expect(recommendationRepository.updateScore).toHaveBeenCalled();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });

  it("TEST UPVOTE FUNCTION, should receive one wrong number input and throw ", async () => {

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    try {
      expect(await recommendationService.upvote(3)).toThrow("not_found");
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

describe("RECOMMENDATIONS SERVICE TESTS - DOWNVOTE FUNCTION", () => {
  it("TEST DOWNVOTE FUNCTION, should receive one number and call repository ", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 4,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 10,
    };

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video);

    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(video);

    try {
      await recommendationService.downvote(1);
      expect(recommendationRepository.updateScore).toHaveBeenCalled();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });

  it("TEST DOWNVOTE FUNCTION, should receive one number less than -5 and call remove function ", async () => {
    const obj = Factory.Recomends.video();

    const video2 = {
      id: 5,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: -6,
    };

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(video2);
    jest
      .spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce(video2);
    jest.spyOn(recommendationRepository, "remove").mockResolvedValueOnce()

    try {
      await recommendationService.downvote(1);
      expect(recommendationRepository.remove).toHaveBeenCalled();
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
});

describe("RECOMMENDATIONS SERVICE TESTS - GET RANDOM FUNCTION", () => {
  it(" Should create object with 'gt' or 'lte' filter and return video", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 4,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 10,
    };

    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((obj):any => {
      if(obj.score === 10 && (obj.scoreFilter === 'gt' || obj.scoreFilter === 'lte')){
        return [video]
      }
      throw {type: 'fail obj validation'}
    });

    try {
      const result = await recommendationService.getRandom();
      expect(result).toEqual(video)
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });

  it("Should use findAll with no constraints when findAll with filter is null", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 5,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 10,
    };

    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((obj):any => {
      if(obj.score === 10 && (obj.scoreFilter === 'gt' || obj.scoreFilter === 'lte')){
        return []
      }
      throw {type: 'fail obj validation'}
    });
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValueOnce([video])
    try {
      const result = await recommendationService.getRandom();
      expect(result).toEqual(video)
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
  it("Should receive onde number greater than 0.7 and filter by 'lte'", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 6,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 10,
    };
    jest.spyOn(Math, "random").mockReturnValueOnce(0.8);

    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((obj):any => {
      if(obj.score === 10 && obj.scoreFilter === 'lte') {

        return [video]

      }
      throw {type: 'fail obj validation'}
    });
    try {
      const result = await recommendationService.getRandom();
      expect(result).toEqual(video)
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
  it("Should receive onde number less than 0.7 and filter by 'gt'", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 7,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 10,
    };
    jest.spyOn(Math, "random").mockReturnValueOnce(0.6);

    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((obj):any => {
      if(obj.score === 10 && obj.scoreFilter === 'gt') {

        return [video]

      }
      throw {type: 'fail obj validation'}
    });
    try {
      const result = await recommendationService.getRandom();
      expect(result).toEqual(video)
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
  it("Should receive onde number equal to 0.7 and filter by 'lte'", async () => {
    const obj = Factory.Recomends.video();
    const video = {
      id: 8,
      name: obj.name,
      youtubeLink: obj.youtubeLink,
      score: 10,
    };

    jest.spyOn(Math, "random").mockReturnValueOnce(0.7);

    jest.spyOn(recommendationRepository, "findAll").mockImplementationOnce((obj):any => {
      if(obj.score === 10 && obj.scoreFilter === 'lte') {

        return [video]

      }
      throw {type: 'fail obj validation'}
    });
    try {
      const result = await recommendationService.getRandom();
      expect(result).toEqual(video)
    } catch (e) {
      console.log(e);
      expect(e).toBeUndefined();
    }
  });
  
});
