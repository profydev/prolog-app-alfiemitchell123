import mockIssues1 from "../fixtures/issues-page-1.json";
import mockIssues2 from "../fixtures/issues-page-2.json";
import mockIssues3 from "../fixtures/issues-page-3.json";

describe("Issue List", () => {
  beforeEach(() => {
    // setup request mocks
    cy.intercept("GET", "https://prolog-api.profy.dev/project", {
      fixture: "projects.json",
    }).as("getProjects");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=1", {
      fixture: "issues-page-1.json",
    }).as("getIssuesPage1");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=2", {
      fixture: "issues-page-2.json",
    }).as("getIssuesPage2");
    cy.intercept("GET", "https://prolog-api.profy.dev/issue?page=3", {
      fixture: "issues-page-3.json",
    }).as("getIssuesPage3");

    // open issues page
    cy.visit(`http://localhost:3000/dashboard/issues`);

    // wait for request to resolve
    cy.wait(["@getProjects", "@getIssuesPage1"]);
    cy.wait(500);

    // set button aliases
    cy.get("button").contains("Previous").as("prev-button");
    cy.get("button").contains("Next").as("next-button");
  });

  context("desktop resolution", () => {
    it("renders the issues", () => {
      cy.get("main")
        .find("tbody")
        .find("tr")
        .each(($el, index) => {
          const issue = mockIssues1.items[index];
          const firstLineOfStackTrace = issue.stack.split("\n")[1].trim();
          cy.wrap($el).contains(issue.name);
          cy.wrap($el).contains(issue.message);
          cy.wrap($el).contains(issue.numEvents);
          cy.wrap($el).contains(firstLineOfStackTrace);
        });
    });

    // it("renders the correct numEvents and numUsers", () => {
    //   cy.fixture("issues-page-1.json").then((issues) => {

    //     cy.log("Length of issues: ", issues.length);
    //     cy.log("Issues: ", issues);

    //     cy.get("table")
    //       .find("tr:not(.issue-list_headerRow__3lQDP)")
    //       .then(($rows) => {
    //         $rows.each((index, $row) => {
    //           cy.log("Current index:", index);

    //           cy.wrap($row)
    //             .find("td")
    //             .first()
    //             .should("contain", issues[index].numEvents);

    //           cy.wrap($row)
    //             .find("td")
    //             .eq(1)
    //             .should("contain", issues[index].numUsers);
    //         });
    //       });
    //   });
    // });

    it("renders the correct numEvents and numUsers", () => {
      cy.fixture("issues-page-1.json").then((data) => {
        const issues = data.items;

        cy.log("Length of issues: ", issues.length);
        cy.log("Issues: ", issues);

        cy.get("table")
          .find("tr:not(.issue-list_headerRow__3lQDP)")
          .then(($rows) => {
            $rows.each((index, $row) => {
              cy.log("Current index:", index);

              const currentIssue = issues[index];
              cy.wrap($row)
                .find("td")
                .should("contain", currentIssue.numEvents);

              cy.wrap($row).find("td").should("contain", currentIssue.numUsers);
            });
          });
      });
    });

    // it("renders the correct numEvents and numUsers", () => {
    //   cy.fixture("issues-page-1.json").then((issues) => {
    //     cy.log("Length of issues: ", issues.length);
    //     cy.log("Issues: ", issues);

    //     cy.get("table")
    //       .find("tr:not(.issue-list_headerRow__3lQDP)")
    //       .each(($row, index) => {
    //         cy.log("Current index:", index);

    //         // Access the td elements directly
    //         const numEvents = Cypress.$($row).find("td").eq(0).text().trim();
    //         const numUsers = Cypress.$($row).find("td").eq(1).text().trim();

    //         // Log the content for debugging
    //         cy.log("numEvents:", numEvents);
    //         cy.log("numUsers:", numUsers);

    //         // Verify the content
    //         expect(numEvents).to.equal(issues[index]?.numEvents?.toString());
    //         expect(numUsers).to.equal(issues[index]?.numUsers?.toString());
    //       });
    //   });
    // });

    it("paginates the data", () => {
      // test first page
      cy.contains("Page 1 of 3");
      cy.get("@prev-button").should("have.attr", "disabled");

      // test navigation to second page
      cy.get("@next-button").click();
      cy.get("@prev-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);

      // test navigation to third and last page
      cy.get("@next-button").click();
      cy.get("@next-button").should("have.attr", "disabled");
      cy.contains("Page 3 of 3");
      cy.get("tbody tr:first").contains(mockIssues3.items[0].message);

      // test navigation back to second page
      cy.get("@prev-button").click();
      cy.get("@next-button").should("not.have.attr", "disabled");
      cy.contains("Page 2 of 3");
      cy.get("tbody tr:first").contains(mockIssues2.items[0].message);
    });

    // it("persists page after reload", () => {
    //   cy.get("@next-button").click();
    //   cy.contains("Page 2 of 3");

    //   cy.reload();
    //   cy.wait(["@getProjects", "@getIssuesPage2"]);
    //   cy.wait(1500);
    //   cy.contains("Page 2 of 3");
    // });
  });
});
