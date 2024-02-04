describe("Loading icon is displaying correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("displays rotating loading icon when loading projects", () => {
      cy.intercept("GET", "/project", { delayMs: 3000 }).as("getProjects");

      cy.visit("http://localhost:3000/dashboard");

      cy.get(".project-list_loading__TRkyR").should("exist");

      cy.wait("@getProjects");

      cy.get("li").should("have.length.greaterThan", 0);
    });
  });
});
