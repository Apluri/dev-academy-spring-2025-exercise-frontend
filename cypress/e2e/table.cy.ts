describe("Data table flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should verify table header visibility", () => {
    cy.contains("Daily Electricity Statistics").should("be.visible");
  });

  it("should navigate to the next page", () => {
    cy.get('button[aria-label="Go to next page"]').click();
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("should filter correctly with date", () => {
    cy.contains("th", "Date").within(() => {
      cy.get('input[placeholder="Min"]').type("01/02/2021");
      cy.get('input[placeholder="Max"]').type("01/02/2021");
    });
    // Should have only one item
    cy.get("tbody tr").should("have.length", 1);
    // Should have the correct total production amount
    cy.contains("221271 mWh").should("be.visible");
  });

  it("should filter correctly with total consumption", () => {
    cy.contains("th", "Total consumption").within(() => {
      cy.get('input[placeholder="Min"]').type("1");
      cy.get('input[placeholder="Max"]').type("100000000");
    });
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });
});
