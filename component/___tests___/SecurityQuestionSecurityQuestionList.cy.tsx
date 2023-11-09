import { mount } from "@cypress/react18";
import SecurityQuestionList from "@components/SecurityQuestion";
import { User } from "@typedefs/user";
import { Roles } from "@typedefs/roles";

describe("SecurityQuestionList component", () => {
  const userData: User = {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    role: Roles.AGENT,
    password: "password",
    securityQuestions: [
      {
        question: "What is your favorite manga?",
        answer: "Blue",
      },
      {
        question: "What is your favorite food?",
        answer: "Pizza",
      },
      {
        question: "What is your favorite movie?",
        answer: "The Godfather",
      },
    ],
    createdAt: "2022-01-01T00:00:00Z",
    lastLogin: "2022-01-01T00:00:00Z",
  };

  let setUserDataMock: any;
  const shuffledQuestions = ["What is your favorite movie?", "What is your favorite food?", "What is your favorite manga?"];

  beforeEach(() => {
    setUserDataMock = cy.stub().as("setUserData");
    cy.mount(<SecurityQuestionList indexSec={0} userData={userData} setUserData={setUserDataMock} shuffledQuestions={shuffledQuestions} />);
  });

  it("should render Select component with Security Question options", () => {
    cy.get("div[role='button']").click();
    cy.get("[data-value='What is your favorite movie?']").should("exist");
    cy.get("[data-value='What is your favorite food?']").should("exist");
    cy.get("[data-value='What is your favorite manga?']").should("exist");
  });

  it("should display correct selected Security Question", () => {
    cy.get("div[role='button']").should("have.text", "What is your favorite manga?");
  });

  it("should call setUserData function when Security Question is changed", () => {
    cy.get("div[role='button']").click();
    cy.get("[data-value='What is your favorite movie?']").click();
    cy.get("@setUserData").should("to.be.called", {
      ...userData,
      securityQuestions: [
        {
          question: "What is your favorite movie?",
          answer: "Notebook",
        },
        {
          question: "What is your favorite food?",
          answer: "Pizza",
        },
        {
          question: "What is your favorite movie?",
          answer: "The Godfather",
        },
      ],
    });
  });

  it("should render MenuItem components with Security Question text", () => {
    cy.get("[data-testid=secq-0]")
      .eq(0)
      .then((text) => console.log("test id: ", text))
      .should("contain", "What is your favorite manga?");
  });

  it("should disable Select component when shuffledQuestions is not provided", () => {
    mount(<SecurityQuestionList indexSec={0} userData={userData} setUserData={setUserDataMock} />);
    cy.get("div[role='button']").should("have.attr", "aria-disabled", "true");
  });
});
