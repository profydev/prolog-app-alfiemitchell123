describe("Footer", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("footer is working", () => {
      cy.get("footer").contains("Version: 14.5.2").should("exist");

      cy.get("footer")
        .find("a")
        .should("have.length", 4)
        .each(($link) => {
          cy.wrap($link).should("have.attr", "href", "#");
        });

      cy.get("footer").find("img").should("exist");
    });
  });
});
