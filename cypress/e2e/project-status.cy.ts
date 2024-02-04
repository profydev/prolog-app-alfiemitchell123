import { capitalize } from "lodash";

describe("Project status is displaying correctly", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/dashboard");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("displays critical, warning and stable", () => {
      cy.get(".project-card_topContainer__IK1h_").each(($project, index) => {
        const expectedStatus =
          index === 0
            ? "critical"
            : index === 1
              ? "warning"
              : index === 2
                ? "stable"
                : "N/A";

        cy.wrap($project)
          .find(".badge_container__FVLnl")
          .should("contain", capitalize(expectedStatus));
      });
    });
  });
});
