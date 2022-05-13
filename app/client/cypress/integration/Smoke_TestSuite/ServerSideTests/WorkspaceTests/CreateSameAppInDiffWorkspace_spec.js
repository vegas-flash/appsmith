/// <reference types="Cypress" />

describe("Create app same name in different workspace", function() {
  let workspaceId;
  let appid;
  let newWorkspaceName;

  it("create app within a new workspace", function() {
    cy.NavigateToHome();
    cy.generateUUID().then((uid) => {
      workspaceId = uid;
      appid = uid;
      localStorage.setItem("OrgName", workspaceId);
      cy.createWorkspace();
      // stub the response and
      // find app name
      cy.wait("@createWorkspace").then((interception) => {
        newWorkspaceName = interception.response.body.data.name;
        cy.renameWorkspace(newWorkspaceName, workspaceId);
        cy.CreateAppForWorkspace(workspaceId, appid);
        cy.NavigateToHome();
        cy.LogOut();
      });
    });
  });

  it("create app with same name in a different workspace", function() {
    cy.LoginFromAPI(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
    cy.visit("/applications");
    cy.wait("@applications").should(
      "have.nested.property",
      "response.body.responseMeta.status",
      200,
    );
    const newWorkspaceName = workspaceId + "1";
    cy.createWorkspace();
    cy.wait("@createWorkspace").then((interception) => {
      console.log("createWorkspace response: ", interception);
      newWorkspaceName = interception.response.body.data.name;
      cy.renameWorkspace(newWorkspaceName, newWorkspaceName);
      cy.CreateAppForWorkspace(newWorkspaceName, appid);
    });
  });
});
