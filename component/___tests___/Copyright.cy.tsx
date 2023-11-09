import React from "react";
import { mount } from "@cypress/react18";
import Copyright from "@components/Copyright";

describe("Copyright component", () => {
  it("should display the copyright text", () => {
    cy.mount(<Copyright />);
    cy.contains("Copyright © Gibraltar");
  });

  it("should render with the correct text", () => {
    cy.mount(<Copyright />);
    cy.contains("Copyright © Gibraltar");
    cy.contains(new Date().getFullYear().toString());
  });

  it("should render a link with the correct text", () => {
    mount(<Copyright />);
    cy.get("a").should("have.text", "Gibraltar").and("have.attr", "href", "");
  });
});
