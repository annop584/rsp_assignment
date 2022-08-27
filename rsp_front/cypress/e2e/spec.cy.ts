describe("empty spec", () => {
  it("testflow", () => {
    //register
    cy.visit("http://localhost:3050/register");

    cy.get("#email").type("annop581@gmail.com");
    cy.get("#password").type("123456");
    cy.get("#confirmpassword").type("123456");

    cy.get("form").click();
    cy.get("form").submit();

    cy.wait(100);
    //login
    cy.visit("http://localhost:3050/login");

    cy.get("#email").type("annop581@gmail.com");
    cy.get("#password").type("123456");
    cy.get("form").click();
    cy.get("form").submit();

    //gameplay
    for (let i = 0; i < 12; i++) {
      if (i % 3 == 0) {
        cy.get("#👊").click();
      } else if (i % 3 == 1) {
        cy.get("#✌🏻").click();
      } else if (i % 3 == 2) {
        cy.get("#🖐🏼").click();
      }

      cy.get("#result").then(($btn) => {
        // assert on the text
        if ($btn.text().includes("win")) {
          // do your statements
          // cy.visit("http://localhost:3050/login");
        } else {
          // do other statements
        }
      });
      cy.wait(3000);
    }
  });
});
