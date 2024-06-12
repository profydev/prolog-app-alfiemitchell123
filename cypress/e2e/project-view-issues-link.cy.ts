describe("View issues link works correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("directs to issues page with pre-selected project filter", () => {
      cy.visit("http://localhost:3000/dashboard");

      cy.get(".project-card_container__EPgC0")
        .first()
        .within(() => {
          cy.get(".project-card_name__3CWaa")
            .invoke("text")
            .then((projectName) => {
              const encodedProjectName = encodeURIComponent(projectName.trim());
              const url = `http://localhost:3000/dashboard/issues?project=${encodedProjectName}`;

              cy.get(".project-card_viewIssuesAnchor__xGCK8").first().click();

              cy.url().should("eq", url);
            });
        });
    });
  });
});
