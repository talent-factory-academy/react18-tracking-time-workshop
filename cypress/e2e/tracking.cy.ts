import { projectMock, trackingExpandMock } from '../mocks/mocks';

describe("Tracking Page", () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5173/tracking');

    cy.intercept(
      'http://localhost:3000/projects',
      { method: "GET" },
      projectMock
    );

    cy.intercept(
      'http://localhost:3000/tracking?_expand=project',
      { method: "GET" },
      trackingExpandMock
    );
  })

  it('should the "Confirm" button be disabled', () => {
    cy.get("button").contains("CONFIRM").should("be.disabled");
  })

  it('should the "Confirm" button be enabled when all fields are filled', () => {
    cy.get('input[name="description"]').type('a fake description');
    cy.get('input[name="date"]').type("2022-09-09T10:10");
    cy.get('input[name="duration"]').type('00:15');
    cy.get('select[name="projectId"]').select(projectMock[0].name);
    cy.get("button").contains("CONFIRM").should("be.enabled");
  })


  it('should the list display at least the description and the project name of each activity', () => {
    trackingExpandMock.forEach(activity => {
      cy.contains(activity.description).should('be.exist');
      cy.contains(activity.project.name).should('be.exist');
    })
  })

  it('should the "Confirm" button add a new element', () => {
    cy.intercept(
      'http://localhost:3000/tracking',
      { method: "POST" },
      {
        statusCode: 200,
        body: {
          "description": "aaaaaa",
          "date": "2022-09-03T01:24",
          "duration": "02:25",
          "projectId": 1,
          "id": 4
        }
      }
    )

    cy.intercept(
      `http://localhost:3000/tracking/4?_expand=project`,
      { method: "GET" },
      {
        statusCode: 200,
        body: {
          "description": "a fake description",
          "date": "2022-09-03T01:24",
          "duration": "02:25",
          "projectId": 1,
          "id": 4,
          "project": {
            "id": 1,
            "name": "ACME"
          }
        }
      }
    )

    cy.get('input[name="description"]').type('a fake description');
    cy.get('input[name="date"]').type("2022-09-09T10:10");
    cy.get('input[name="duration"]').type('00:15');
    cy.get('select[name="projectId"]').select(projectMock[0].name);
    cy.get("button").contains("CONFIRM").click()

    cy.contains('a fake description').should('be.exist');
    cy.contains(projectMock[0].name).should('be.exist');
  })

})

