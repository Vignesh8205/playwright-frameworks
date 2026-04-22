@data-demo
Feature: JSON Test Data Management Demo

  Background:
    Given I load test data from "test-data/test.json"
    And I navigate to the APEX UI application

  Scenario: Successful login using JSON data
    When I enter training username "credentials.validUser.username"
    And I enter training password "credentials.validUser.password"
    And I click the login button
    Then I should be logged in successfully

  Scenario: Failed login using JSON data
    When I enter training username "credentials.invalidUser.username"
    And I enter training password "credentials.invalidUser.password"
    And I click the login button
    Then I should see the login page displayed
