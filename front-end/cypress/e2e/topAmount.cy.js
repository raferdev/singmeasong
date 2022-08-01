describe("E2E TEST - RECOMMENDATIONS/TOP/:AMOUNT", () => {
    it("GET - Should return one the number of amount videos", () => {
    let amount = 0;
      cy.intercept(
        {
          method: "GET",
          url: "/recommendations/top/*",
        }
      ).as("get_video");
      cy.visit("http://localhost:3000/top/");
  
      cy.wait("@get_video").then(intercept => {
        const url = intercept.request.url
        const number = parseInt(url.slice(url.indexOf("p/")+2))
        amount = number
      })
      cy.get("article").then((articles) => {
        expect(articles.length).to.equals(amount);
      });
    });
  });