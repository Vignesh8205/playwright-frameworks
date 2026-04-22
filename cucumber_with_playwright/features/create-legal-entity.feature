@smoke @regression @createlegalentity
Feature: QUEST-Createjlegalentity
  As a test automation engineer
  I want to verify the legalentity

  Background:
    Given I load test data from "test-data/test.json"
    And I navigate to the APEX UI application
    When I enter training username "credentials.validUser.username"
    And I enter training password "credentials.validUser.password"
    And I click the login button
    Then I should be logged in successfully

  Scenario: User creates a new entity successfully
    When user clicks on "Create New Entity"
    Then user should see "Create Entity " form title
    When user enters entity name "pages.entityPage.createEntity.entityName"
    And user fills entity selection details
      | address | marketType | type            | representative |
      | e12 6hn | Motor      | Consumer Credit | AR             |
    And user fills company details (Option 1: Random Data)
      | vatNumber | frnNumber | companyNumber | telephone | website |
      | RANDOM    | RANDOM    | RANDOM        | RANDOM    | RANDOM  |
    And user fills company details (Option 2: JSON Data)
      | vatNumber                                 | frnNumber                                 | companyNumber                                 | telephone                                 | website                                 |
      | pages.entityPage.companyDetails.vatNumber | pages.entityPage.companyDetails.frnNumber | pages.entityPage.companyDetails.companyNumber | pages.entityPage.companyDetails.telephone | pages.entityPage.companyDetails.website |
    When user clicks on "Save and close"
