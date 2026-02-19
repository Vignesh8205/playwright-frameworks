# One-Way Ride Booking - Automation Test Suite

## Overview

This test suite automates the complete end-to-end flow for booking a one-way ride on the Droptaxie application (https://droptaxie.in/). The implementation uses Playwright with TypeScript, following the Page Object Model (POM) pattern for maintainability and reusability.

## Test Scenario Coverage

### Main Test Flow
The complete booking flow validates all critical steps:

1. **Navigate to Application** - Opens Droptaxie homepage
2. **Enter Pickup Location** - Types "Rathinam College" and selects from autocomplete
3. **Enter Drop Location** - Types "GA" and selects 2nd suggestion from autocomplete
4. **Select Future Date** - Chooses "Book Later" with date picker (3 days from today)
5. **Search for Cabs** - Clicks "Search Cabs" button
6. **Capture Cab List** - Extracts all available cabs with names and prices
7. **Select a Cab** - Clicks "Book Now" for first cab
8. **Verify Locations** - Validates pickup/drop on booking summary page
9. **Validate Pricing** - Captures base fare, tax, total and validates calculation
10. **Fill Contact Details** - Enters name, mobile, email, pickup address
11. **Confirm Booking** - Submits the booking form

### Additional Test Cases

- **Cab Selection by Name** - Tests ability to select a specific cab by partial name match
- **Pricing Format Validation** - Verifies all cab prices follow correct format (Rs. XXXX)

## Project Structure

```
c1/
├── pages/
│   ├── base.page.ts                 # Base page class with common methods
│   ├── booking.page.ts              # Booking page object with all methods
│   └── login.page.ts                # Login page (existing)
├── tests/
│   └── ui/
│       ├── ride-booking.spec.ts     # Complete ride booking test suite
│       └── login.spec.ts            # Login tests (existing)
├── test-data/
│   └── testData.json                # Test data including booking details
├── playwright.config.ts             # Playwright configuration
└── package.json                     # Project dependencies
```

## Key Features

### Page Object Implementation

**BookingPage** (`pages/booking.page.ts`) provides:

#### Location Selection Methods
- `enterPickupLocation(location)` - Handles autocomplete for pickup
- `enterDropLocation(partialText, suggestionIndex)` - Types partial text and selects specific suggestion

#### Date Selection
- `selectFutureDate(daysFromToday)` - Opens date picker and selects future date

#### Cab Operations
- `clickSearchCabs()` - Searches for available cabs
- `getCabList()` - Returns array of cabs with names and prices
- `selectCabByIndex(index)` - Selects cab by position
- `selectCabByName(cabName)` - Selects cab by partial name match

#### Verification Methods
- `verifyPickupDropLocations()` - Validates locations match stored values
- `getPricingDetails()` - Returns base fare, tax, and total
- `validatePricing()` - Asserts total = base fare + tax

#### Form Filling
- `fillContactDetails(name, mobile, email, address, time)` - Fills all contact fields
- `confirmBooking()` - Handles modal closure and submits form

### Test Data Management

Test data is centralized in `test-data/testData.json`:

```json
{
  "booking": {
    "pickup": {
      "location": "Rathinam College",
      "fullName": "Rathinam College Of Arts And Science..."
    },
    "drop": {
      "partialText": "GA",
      "suggestionIndex": 1,
      "expectedName": "Gameistry Entertainment"
    },
    "date": {
      "daysFromToday": 3
    },
    "contact": {
      "name": "John Doe",
      "mobile": "9876543210",
      "email": "john.doe@example.com",
      "pickupAddress": "Rathinam College Main Gate",
      "pickupTime": "10:00 AM"
    }
  }
}
```

## Running the Tests

### All Tests
```bash
npx playwright test tests/ui/ride-booking.spec.ts
```

### Specific Test
```bash
npx playwright test tests/ui/ride-booking.spec.ts:12  # Main flow test
npx playwright test tests/ui/ride-booking.spec.ts:154 # Cab selection by name
npx playwright test tests/ui/ride-booking.spec.ts:178 # Pricing validation
```

### With Browser UI (Headed Mode)
```bash
npx playwright test tests/ui/ride-booking.spec.ts --headed
```

### Debug Mode
```bash
npx playwright test tests/ui/ride-booking.spec.ts --debug
```

### Generate HTML Report
```bash
npx playwright show-report
```

## Test Execution Details

### Timeouts
- Main flow test: 120 seconds
- Cab selection test: 90 seconds
- Pricing validation test: 60 seconds

### Wait Strategies
- Explicit waits for autocomplete dropdowns (5 seconds)
- Wait for URL navigation after actions
- Wait for network idle on page load
- Dynamic waiting for date picker elements

### Selector Strategy

The implementation uses multiple selector strategies:

1. **Role-based selectors** - `getByRole('button', { name: 'Search Cabs' })`
2. **ID selectors** - `#txt_source`, `#txt_destination`
3. **CSS selectors** - `input[placeholder="Name"]`
4. **Text-based selectors** - `h3:has-text("or Similar")`
5. **Filter selectors** - `.filter({ hasText: /^Rs\.\s*\d+$/ })`

## Key Implementation Challenges & Solutions

### 1. Dynamic Autocomplete Handling
**Challenge**: Google Places autocomplete requires waiting for suggestions
**Solution**: Implemented explicit wait for `.pac-container .pac-item` before selection

### 2. Cab List Extraction
**Challenge**: Complex DOM structure without clear class names
**Solution**: Used "Book Now" buttons as anchor points and traversed DOM to find h3 and prices

### 3. Pricing Calculation Validation
**Challenge**: Multiple elements matching "Fare" text
**Solution**: Used more specific selector with full text: "Fare( Inculding Driver Beta):"

### 4. Readonly Time Picker
**Challenge**: Pickup time field is readonly and opens a modal
**Solution**: Made field optional and added modal closure logic before form submission

### 5. Modal Blocking Confirm Button
**Challenge**: Time picker modal intercepts click events
**Solution**: Detect open modal and press Escape key before clicking Confirm Booking

## Assertions and Validations

### Location Verification
```typescript
expect(fromLocation).toContain('Rathinam College');
expect(toLocation).toContain('Gameistry Entertainment');
```

### Pricing Validation
```typescript
expect(pricing.total).toBe(pricing.baseFare + pricing.tax);
```

### Cab List Validation
```typescript
expect(cabList.length).toBeGreaterThan(0);
expect(cab.price).toMatch(/Rs\.\s*\d+/);
```

### URL Validation
```typescript
await expect(page).toHaveURL(/\/Pages\/cabs\//);
await expect(page).toHaveURL(/\/Pages\/addCart\//);
```

## Console Output

The test provides detailed console logging for each step:

```
======================================================================
STARTING ONE-WAY RIDE BOOKING TEST
======================================================================

[STEP 1] Navigating to Droptaxie application...
✓ Successfully navigated to application

[STEP 2] Entering pickup location...
Selected Pickup Location: Rathinam College Of Arts And Science, Pollachi Main Road...
✓ Pickup location selected and stored for verification

Available Cabs: 4
==================================================
1. Swift Dzire / Tata zest /Ford Aspire or Similar - Rs. 7566
2. Etios/Dzire / or Similar - Rs. 7824
3. Ertiga//Mahindra Xylo / Renault Lodgy/ Kia Carens/ Innova /or Similar - Rs. 10604
4. Innova / Ertiga/ Or Similer - Rs. 11170
==================================================

Pricing Details:
Base Fare: Rs. 7566
Tax (5%): Rs. 378
Total Fare: Rs. 7944

Validating Pricing Calculation:
Expected Total: 7566 + 378 = 7944
Actual Total: 7944
✓ Pricing calculation is correct!
```

## Dependencies

- `@playwright/test` - Testing framework
- TypeScript - Type safety
- Node.js - Runtime environment

## Best Practices Implemented

1. **Page Object Model** - Separation of test logic and page interactions
2. **Data-Driven Testing** - Centralized test data in JSON
3. **Explicit Waits** - No hard-coded sleeps, use Playwright's built-in waits
4. **Reusable Methods** - Generic methods for common actions
5. **Comprehensive Logging** - Detailed console output for debugging
6. **Screenshot on Failure** - Automatic screenshots when tests fail
7. **Video Recording** - Retain videos only on failure
8. **Retry Mechanism** - Configured 1 retry for flaky scenarios

## Future Enhancements

1. Add payment flow validation
2. Test with multiple pickup/drop combinations
3. Implement data-driven testing with CSV
4. Add API tests for backend validation
5. Integrate with CI/CD pipeline
6. Add visual regression testing
7. Implement parallel execution
8. Add performance metrics collection

## Troubleshooting

### Common Issues

**Issue**: Autocomplete not appearing
**Fix**: Check network connection, Google Maps API may be slow

**Issue**: Date picker not selecting date
**Fix**: Ensure date is in the future and calendar is visible

**Issue**: Confirm button not clickable
**Fix**: Press Escape to close any open modals

**Issue**: Test timeout
**Fix**: Increase timeout or check for network issues

## Author

Created using Playwright MCP (Model Context Protocol) for DOM inspection and automated code generation.

## License

This test suite is for educational and testing purposes.
