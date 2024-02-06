describe("Error handling when fetching projects", () => {
  it("displays error message when API call fails", () => {
    cy.intercept("GET", "/project", {
      statusCode: 500,
      body: "Internal Server Error",
      delayMs: 1000,
    }).as("getProjects");

    cy.visit("http://localhost:3000/dashboard");

    cy.wait(10000);

    cy.get(".project-list_errorContainer__qnBAx").should("be.visible");

    cy.contains("Try again").click();

    cy.wait(10000);

    cy.get(".project-list_errorContainer__qnBAx").should("be.visible");
  });
});
