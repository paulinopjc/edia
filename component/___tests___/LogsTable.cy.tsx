import LogsTable from "../LogsTable";
import { Roles } from "@typedefs/roles";
/*
Test that the component renders without crashing when passed valid props.
Test that the component renders the correct number of log entries.
Test that the component renders the correct log data.
Test that the component paginates the data correctly.
Test that the component updates the page index correctly when the pagination buttons are clicked.
Test that the component updates the data correctly when the page index changes.
*/

const mockData = [
  {
    _id: "1",
    username: "JohnDoe",
    IP: "127.0.0.1",
    role: Roles.ADMIN,
    method: "GET",
    action: "/api/users",
    createdAt: "2022-04-18T18:25:43.511Z",
  },
  {
    _id: "2",
    username: "JaneDoe",
    IP: "192.168.0.1",
    role: Roles.USER,
    method: "POST",
    action: "/api/products",
    createdAt: "2022-04-18T18:26:12.114Z",
  },
  {
    _id: "3",
    username: "BobSmith",
    IP: "10.0.0.1",
    role: Roles.ADMIN,
    method: "PUT",
    action: "/api/users/1",
    createdAt: "2022-04-18T18:26:39.812Z",
  },
  {
    _id: "4",
    username: "SarahJones",
    IP: "172.16.0.1",
    role: Roles.USER,
    method: "DELETE",
    action: "/api/orders/5",
    createdAt: "2022-04-18T18:27:06.212Z",
  },
  {
    _id: "5",
    username: "MarkBrown",
    IP: "192.168.0.2",
    role: Roles.ADMIN,
    method: "GET",
    action: "/api/orders",
    createdAt: "2022-04-18T18:27:33.411Z",
  },
  {
    _id: "6",
    username: "EmilyDavis",
    IP: "10.0.0.2",
    role: Roles.USER,
    method: "POST",
    action: "/api/orders",
    createdAt: "2022-04-18T18:28:00.213Z",
  },
  {
    _id: "7",
    username: "JakeAnderson",
    IP: "127.0.0.1",
    role: Roles.ADMIN,
    method: "PUT",
    action: "/api/products/2",
    createdAt: "2022-04-18T18:28:27.812Z",
  },
  {
    _id: "8",
    username: "EmmaWilson",
    IP: "172.16.0.2",
    role: Roles.USER,
    method: "DELETE",
    action: "/api/users/3",
    createdAt: "2022-04-18T18:28:54.211Z",
  },
  {
    _id: "9",
    username: "DanielBrown",
    IP: "192.168.0.3",
    role: Roles.ADMIN,
    method: "GET",
    action: "/api/products",
    createdAt: "2022-04-18T18:29:21.414Z",
  },
  {
    _id: "10",
    username: "GraceWalker",
    IP: "10.0.0.3",
    role: Roles.USER,
    method: "POST",
    action: "/api/orders",
    createdAt: "2022-04-18T18:29:48.112Z",
  },
  {
    _id: "11",
    username: "JohnDoe",
    IP: "127.0.0.1",
    role: Roles.ADMIN,
    method: "GET",
    action: "/api/users",
    createdAt: "2022-04-18T18:25:43.511Z",
  },
  {
    _id: "12",
    username: "JaneDoe",
    IP: "127.0.0.2",
    role: Roles.USER,
    method: "POST",
    action: "/api/login",
    createdAt: "2022-04-19T10:30:20.342Z",
  },
  {
    _id: "13",
    username: "BobSmith",
    IP: "127.0.0.3",
    role: Roles.USER,
    method: "PUT",
    action: "/api/users/1",
    createdAt: "2022-04-20T15:45:57.221Z",
  },
  {
    _id: "14",
    username: "SarahJohnson",
    IP: "127.0.0.4",
    role: Roles.USER,
    method: "DELETE",
    action: "/api/users/2",
    createdAt: "2022-04-21T09:10:34.126Z",
  },
  {
    _id: "15",
    username: "AlexGreen",
    IP: "127.0.0.5",
    role: Roles.ADMIN,
    method: "GET",
    action: "/api/orders",
    createdAt: "2022-04-22T12:55:22.998Z",
  },
  {
    _id: "16",
    username: "EmilyBrown",
    IP: "127.0.0.6",
    role: Roles.USER,
    method: "POST",
    action: "/api/products",
    createdAt: "2022-04-23T16:20:11.873Z",
  },
  {
    _id: "17",
    username: "MikeWilson",
    IP: "127.0.0.7",
    role: Roles.USER,
    method: "PUT",
    action: "/api/products/1",
    createdAt: "2022-04-24T08:35:02.765Z",
  },
  {
    _id: "18",
    username: "LauraLee",
    IP: "127.0.0.8",
    role: Roles.USER,
    method: "DELETE",
    action: "/api/products/2",
    createdAt: "2022-04-25T11:50:44.654Z",
  },
  {
    _id: "19",
    username: "MarkJones",
    IP: "127.0.0.9",
    role: Roles.ADMIN,
    method: "GET",
    action: "/api/customers",
    createdAt: "2022-04-26T14:15:33.544Z",
  },
  {
    _id: "20",
    username: "AnnaLee",
    IP: "127.0.0.10",
    role: Roles.USER,
    method: "POST",
    action: "/api/orders",
    createdAt: "2022-04-27T17:40:22.438Z",
  },
];

describe("LogsTable component", () => {
  it("should render", () => {
    cy.mount(<LogsTable data={mockData} />);
    cy.get("table").should("be.visible");
  });

  it("should render the correct number of log entries", () => {
    cy.mount(<LogsTable data={mockData} />)
      .get("table")
      .find("tbody")
      .find("tr")
      .should("have.length", 5);
  });

  it("should render the correct log data", () => {
    cy.mount(<LogsTable data={mockData} />);
    cy.get("[data-testid=logs-table]").eq(0).should("contain", "JohnDoe");
    cy.get("[data-testid=logs-table]").eq(0).should("contain", "127.0.0.1");
    cy.get("[data-testid=logs-table]").eq(0).should("contain", Roles.ADMIN);
    cy.get("[data-testid=logs-table]").eq(0).should("contain", "GET");
    cy.get("[data-testid=logs-table]").eq(0).should("contain", "/api/users");
    cy.get("[data-testid=logs-table]").eq(0).should("contain", "2022-04-19 02:28 am");
  });

  describe("pagination", () => {
    it("should paginate the data correctly", () => {
      cy.mount(<LogsTable data={mockData} />);
      cy.get("[data-testid=page-next]").click();
      cy.get("[data-testid=logs-table]").eq(0).should("not.contain", "JohnDoe");
      cy.get("[data-testid=logs-table]").eq(0).should("contain", "EmmaWilson");
    });

    it("should update the page index correctly when pagination buttons are clicked", () => {
      cy.mount(<LogsTable data={mockData} />);
      cy.get("[data-testid=page-next]").click();
      cy.get("[data-testid=page-indicator]").should("contain", "Page: 2");
    });

    it("should update the data correctly when the page index changes", () => {
      cy.mount(<LogsTable data={mockData} />);
      cy.get("[data-testid=page-next]").click();
      cy.get("[data-testid=logs-table]").eq(0).should("not.contain", "JohnDoe");
      cy.get("[data-testid=logs-table]").eq(0).should("contain", "EmilyDavis");
    });
  });
});
