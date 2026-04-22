@dashboard
Feature: APEX UI Login Demo
  As a test automation engineer
  I want to verify the APEX UI login functionality
  So that I can ensure the framework works with the real application

  Background:
    Given I load test data from "test-data/test.json"
    And I navigate to the APEX UI application
    When I enter training username "credentials.trainingUser.username"
    And I enter training password "credentials.trainingUser.password"
    And I click the login button
    Then I should be logged in successfully
    And I should see the APEX UI dashboard

  @dashboard
  Scenario: verify dashboard Page
    When I navigate to the "pages.dashboard.name" Page
    Then I should see the page "pages.dashboard.title"

  Scenario: verfiy Consumer Duty Knowledge Checks
    When I navigate to the "pages.dashboard.name" Page
    Then I should see the page "pages.dashboard.knowledgeCheckTitle"
