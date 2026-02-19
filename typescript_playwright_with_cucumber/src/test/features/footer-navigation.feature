@footer @e2e
Feature: Footer Navigation Links Validation
  As a user of the Droptaxie application
  I want to validate all footer navigation links
  So that I can ensure proper navigation and accessibility

  Background:
    Given I am on the Droptaxie homepage

  @smoke
  Scenario: Validate footer links navigation functionality
    When I scroll down to the footer section
    Then I should see footer links including "Notices", "Terms & Conditions", "Privacy Policy", and "Contact Us"
    And all footer links should be visible
    
    When I click on the "Terms & Conditions" footer link
    Then I should be redirected to "/Pages/terms"
    And the page heading should be "Terms & Conditions"
    When I navigate back to homepage
    
    When I scroll down to the footer section
    And I click on the "Privacy Policy" footer link
    Then I should be redirected to "/Pages/privacy"
    And the page heading should be "Privacy Policy"
    When I navigate back to homepage
    
    When I scroll down to the footer section
    And I click on the "Contact Us" footer link
    Then I should be redirected to "/Pages/contact"
    And the page heading should be "Contact us"
