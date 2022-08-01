describe("E2E TEST - RECOMMENDATIONS/RANDOM", () => {
    it("GET - Should return one video", () => {
      cy.intercept(
        {
          method: "GET",
          url: "/recommendations/random",
        }
      ).as("get_video");
  
      cy.visit("http://localhost:3000/random");
  
      cy.wait("@get_video").then(intercept => {
        const video = intercept.response.body
        let test = false
        if(typeof video === "object") {
            test = true
        }
        expect(test).to.equals(true)
      })
    });
  });