/// <reference types="cypress" />
import Factory from "../factory/index.js";

describe("E2E TEST - RECOMMENDATIONS/", () => {
  it("POST - Should return status 200", () => {
    const video = Factory.Recommendations.createVdeo();
    cy.intercept(
      {
        method: "GET",
        url: "/recommendations",
      },
      []
    ).as("get_video");

    cy.visit("http://localhost:3000");

    cy.wait("@get_video");
    cy.get("[id=create_name]").type(video.name);
    cy.get("[id=create_link").type(video.link);
    cy.intercept(
      {
        method: "POST",
        url: "/recommendations",
      },
      []
    ).as("create_video");
    cy.get("[id=create_button]").click();

    cy.wait("@create_video").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("GET - Should load articles", () => {
    let videos = 0;
    cy.intercept(
      {
        method: "GET",
        url: "/recommendations",
      }
    ).as("get_video");
    cy.visit("http://localhost:3000");
    cy.wait("@get_video").then((intercept) => {
      const arr = intercept.response.body;
      cy.log(arr)
      videos = arr.length;
    });
    cy.get("article").then((articles) => {
      expect(articles.length).to.equals(videos);
    });
  });
});
