# Complete Setup Guide for All Playwright Frameworks

This document provides step-by-step setup instructions for each framework.

---

## Table of Contents

1. [General Prerequisites](#general-prerequisites)
2. [Framework 1: Douglas E-Commerce](#framework-1-douglas-e-commerce-mocha)
3. [Framework 2: OrangeHRM](#framework-2-orangehrm-simple-pom)
4. [Framework 3: Booking Application](#framework-3-booking-application-cucumber-bdd)
5. [Framework 4: Slot Booking](#framework-4-slot-booking-mocha)
6. [Verification Steps](#verification-steps)
7. [Troubleshooting](#troubleshooting)

---

## General Prerequisites

### Step 1: Check System Requirements

Run these commands in PowerShell to verify your system:

```powershell
# Check Node.js version (should be 16+)
node --version

# Check npm version (should be 8+)
npm --version

# Check if Git is installed
git --version
```

**Expected Output:**
```
v18.x.x  (Node.js)
9.x.x    (npm)
git version 2.x
```

### Step 2: Install Required Tools

If any tools are missing, install them:

#### Install Node.js
1. Visit [nodejs.org](https://nodejs.org/)
2. Download Node.js LTS version
3. Run installer and follow installation wizard
4. Restart PowerShell/Terminal

#### Install Git
1. Visit [git-scm.com](https://git-scm.com/)
2. Download Git for Windows
3. Run installer with default settings

### Step 3: Update npm

```powershell
# Update to latest npm version
npm install -g npm@latest

# Verify update
npm --version
```

---

## Framework 1: Douglas E-Commerce (Mocha)

**Project Name:** `playwright_with_typescript_using_mocha`  
**Target Application:** Douglas.de (E-commerce)  
**Test Type:** Data-driven filtering tests  
**Complexity:** ⭐⭐ (Beginner-Friendly)

### Setup Steps

#### Step 1: Navigate to Framework

```powershell
cd playwright_with_typescript_using_mocha
```

#### Step 2: Install Dependencies

```powershell
# Install all npm packages
npm install

# Expected: Shows "added XXX packages"
```

#### Step 3: Install Playwright Browsers

```powershell
# Install Chromium browser (used by this framework)
npx playwright install chromium

# Expected: Shows installation progress for chromium
```

#### Step 4: Verify TypeScript Compilation

```powershell
# Compile TypeScript (optional, happens automatically)
npx tsc --noEmit
```

#### Step 5: Run First Test

```powershell
# Run a single test to verify everything works
npm test

# Expected: Tests should run and complete
```

### Directory Structure

```
playwright_with_typescript_using_mocha/
├── src/
│   ├── pages/
│   │   ├── HomePage.ts           - Home page interactions
│   │   ├── ParfumPage.ts         - Product listing page
│   │   └── FilterPanel.ts        - Filter UI components
│   ├── tests/
│   │   ├── parfum-filter.spec.ts       - Filter functionality tests
│   │   └── parfum-datadriven.spec.ts   - Data-driven filter tests
│   ├── test-data/
│   │   ├── parfumFilters.json         - Filter test data
│   │   ├── dataDrivenFilters.json     - Data-driven scenarios
│   │   ├── highlightsFilters.json     - Highlight filters
│   │   └── filterCategories.json      - Category data
│   └── utils/
│       ├── cookieHandler.ts      - Cookie consent automation
│       └── assertions.ts         - Custom assertion helpers
├── playwright.config.ts          - Playwright configuration
├── tsconfig.json                 - TypeScript configuration
├── package.json                  - Dependencies
└── README.md                      - Framework documentation
```

### Running Tests

```powershell
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View HTML report
npm run report

# Run specific test file
npx playwright test src/tests/parfum-filter.spec.ts

# Run tests matching pattern
npx playwright test --grep "Filter"
```

### Configuration Details

**File:** `playwright.config.ts`

Key settings:
- **Base URL:** https://www.douglas.de/de
- **Timeout:** 120 seconds
- **Workers:** 1 (sequential to avoid anti-bot detection)
- **Reporter:** HTML
- **Screenshot:** Only on failure
- **Video:** Retain on failure

### Key Features

✨ **Anti-Bot Detection Handling**
- Custom browser configurations
- Rate limiting accommodation
- Header customization

✨ **Cookie Management**
- Automated consent banner handling
- Cookie persistence

✨ **Data-Driven Testing**
- JSON-based test data
- Parameterized test execution

---

## Framework 2: OrangeHRM (Simple POM)

**Project Name:** `playwrightSimpleFrameworks`  
**Target Application:** OrangeHRM Live  
**Test Type:** Enterprise application testing  
**Complexity:** ⭐⭐⭐ (Intermediate)

### Setup Steps

#### Step 1: Navigate to Framework

```powershell
cd playwrightSimpleFrameworks
```

#### Step 2: Install Dependencies

```powershell
# Install all packages including cross-env for environment variables
npm install

# Expected: Installs @playwright/test, @types/node, etc.
```

#### Step 3: Install Playwright Browsers

```powershell
# Install all Chromium, Firefox, and WebKit
npx playwright install

# Or install specific browsers:
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

#### Step 4: Configure Environment Variables

Create `.env.qa` and `.env.dev` files in root directory:

**`.env.qa`**
```env
BASE_URL=https://opensource-demo.orangehrmlive.com
USERNAME=Admin
PASSWORD=admin123
TEST_ENV=qa
```

**`.env.dev`**
```env
BASE_URL=https://your-dev-url.com
USERNAME=admin
PASSWORD=dev-password
TEST_ENV=dev
```

#### Step 5: Run Tests

```powershell
# Run QA tests
npm run test:qa

# Run DEV tests
npm run test:dev
```

### Directory Structure

```
playwrightSimpleFrameworks/
├── src/
│   ├── fixtures/
│   │   └── pom-fixtures.ts       - Dependency injection setup
│   ├── pages/
│   │   ├── BasePage.ts           - Base page (parent class)
│   │   ├── LoginPage.ts          - Login page
│   │   ├── Dashboard.ts          - Dashboard page
│   │   ├── MyInfo.ts             - My Info page
│   │   └── PIMPage.ts            - PIM module page
│   ├── testData/
│   │   ├── data.json             - Test data
│   │   └── envConfig/
│   │       ├── qa.json
│   │       └── dev.json
│   ├── tests/
│   │   ├── auth.spec.ts          - Authentication tests
│   │   ├── pim.spec.ts           - PIM module tests
│   │   └── admin.spec.ts         - Admin module tests
│   └── utils/
│       ├── EnvManager.ts         - Environment management
│       └── test-data.ts          - Data utilities
├── k6/
│   ├── login_perf.js             - Login performance test
│   └── create_employee_perf.js   - Create employee perf test
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### Running Tests

```powershell
# Environment-specific tests
npm run test:qa                    # QA environment
npm run test:dev                   # DEV environment
npm run test:stage                 # STAGE environment

# Test mode variations
npm run test:ui                    # UI mode (interactive)
npm run test:debug                 # Debug mode (step through)
npm run test:api                   # API tests only (@API tag)

# Reports
npm run report                      # View HTML report

# Performance tests (requires K6 installed)
npm run k6:login                    # Login performance test
npm run k6:create                   # Create employee performance test
```

### Installation of K6 (Optional)

```powershell
# Install K6 using Chocolatey (Windows)
choco install k6

# Or download from https://k6.io/open-source
```

### Key Configuration Files

**`playwright.config.ts`**
- Parallel execution enabled
- Multiple project configurations
- Retry mechanism set to 2

**`src/fixtures/pom-fixtures.ts`**
- **CRITICAL FILE** - Defines page object fixtures
- Automatically initializes page objects
- Handles setup/teardown

**`src/utils/EnvManager.ts`**
- Loads environment-specific configuration
- Manages BASE_URL and credentials

### Special Features

✨ **Dependency Injection**
```typescript
test('Test with injected fixtures', async ({ loginPage, dashboard }) => {
  // Page objects automatically initialized
});
```

✨ **Multi-Environment Support**
- Separate config files per environment
- Environment-specific URLs and credentials
- Easy switching between dev/qa/stage

✨ **API + UI Hybrid Testing**
- API request/response handling
- UI automation alongside API calls
- Data verification across layers

---

## Framework 3: Booking Application (Cucumber BDD)

**Project Name:** `typescript_playwright_with_cucumber`  
**Target Application:** Flight/Booking Application  
**Test Type:** BDD/Gherkin scenarios  
**Complexity:** ⭐⭐⭐⭐ (Advanced)

### Setup Steps

#### Step 1: Navigate to Framework

```powershell
cd typescript_playwright_with_cucumber
```

#### Step 2: Install Dependencies

```powershell
# Install all packages including Cucumber
npm install

# Expected: Installs @cucumber/cucumber, @playwright/test, etc.
```

#### Step 3: Install Playwright Browsers

```powershell
# Install all browsers
npx playwright install

# Or specific browsers:
npx playwright install chromium firefox webkit
```

#### Step 4: Configure Environment

Create `config/env.config.ts` if not present:

```typescript
export const config = {
  dev: {
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:3001/api'
  },
  qa: {
    baseURL: 'https://qa-booking.app.com',
    apiURL: 'https://qa-booking.app.com/api'
  }
};
```

#### Step 5: Generate Test Data

```powershell
# Generate initial test data
npm run generate:test-data

# Validate test data
npm run validate:test-data
```

#### Step 6: Run First Tests

```powershell
# Run smoke tests
npm run test:smoke

# Expected: Shows Gherkin feature file execution
```

### Directory Structure

```
typescript_playwright_with_cucumber/
├── src/
│   └── test/
│       ├── features/               - Gherkin feature files
│       │   ├── booking.feature
│       │   ├── footer.feature
│       │   └── ...other features
│       └── step_definitions/       - Step implementations
│           ├── booking.steps.ts
│           ├── footer.steps.ts
│           └── ...other step files
├── pages/                           - Page Object Model
│   ├── base.page.ts                - Base page class
│   ├── booking.page.ts             - Booking page
│   ├── footer.page.ts              - Footer page
│   └── ...other pages
├── config/
│   └── env.config.ts               - Environment configuration
├── utils/
│   ├── csv-reader.ts               - CSV file reading
│   ├── excel-reader.ts             - Excel file operations
│   ├── data-generator.ts           - Generate random data
│   ├── testDataLoader.ts           - Load test data
│   └── index.ts
├── test-data/
│   ├── credentials.json            - Test credentials
│   └── testData.json               - Test scenarios
├── scripts/
│   ├── generate-cucumber-report.js - Report generation
│   └── generate-test-data.js       - Data generation script
├── reports/
│   ├── cucumber-report.html        - Generated HTML report
│   └── cucumber-report.json        - JSON report
├── cucumber.js                      - Cucumber configuration
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### Running Tests

```powershell
# Run all tests
npm run test:all

# Run by tag
npm run test:smoke                  # @smoke tests
npm run test:regression             # @regression tests
npm run test:critical               # @critical tests
npm run test:e2e                    # @e2e tests
npm run test:footer                 # Footer tests
npm run test:booking                # Booking tests
npm run test:oneway                 # One-way bookings only
npm run test:twoway                 # Round-trip bookings only

# Run combinations
npm run test:smoke:critical         # Both @smoke AND @critical tags

# Parallel execution
npm run test:parallel               # Run with 4 workers

# Headed mode (visible browser)
npm run test:headed                 # All tests visible
npm run test:headed:smoke           # Only smoke tests visible
npm run test:headed:twoway          # Two-way bookings visible

# Debug mode
npm run test:debug                  # All in debug
npm run test:debug:smoke            # Smoke tests debug
npm run test:debug:twoway           # Two-way debug

# Browser specific
npm run test:firefox                # Run in Firefox
npm run test:webkit                 # Run in WebKit

# Report generation
npm run test:report                 # Generate HTML report

# Dry run (no execution)
npm run test:dryrun

# Custom tag execution
npm run test:tag '@smoke'           # Run with custom tag
npm run test:tag:headed '@smoke'    # Custom tag in headed mode
npm run test:tag:debug '@smoke'     # Custom tag in debug
npm run test:tag:qa '@smoke'        # Custom tag in QA
npm run test:tag:parallel '@smoke'  # Custom tag parallel
```

### Gherkin Feature Files

Example feature file structure:

```gherkin
Feature: Flight Booking
  Background:
    Given User is on booking page
    And Currency is set to EUR

  @smoke @critical
  Scenario: Book one-way flight
    When User selects departure city "Berlin"
    And User selects arrival city "Paris"
    And User selects trip type "One Way"
    Then User should see available flights
    And Flight prices should be in EUR

  @regression @twoway
  Scenario: Book round-trip flight
    When User books round-trip to "London"
    And User selects return date 3 days later
    Then Booking confirmation should be shown
```

### Test Tags Available

| Tag | Purpose |
|-----|---------|
| `@smoke` | Quick smoke tests |
| `@regression` | Full regression suite |
| `@critical` | Critical functionality |
| `@e2e` | End-to-end scenarios |
| `@footer` | Footer functionality |
| `@booking` | Booking scenarios |
| `@oneway` | One-way bookings only |
| `@twoway` | Round-trip bookings |

### Configuration: `cucumber.js`

```javascript
module.exports = {
  default: {
    require: ['src/test/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    paths: ['src/test/features/**/*.feature'],
    parallel: 1
  }
};
```

### Key Features

✨ **Gherkin Format** - Human-readable test specifications  
✨ **Tag-Based Organization** - Run tests by feature tags  
✨ **Parallel Execution** - Run multiple scenarios simultaneously  
✨ **HTML Reports** - Beautiful Cucumber HTML reports  
✨ **Step Reusability** - Shared step definitions across features

---

## Framework 4: Slot Booking (Mocha)

**Project Name:** `typescriptPlaywrightWithMocha`  
**Target Application:** AI-Driven Slot Booking  
**Test Type:** Full-featured with data utilities  
**Complexity:** ⭐⭐⭐⭐ (Advanced)

### Setup Steps

#### Step 1: Navigate to Framework

```powershell
cd typescriptPlaywrightWithMocha
```

#### Step 2: Install Dependencies

```powershell
# Install all packages
npm install

# Expected: npm packages including xlsx for Excel support
```

#### Step 3: Install Playwright Browsers

```powershell
# Install all browsers
npx playwright install

# Or specific browsers
npx playwright install chromium firefox
```

#### Step 4: Configure Environment

Create `config/env.config.ts`:

```typescript
export const envConfig = {
  dev: {
    baseURL: 'http://localhost:3000',
    apiURL: 'http://localhost:8080/api',
    timeout: 30000
  },
  qa: {
    baseURL: 'https://qa-slot-booking.com',
    apiURL: 'https://qa-slot-booking.com/api',
    timeout: 60000
  }
};
```

#### Step 5: Generate Test Data

```powershell
# Generate test data
npm run generate:test-data

# Validate test data
npm run validate:test-data

# Expected: Creates testData.json with random test scenarios
```

#### Step 6: Run Tests

```powershell
# Run UI tests in dev
npm run test:ui:dev

# Expected: Tests should run and pass
```

### Directory Structure

```
typescriptPlaywrightWithMocha/
├── src/
│   ├── pages/                      - Page Object Model
│   │   ├── base.page.ts            - Base page class
│   │   ├── booking.page.ts         - Booking page
│   │   ├── footer.page.ts          - Footer page
│   │   └── ...other pages
│   ├── tests/
│   │   ├── ui/                     - UI tests
│   │   │   ├── admin.spec.ts       - Admin user tests
│   │   │   ├── superadmin.spec.ts  - SuperAdmin tests
│   │   │   ├── trainee.spec.ts     - Trainee role tests
│   │   │   ├── trainer.spec.ts     - Trainer role tests
│   │   │   ├── footer-navigation.spec.ts
│   │   │   └── data-driven.spec.ts - Data-driven tests
│   │   └── api/                    - API tests
│   │       └── api.spec.ts
│   ├── utils/                      - Utility functions
│   │   ├── csv-reader.ts           - CSV file operations
│   │   ├── excel-reader.ts         - Excel file operations
│   │   ├── data-generator.ts       - Random data generation
│   │   ├── testDataLoader.ts       - Load test data from files
│   │   └── index.ts                - Export utilities
│   └── test-data/
│       ├── credentials.json        - User credentials
│       └── testData.json           - Test scenarios
├── config/
│   └── env.config.ts               - Environment configuration
├── docs/
│   ├── QUICK_REFERENCE.md          - Quick reference guide
│   ├── UTILITIES_GUIDE.md          - Data utilities guide
│   ├── RIDE_BOOKING_TEST.md        - Booking scenario docs
│   └── FOOTER_NAVIGATION_TEST.md
├── reporter/
│   └── native-text-reporter.ts     - Custom text reporter
├── scripts/
│   ├── generate-test-data.js       - Test data generation
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### Running Tests

```powershell
# UI Tests

# All UI tests in dev environment
npm run test:ui:dev

# All UI tests in QA environment
npm run test:ui:qa

# Data-driven tests
npm run test:data-driven

# API Tests

# All API tests in dev
npm run test:api:dev

# All API tests in QA
npm run test:api:qa

# Combined Tests

# All tests (UI + API) in dev
npm run test:all:dev

# All tests in QA
npm run test:all:qa

# Reports and Data

# Generate test data
npm run generate:test-data

# Validate test data integrity
npm run validate:test-data
```

### Available Test Data Utilities

#### CSV Reader
```typescript
import { CSVReader } from './utils/csv-reader';

const data = CSVReader.read('path/to/file.csv');
data.forEach(row => {
  console.log(row);  // Each row as object
});
```

#### Excel Reader
```typescript
import { ExcelReader } from './utils/excel-reader';

const workbook = ExcelReader.read('path/to/file.xlsx');
const sheet = workbook['Sheet1'];
console.log(sheet);  // Read specific sheet
```

#### Data Generator
```typescript
import { DataGenerator } from './utils/data-generator';

const email = DataGenerator.generateEmail();
const name = DataGenerator.generateName();
const phone = DataGenerator.generatePhone();
```

#### Test Data Loader
```typescript
import { TestDataLoader } from './utils/testDataLoader';

const credentials = TestDataLoader.load('credentials.json');
const testData = TestDataLoader.load('testData.json');
```

### Custom Text Reporter

The framework includes a custom native-text-reporter that outputs:

```
TEST EXECUTION SUMMARY
╔════════════════════════════════════╗
║ Total Tests: 25                    ║
║ Passed: 24                         ║
║ Failed: 1                          ║
║ Duration: 5m 32s                   ║
╚════════════════════════════════════╝
```

### Test Credentials

**File:** `src/test-data/credentials.json`

```json
{
  "admin": {
    "username": "admin@example.com",
    "password": "admin123",
    "role": "ADMIN"
  },
  "superadmin": {
    "username": "superadmin@example.com",
    "password": "superadmin123",
    "role": "SUPERADMIN"
  },
  "trainer": {
    "username": "trainer@example.com",
    "password": "trainer123",
    "role": "TRAINER"
  },
  "trainee": {
    "username": "trainee@example.com",
    "password": "trainee123",
    "role": "TRAINEE"
  }
}
```

### Configuration Details

**Environment Variable:** `ENV`
- `dev` - Development server
- `qa` - QA environment

**Playwright Config Settings:**
- Workers: 4 (parallel execution)
- Timeout: 60 seconds
- Retries: 1 (on CI)
- Reporter: HTML + Custom Text Reporter

### Key Features

✨ **Role-Based Testing**
- Admin, SuperAdmin, Trainer, Trainee roles
- Role-specific test scenarios

✨ **Advanced Data Utilities**
- CSV and Excel support
- Random data generation
- Dynamic test data loading

✨ **Custom Reporting**
- Native text reporter
- HTML reports with Playwright
- Formatted test execution summaries

✨ **UI + API Testing**
- Complete UI automation
- API endpoint validation
- Hybrid testing scenarios

✨ **Multi-Environment Support**
- Dev and QA environments
- Environment-specific configurations

---

## Verification Steps

Use this checklist to verify all frameworks are properly set up:

### For Each Framework:

```powershell
# 1. Navigate to directory
cd <framework-directory>

# 2. Check dependencies installed
ls node_modules/@playwright

# 3. Verify Playwright browsers installed
npx playwright --version

# 4. Check TypeScript compilation
npx tsc --noEmit

# 5. Run initial test
npm test

# 6. Verify test results
# Expected: Tests pass and reports are generated
```

### Expected Results

✅ All dependencies installed without errors  
✅ Playwright browsers installed successfully  
✅ TypeScript compiles without errors  
✅ At least one test runs successfully  
✅ HTML report is generated  
✅ No console errors related to missing files  

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: "npm ERR! code ERESOLVE Peer dependency conflict"

**Solution:**
```powershell
# Force npm to resolve conflicts
npm install --legacy-peer-deps

# Or upgrade npm
npm install -g npm@latest
```

#### Issue 2: "Playwright browsers not installed"

**Solution:**
```powershell
# Install browsers explicitly
npx playwright install chromium

# Or install all browsers
npx playwright install
```

#### Issue 3: "Tests fail with timeout"

**Solution 1:** Increase timeout in config
```typescript
timeout: 120 * 1000,  // Increase to 120 seconds
```

**Solution 2:** Check network connectivity
```powershell
# Test network access
curl https://www.douglas.de/de
```

#### Issue 4: "Module not found: '@playwright/test'"

**Solution:**
```powershell
# Reinstall dependencies
rm -r node_modules
npm install
```

#### Issue 5: "Port already in use (3000, 8000, etc.)"

**Solution (PowerShell):**
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Get-Process | Stop-Process -Force
```

#### Issue 6: "TypeScript compilation errors"

**Solution:**
```powershell
# Check TypeScript version
npm list typescript

# Recompile TypeScript
npx tsc --noEmit

# If still failing, update TypeScript
npm install typescript@latest
```

#### Issue 7: "Environment file not found"

**Solution:**
```powershell
# For OrangeHRM framework, create .env files
# Create in framework root directory
echo "BASE_URL=https://opensource-demo.orangehrmlive.com" > .env.qa

# Verify file creation
ls -la .env.*
```

#### Issue 8: "Cucumber feature files not found"

**Solution:**
```powershell
# Check feature file paths in cucumber.js
# Ensure paths match actual file locations
ls src/test/features/**/*.feature

# Update cucumber.js paths if needed
```

#### Issue 9: "Excel file read error"

**Solution:**
```powershell
# Ensure node-xlsx is installed
npm list xlsx

# Reinstall if missing
npm install xlsx

# Check file path and format
ls test-data/*.xlsx
```

#### Issue 10: "Cross-env command not found"

**Solution:**
```powershell
# Install cross-env globally
npm install -g cross-env

# Or locally in framework
npm install cross-env
```

---

## Next Steps After Setup

1. **Run Example Tests**
   - Execute provided test cases
   - Review test output and reports

2. **Review Documentation**
   - Read README in each framework
   - Check test files for examples

3. **Explore Page Objects**
   - Understand page structure
   - Review interaction methods

4. **Modify First Test**
   - Make small changes to existing test
   - Run and observe results

5. **Write New Test**
   - Create your own test scenario
   - Use existing patterns

---

## Support & Help

### Getting Help

1. **For Setup Issues:**
   - Check troubleshooting section above
   - Review Node.js/npm versions
   - Check system environment variables

2. **For Framework-Specific Issues:**
   - Review framework README.md
   - Check documentation in `/docs/` folder
   - Review test examples

3. **For Playwright Issues:**
   - Visit [Playwright.dev](https://playwright.dev)
   - Check Playwright documentation
   - Review API reference

4. **For Cucumber/BDD Issues:**
   - Visit [Cucumber.io](https://cucumber.io)
   - Review Gherkin syntax
   - Check step definition examples

---

**Last Updated:** February 2026

---
