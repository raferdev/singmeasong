describe("E2E TEST - RECOMMENDATIONS/:id/upvote and downvote", () => {

  it("POST Upvote - Should return status 200",  () => {
    cy.intercept({
      method: "GET",
      url: "/recommendations",
    }).as("get_video");

    cy.visit("http://localhost:3000");

    
    cy.intercept({
        method: "POST",
        url: "/recommendations/**",
    }).as("upvote_video");
    
    cy.wait("@get_video");
    cy.get('article div svg').eq(0).click();

    cy.wait("@upvote_video").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("POST Downvote - Should return status 200",  () => {
    cy.intercept({
      method: "GET",
      url: "/recommendations",
    }).as("get_video");

    cy.visit("http://localhost:3000");

    
    cy.intercept({
        method: "POST",
        url: "/recommendations/**",
    }).as("downvote_video");
    
    cy.wait("@get_video");
    cy.get('article div svg').eq(1).click();

    cy.wait("@downvote_video").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
});
