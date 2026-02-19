# Footer Navigation Links Test Documentation

## Overview
This document provides comprehensive details about the Footer Navigation Links validation test for the Droptaxie website.

## Test Location
- **File**: `tests/ui/footer-navigation.spec.ts`
- **Page Object**: `pages/footer.page.ts`
- **Test Data**: `test-data/testData.json` (footer section)

## Test Purpose
Validate that all footer navigation links (Notices, Terms & Conditions, Privacy Policy, Contact Us) are:
- Present on the page
- Clickable
- Navigate to the correct destination pages
- Display the correct heading/content

## Test Structure

### Single Test Block with Test Steps
The test is structured as a single test block with multiple `test.step()` calls for organized reporting:

1. **Navigate to homepage** - Load the Droptaxie homepage
2. **Scroll to footer** - Scroll down to make footer visible
3. **Validate each link** - For each footer link:
   - If link is placeholder (#): Verify it's present
   - If link is functional: Click link, validate URL and heading, return to homepage

## Footer Links Being Tested

| Link Name | URL | Expected Heading |
|-----------|-----|------------------|
| Notices | # (placeholder) | N/A |
| Terms & Conditions | /Pages/terms | Terms & Conditions |
| Privacy Policy | /Pages/privacy | Privacy Policy |
| Contact Us | /Pages/contact | Contact us |

## Page Object Methods

### FooterPage Class
Located in `pages/footer.page.ts`

#### Key Methods:

```typescript
scrollToFooter(): Promise<void>
```
- Scrolls to the bottom of the page to make footer visible
- Includes a 1-second wait for smooth scrolling

```typescript
getFooterLinks(): Promise<string[]>
```
- Returns array of all footer navigation link texts
- Filters for specific links: Notices, Terms & Conditions, Privacy Policy, Contact Us

```typescript
clickFooterLink(linkName: string): Promise<void>
```
- Clicks on a specific footer link by name
- Scoped to footer element to avoid conflicts with header navigation
- Waits for page load after click

```typescript
isFooterLinkVisible(linkName: string): Promise<boolean>
```
- Checks if a specific footer link is visible
- Scoped to footer element to avoid strict mode violations

```typescript
getCurrentUrl(): Promise<string>
```
- Returns the current page URL

```typescript
getPageHeading(): Promise<string | null>
```
- Returns the first h1 or h2 heading text on the page
- Used to validate correct page load

```typescript
goToHomePage(): Promise<void>
```
- Navigates back to the homepage
- Uses full URL: https://droptaxie.in/

```typescript
getFooterLinkDetails(): Promise<Array<{ name: string; href: string }>>
```
- Returns detailed information about all footer links
- Includes link name and href attribute

## Test Data Configuration

Located in `test-data/testData.json`:

```json
"footer": {
  "links": [
    {
      "name": "Notices",
      "url": "#",
      "heading": null
    },
    {
      "name": "Terms & Conditions",
      "url": "/Pages/terms",
      "heading": "Terms & Conditions"
    },
    {
      "name": "Privacy Policy",
      "url": "/Pages/privacy",
      "heading": "Privacy Policy"
    },
    {
      "name": "Contact Us",
      "url": "/Pages/contact",
      "heading": "Contact us"
    }
  ]
}
```

## Execution

### Run All UI Tests
```bash
npx playwright test tests/ui/
```

### Run Only Footer Navigation Test
```bash
npx playwright test tests/ui/footer-navigation.spec.ts
```

### Run with UI Mode
```bash
npx playwright test tests/ui/footer-navigation.spec.ts --ui
```

### Run in Headed Mode
```bash
npx playwright test tests/ui/footer-navigation.spec.ts --headed
```

### Generate HTML Report
```bash
npx playwright show-report
```

## Key Implementation Details

### 1. Scoped Selectors
To avoid conflicts between header and footer links (especially "Contact Us" which appears in both), all selectors are scoped to the footer element:

```typescript
this.page.locator('footer').getByRole('link', { name: linkName })
```

### 2. Placeholder Link Handling
The "Notices" link is a placeholder with href="#". The test:
- Skips navigation for this link
- Only verifies it's present on the page

### 3. Navigation Validation
For functional links, the test:
- Clicks the link
- Validates URL contains expected path
- Validates page heading matches expected text
- Returns to homepage for next test

### 4. Test Data Driven
All expected values (link names, URLs, headings) are stored in test data, making it easy to:
- Update expected values
- Add new footer links to test
- Maintain consistency

## Test Execution Flow

```
1. Navigate to homepage (https://droptaxie.in/)
   └─ Verify URL is correct

2. Scroll to footer
   └─ Verify footer links are found

3. For each footer link:
   └─ If placeholder link (#):
      └─ Verify link is present
   └─ If functional link:
      ├─ Scroll to footer
      ├─ Click link
      ├─ Verify URL contains expected path
      ├─ Verify page heading matches
      └─ Return to homepage

4. Final verification
   └─ Confirm at least 4 footer links exist
```

## Troubleshooting

### Issue: Strict Mode Violation for "Contact Us"
**Problem**: "Contact Us" appears in both header and footer
**Solution**: Scope selector to footer element:
```typescript
this.page.locator('footer').getByRole('link', { name: 'Contact Us' })
```

### Issue: Cannot Navigate to Invalid URL
**Problem**: Using relative URL `/` in `goToHomePage()`
**Solution**: Use full URL:
```typescript
await this.page.goto('https://droptaxie.in/');
```

### Issue: Heading Text Case Mismatch
**Problem**: Actual heading is "Contact us" but expected "Contact Us"
**Solution**: Update test data to match actual page content

### Issue: Page Not Loading
**Problem**: Network issues or slow page load
**Solution**: 
- Check network connectivity
- Increase timeout: `test.setTimeout(120000)`
- Use `waitForLoadState('networkidle')`

## Expected Console Errors
The following console errors are expected and do not affect test execution:
- 404 errors for external resources
- Third-party script loading failures

These errors originate from the application under test, not the test framework.

## Test Results

### Successful Execution
```
Running 1 test using 1 worker
  1 passed (23.2s)
```

### Test Report
Generated at: `reports/test-report.txt`
HTML Report: `playwright-report/index.html`

## Maintenance

### Adding New Footer Links
1. Update `test-data/testData.json` with new link details:
```json
{
  "name": "New Link",
  "url": "/Pages/newlink",
  "heading": "New Link Heading"
}
```

2. Run the test - no code changes needed!

### Modifying Expected Values
Update the corresponding values in `testData.json`:
- `name`: Link text as it appears in footer
- `url`: Expected URL path
- `heading`: Expected page heading (or null if not applicable)

## Related Files
- **Test File**: [tests/ui/footer-navigation.spec.ts](../tests/ui/footer-navigation.spec.ts)
- **Page Object**: [pages/footer.page.ts](../pages/footer.page.ts)
- **Test Data**: [test-data/testData.json](../test-data/testData.json)
- **Base Page**: [pages/base.page.ts](../pages/base.page.ts)

## Best Practices Demonstrated
1. **Page Object Model (POM)**: Separates page interactions from test logic
2. **Test.step()**: Provides clear, hierarchical test reporting
3. **Data-Driven Testing**: Uses external JSON for test data
4. **Scoped Selectors**: Avoids element ambiguity
5. **No Console.log**: Uses test.step for visibility instead
6. **Single Test Block**: Maintains flow while providing detailed steps
