@booking-one-way  @e2e 
Feature: One-Way Ride Booking - End to End Flow
  As a customer of Droptaxie
  I want to book a one-way cab ride
  So that I can travel from one location to another at a future date

  Background:
    Given I am on the Droptaxie application


  Scenario: Complete ride booking flow with location, date, cab selection and price validation
    When I enter pickup location as "Rathinam College"
    Then the pickup location should be set to "Rathinam College"
    
    When I enter drop location by typing "GA" and selecting suggestion number 2
    Then the drop location should contain "Gandhi Nagar"
    
    When I select "Book Later" with 3 days from today
    And I click on "Search Cabs" button
    Then I should be redirected to the cabs listing page
    
    When I view the available cab list
    Then I should see at least 1 cab available
    And each cab should display name and price
    
    When I select the first available cab
    And I click on "Book Now" button
    Then I should be redirected to the booking summary page
    
    When I verify the journey details
    Then the pickup and drop locations should be correctly displayed
    
    When I view the pricing details
    Then the base fare should be greater than 0
    And the tax should be greater than 0
    And the total fare should equal base fare plus tax
    
    When I fill the contact details with:
      | field          | value                  |
      | name           | John Doe               |
      | mobile         | 9876543210             |
      | email          | john.doe@example.com   |
      | pickupAddress  | Rathinam College Main Gate |
      | pickupTime     | 10:00 AM               |
    
    And I verify the pickup and drop locations one more time
    And I click on "Confirm Booking" button
    Then I should see booking confirmation message
    And the booking should be successfully completed
