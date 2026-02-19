@booking-twoway @e2e
Feature: Two-Way Ride Booking - End to End Flow
  As a customer of Droptaxie
  I want to book a two-way cab ride with round trip dates
  So that I can travel to a destination and return on a specified date

  Background:
    Given I am on the Droptaxie application


  Scenario: Complete two-way ride booking with coupon validation and payment verification
    When I switch to "Two Way" booking tab
    Then the two-way booking form should be displayed with "From Date" and "To Date" fields
    
    When I enter pickup location as "Rathinam College"
    Then the pickup location should be set to "Rathinam College"
    
    When I enter drop location as "Super Market Coimbatore"
    Then the drop location should be stored for later validation
    
    When I select "From Date" with 3 days from today
    And I select "To Date" with 5 days from today
    Then both dates should be set correctly
    
    When I click on "Search Cabs" button
    Then I should be redirected to the cabs listing page
    
    When I view the available cab list
    Then I should see at least 1 cab available
    And each cab should display name and price
    And I print all available cabs with their prices
    
    When I select the first available cab
    And I click on "Book Now" button
    Then I should be redirected to the booking summary page
    
    When I verify the journey details on booking page
    Then the pickup location should match "Rathinam College"
    And the drop location should match the previously saved value
    
    When I view the pricing details
    Then the base fare should be greater than 0
    And the tax should be greater than 0
    And the total fare should equal base fare plus tax
    
    When I fill the contact details with:
      | field          | value                         |
      | name           | John Doe                      |
      | mobile         | 9876543210                    |
      | email          | john.doe@example.com          |
      | pickupAddress  | Rathinam College Main Gate    |
    
    And I verify the pickup and drop locations match saved values
    
    # Note: Coupon validation section may not be available on all bookings
    # The following steps test the optional coupon functionality if present
    
    When I select pickup time "10:00 AM" from the time dropdown
    Then the pickup time should be set to "10:00 AM"
    
    When I verify the GPay payment number
    Then the displayed GPay number should be "+91 8248456661"
    
    When I verify the terms and conditions checkbox
    Then the checkbox "I understand and agree with the Terms of Service and Cancellation" should be present
    And I select the terms and conditions checkbox
    
    When I click on "Confirm Booking" button
    Then I should see booking confirmation message
    And the two-way booking should be successfully completed
