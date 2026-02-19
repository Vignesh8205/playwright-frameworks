# Playwright Test Automation Frameworks - Complete Guide

This repository contains **4 different Playwright automation frameworks** built with TypeScript, showcasing various testing patterns and approaches. Each framework demonstrates best practices for test automation at scale.

---

## 📚 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [📋 Framework Comparison](#-framework-comparison)
- [🚀 Quick Start Guide](#-quick-start-guide)
  - [Framework 1: Douglas E-Commerce (Mocha)](#framework-1-douglas-e-commerce-mocha)
  - [Framework 2: OrangeHRM (Simple POM)](#framework-2-orangehrm-simple-pom)
  - [Framework 3: Booking Application (Cucumber BDD)](#framework-3-booking-application-cucumber-bdd)
  - [Framework 4: Slot Booking (Mocha)](#framework-4-slot-booking-mocha)
- [🛠️ Prerequisites](#-prerequisites)
- [📊 Architecture Patterns](#-architecture-patterns)
- [🎓 Learning Path](#-learning-path)

---

## 🎯 Project Overview

This repository showcases 4 premium test automation frameworks for different scenarios and testing patterns:

| Framework | Test Runner | Pattern | Best For | Complexity |
|-----------|------------|---------|----------|-----------|
| **Douglas** | Playwright | Data-Driven | E-commerce filtering | ⭐⭐ |
| **OrangeHRM** | Playwright | POM + Fixtures | Enterprise apps | ⭐⭐⭐ |
| **Booking** | Cucumber | BDD/Gherkin | Business-driven scenarios | ⭐⭐⭐⭐ |
| **Slot Booking** | Playwright | POM + Data Utils | Full-featured framework | ⭐⭐⭐⭐ |

---

## 📋 Framework Comparison Matrix

```
┌─────────────────────────────────────────────────────────────────────────┐
│ FEATURE COMPARISON                                                      │
├──────────────────────┬──────────┬──────────┬──────────┬─────────────────┤
│ Feature              │ Douglas  │ OrangeHRM│ Booking  │ SlotBooking     │
├──────────────────────┼──────────┼──────────┼──────────┼─────────────────┤
│ Page Object Model    │ ✅       │ ✅       │ ✅       │ ✅              │
│ TypeScript           │ ✅       │ ✅       │ ✅       │ ✅              │
│ Data-Driven Testing  │ ✅       │ ✅       │ ✅       │ ✅              │
│ Fixtures/DI          │ ❌       │ ✅       │ ❌       │ ✅              │
│ BDD/Cucumber         │ ❌       │ ❌       │ ✅       │ ❌              │
│ API Testing          │ ❌       │ ✅       │ ⚠️       │ ✅              │
│ Parallel Execution   │ ✅       │ ✅       │ ✅       │ ✅              │
│ HTML Reporting       │ ✅       │ ✅       │ ✅       │ ✅              │
│ Excel/CSV Utils      │ ❌       │ ❌       │ ✅       │ ✅              │
│ Environment Config   │ ❌       │ ✅       │ ✅       │ ✅              │
│ Custom Reporters     │ ❌       │ ❌       │ ❌       │ ✅ (Text)       │
│ Performance Testing  │ ❌       │ ✅       │ ❌       │ ❌              │
└──────────────────────┴──────────┴──────────┴──────────┴─────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites (All Frameworks)

```bash
# Verify installation
node --version      # v16+ required
npm --version       # v8+ required
git --version       # For cloning
```

**System Requirements:**
- 📦 Node.js 16.x or higher
- 📦 npm 8.x or higher
- 💾 4GB RAM minimum
- 🌐 Internet connection (for test URLs)
- 🖥️ Windows, macOS, or Linux

---

### Framework 1: Douglas E-Commerce (Mocha)

**Purpose:** Data-driven testing for e-commerce filtering and product validation

**Location:** `playwright_with_typescript_using_mocha/`

#### Setup

```bash
# Navigate to framework directory
cd playwright_with_typescript_using_mocha

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Verify setup (run a test)
npm test
```

#### Project Structure

```
playwright_with_typescript_using_mocha/
├── src/
│   ├── pages/                          # Page Object Model
│   │   ├── HomePage.ts                 # Home page interactions
│   │   ├── ParfumPage.ts              # Product page interactions
│   │   └── FilterPanel.ts             # Filter component logic
│   ├── tests/
│   │   ├── parfum-filter.spec.ts      # Filter validation tests
│   │   └── parfum-datadriven.spec.ts  # Data-driven tests
│   ├── test-data/                      # JSON test data
│   │   ├── parfumFilters.json
│   │   ├── dataDrivenFilters.json
│   │   ├── highlightsFilters.json
│   │   └── filterCategories.json
│   └── utils/
│       ├── cookieHandler.ts           # Cookie management
│       └── assertions.ts               # Custom assertions
├── playwright.config.ts                # Playwright configuration
├── tsconfig.json                       # TypeScript config
└── package.json

```

#### Running Tests

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run with debug mode
npm run test:debug

# View HTML report
npm run report
```

#### Key Test Files

- **`parfum-filter.spec.ts`** - Tests product filtering functionality
- **`parfum-datadriven.spec.ts`** - Data-driven filtering tests

#### Configuration

**Base URL:** `https://www.douglas.de/de`  
**Timeout:** 120 seconds  
**Parallel Workers:** 1 (to avoid anti-bot triggers)

#### Special Features

✨ **Cookie Handler** - Automated consent management  
✨ **Anti-Bot Detection** - Custom browser configs  
✨ **JSON Test Data** - Easy test scenario management  
✨ **Custom Assertions** - Reusable validation helpers

---

### Framework 2: OrangeHRM (Simple POM)

**Purpose:** Enterprise HR application testing with environment management and API testing

**Location:** `playwrightSimpleFrameworks/`

#### Setup

```bash
# Navigate to framework directory
cd playwrightSimpleFrameworks

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Verify setup
npm run test:qa
```

#### Project Structure

```
playwrightSimpleFrameworks/
├── src/
│   ├── fixtures/
│   │   └── pom-fixtures.ts           # Dependency injection setup
│   ├── pages/                         # Page Object Model
│   │   ├── BasePage.ts               # Base page class
│   │   ├── LoginPage.ts              # Login interactions
│   │   ├── Dashboard.ts              # Dashboard interactions
│   │   ├── MyInfo.ts                 # User info page
│   │   └── PIMPage.ts                # PIM module page
│   ├── testData/
│   │   ├── data.json                 # Test data
│   │   └── envConfig/                # Environment configs
│   ├── tests/
│   │   ├── auth.spec.ts              # Authentication tests
│   │   ├── pim.spec.ts               # PIM module tests
│   │   └── ...other tests
│   └── utils/
│       ├── EnvManager.ts             # Environment configuration
│       └── test-data.ts              # Data management
├── k6/                                # Performance testing
│   ├── login_perf.js
│   └── create_employee_perf.js
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

#### Running Tests

```bash
# Run tests in QA environment
npm run test:qa

# Run tests in DEV environment
npm run test:dev

# Run specific API tests only
npm run test:api

# Run with UI mode (interactive)
npm run test:ui

# Run with debug mode
npm run test:debug

# Performance testing with K6
npm run k6:login
npm run k6:create
```

#### Environment Configuration

Tests support multiple environments: **dev**, **qa**, **stage**

Environment variables needed:
- `BASE_URL` - Application base URL
- `TEST_ENV` - Environment (dev/qa/stage)

#### Key Features

✨ **Fixtures & Dependency Injection** - Automatic page object initialization  
✨ **Multi-Environment Support** - Dev, QA, Stage  
✨ **API+UI Hybrid Testing** - Combined API and UI tests  
✨ **Performance Testing** - K6 integration for load testing  
✨ **Data-Driven Scenarios** - JSON-based test data

#### Special Files

- **`src/fixtures/pom-fixtures.ts`** - Critical: Connects page objects to tests
- **`src/utils/EnvManager.ts`** - Manages environment configurations
- **`src/utils/test-data.ts`** - Centralizes test data management

---

### Framework 3: Booking Application (Cucumber BDD)

**Purpose:** Business-driven testing using Cucumber Gherkin syntax

**Location:** `typescript_playwright_with_cucumber/`

#### Setup

```bash
# Navigate to framework directory
cd typescript_playwright_with_cucumber

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Generate test data
npm run generate:test-data

# Run smoke tests
npm run test:smoke
```

#### Project Structure

```
typescript_playwright_with_cucumber/
├── src/
│   └── test/
│       ├── step_definitions/          # Cucumber step implementations
│       │   ├── booking.steps.ts
│       │   ├── footer.steps.ts
│       │   └── ...other steps
│       └── features/                  # Feature files (Gherkin)
│           ├── booking.feature
│           ├── footer.feature
│           └── ...other features
├── pages/                              # Page Object Model
│   ├── base.page.ts                   # Base page class
│   ├── booking.page.ts                # Booking page
│   ├── footer.page.ts                 # Footer page
│   └── ...other pages
├── config/
│   └── env.config.ts                  # Environment configuration
├── utils/
│   ├── csv-reader.ts                  # CSV utilities
│   ├── excel-reader.ts                # Excel utilities
│   ├── data-generator.ts              # Test data generation
│   ├── testDataLoader.ts              # Data loading
│   └── index.ts
├── test-data/
│   ├── credentials.json               # Test credentials
│   └── testData.json                  # Test data
├── scripts/
│   ├── generate-cucumber-report.js    # Report generation
│   └── generate-test-data.js          # Data generation
├── cucumber.js                         # Cucumber configuration
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

#### Running Tests

```bash
# Run all tests
npm run test:all

# Run by tag (smoke tests)
npm run test:smoke

# Run specific feature (regression)
npm run test:regression

# Run critical tests only
npm run test:critical

# Run specific booking tests
npm run test:booking

# Run in parallel (4 workers)
npm run test:parallel

# Run in headed mode (visible browser)
npm run test:headed

# Debug mode
npm run test:debug

# Dry run (no execution)
npm run test:dryrun

# Generate HTML report
npm run test:report

# Test specific tags with heading
npm run test:tag:headed '@smoke'
```

#### BDD Approach

All tests are written in **Gherkin** (human-readable format):

```gherkin
Feature: Flight Booking
  Scenario: Book one-way flight
    Given I am on the booking page
    When I select a one-way flight
    And I fill in passenger details
    Then I should see booking confirmation
```

#### Test Tags

Tests are organized by tags:
- `@smoke` - Quick smoke tests
- `@regression` - Full regression suite
- `@critical` - Critical functionality
- `@e2e` - End-to-end scenarios
- `@footer` - Footer-related tests
- `@booking` - Booking scenarios
- `@oneway` - One-way booking
- `@twoway` - Round-trip booking

#### Data Utilities

```bash
# Generate test data
npm run generate:test-data

# Validate test data
npm run validate:test-data
```

#### Special Features

✨ **Cucumber/Gherkin Format** - Business-readable test specifications  
✨ **Parallel Execution** - Run tests in parallel  
✨ **CSV/Excel Support** - Read and manipulate test data  
✨ **HTML Reports** - Beautiful Cucumber reports  
✨ **Tag-Based Execution** - Run tests by feature tags  
✨ **Multi-Browser Support** - Chrome, Firefox, WebKit

---

### Framework 4: Slot Booking (Mocha)

**Purpose:** Comprehensive full-featured framework with advanced data utilities and custom reporters

**Location:** `typescriptPlaywrightWithMocha/`

#### Setup

```bash
# Navigate to framework directory
cd typescriptPlaywrightWithMocha

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Generate test data
npm run generate:test-data

# Run tests in dev environment
npm run test:ui:dev
```

#### Project Structure

```
typescriptPlaywrightWithMocha/
├── src/
│   ├── pages/                         # Page Object Model
│   │   ├── base.page.ts               # Base page class
│   │   ├── booking.page.ts            # Booking page
│   │   ├── footer.page.ts             # Footer page
│   │   └── ...other pages
│   ├── tests/
│   │   ├── ui/                        # UI tests
│   │   │   ├── admin.spec.ts
│   │   │   ├── superadmin.spec.ts
│   │   │   ├── trainee.spec.ts
│   │   │   ├── trainer.spec.ts
│   │   │   ├── footer-navigation.spec.ts
│   │   │   └── data-driven.spec.ts
│   │   └── api/                       # API tests
│   │       └── api.spec.ts
│   ├── utils/
│   │   ├── csv-reader.ts              # CSV reading
│   │   ├── excel-reader.ts            # Excel operations
│   │   ├── data-generator.ts          # Random data generation
│   │   ├── testDataLoader.ts          # Data loading utilities
│   │   └── index.ts
│   └── test-data/
│       ├── credentials.json           # Test credentials
│       └── testData.json              # Test scenarios
├── config/
│   └── env.config.ts                  # Environment settings
├── docs/                               # Documentation
│   ├── QUICK_REFERENCE.md
│   ├── UTILITIES_GUIDE.md
│   ├── RIDE_BOOKING_TEST.md
│   └── FOOTER_NAVIGATION_TEST.md
├── reporter/
│   └── native-text-reporter.ts        # Custom text reporter
├── scripts/
│   └── generate-test-data.js          # Generate test data
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

#### Running Tests

```bash
# UI Tests

# Run all UI tests in dev environment
npm run test:ui:dev

# Run all UI tests in qa environment
npm run test:ui:qa

# Run data-driven tests
npm run test:data-driven

# API Tests

# Run all API tests in dev environment
npm run test:api:dev

# Run all API tests in qa environment
npm run test:api:qa

# Combined Tests

# Run all tests (UI + API) in dev
npm run test:all:dev

# Run all tests in qa
npm run test:all:qa

# Generate test data
npm run generate:test-data

# Validate test data
npm run validate:test-data
```

#### Environment Support

- **dev** - Development environment
- **qa** - QA environment

Set using `ENV` environment variable or cross-env in npm scripts.

#### Data Utilities

**CSV Reader** - Read test data from CSV files
```typescript
import { CSVReader } from './utils/csv-reader';
const data = CSVReader.read('file.csv');
```

**Excel Reader** - Read/write Excel files
```typescript
import { ExcelReader } from './utils/excel-reader';
const data = ExcelReader.read('file.xlsx');
```

**Data Generator** - Generate random test data
```typescript
import { DataGenerator } from './utils/data-generator';
const email = DataGenerator.generateEmail();
```

**Test Data Loader** - Load test data from JSON
```typescript
import { TestDataLoader } from './utils/testDataLoader';
const testData = TestDataLoader.load('credentials.json');
```

#### Custom Reporting

Tests use **custom text reporter** that outputs:
- Test execution summary
- Pass/fail statistics  
- Timing information
- Custom formatted output

#### Key Features

✨ **Role-Based Testing** - Admin, SuperAdmin, Trainer, Trainee roles  
✨ **Data Generation** - Random test data creation  
✨ **CSV/Excel Support** - Multiple data format support  
✨ **Custom Reporter** - Formatted text reports  
✨ **UI + API Testing** - Combined testing scenarios  
✨ **Multi-Environment** - Dev/QA support  
✨ **Data-Driven Tests** - JSON-based scenarios

---

## 🛠️ Prerequisites

### Required Tools

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 16.x+ | [nodejs.org](https://nodejs.org/) |
| npm | 8.x+ | Included with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com/) |
| VS Code | Latest | [code.visualstudio.com](https://code.visualstudio.com/) |

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "ms-playwright.playwright",           // Playwright Test for VSCode
    "cucumber.cucumber-official",         // For Gherkin syntax
    "ms-python.python",                   // Python support
    "ms-vscode.makefile-tools"            // Build tools
  ]
}
```

### Installation Commands (Windows PowerShell)

```powershell
# Check Node.js version
node --version

# Check npm version  
npm --version

# Install Playwright globally (optional)
npm install -g @playwright/test

# Install cross-env globally (for environment variables)
npm install -g cross-env
```

---

## 📊 Architecture Patterns

### Pattern 1: Page Object Model (POM)

Used by all frameworks to separate test logic from page interactions.

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  private usernameInput = this.page.locator('[name="username"]');
  private passwordInput = this.page.locator('[name="password"]');
  private loginButton = this.page.locator('button:has-text("Login")');

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

### Pattern 2: Dependency Injection (OrangeHRM)

Fixtures automatically inject page objects into tests.

```typescript
// tests/auth.spec.ts
test('Login to application', async ({ loginPage, page }) => {
  await loginPage.login('admin', 'admin123');
  await expect(page).toHaveURL(/dashboard/);
});
```

### Pattern 3: BDD with Cucumber (Booking App)

Human-readable test specifications using Gherkin.

```gherkin
Feature: Flight Booking
  Scenario: User books a one-way flight
    Given User is on booking page
    When User selects departure city
    And User selects arrival city
    Then User sees available flights
```

### Pattern 4: Data-Driven Testing

Tests parameterized with external data sources.

```typescript
// Using JSON data
const testData = require('../test-data/parfumFilters.json');

test.describe.forEach(testData)(
  'Filter products: $category',
  (data) => {
    test('Filter by ' + data.name, async () => {
      // Test implementation
    });
  }
);
```

---

## 🎓 Learning Path

### Beginner Level ⭐

**Start with:** Framework 1 - Douglas (Mocha)

- Basic Page Object Model
- Simple data-driven testing
- JSON test data management
- Single test runner (Playwright)

**Topics:**
- Locators and interactions
- Page Object pattern
- Data management basics
- Test organization

### Intermediate Level ⭐⭐

**Next:** Framework 2 - OrangeHRM (Simple POM)

- Dependency injection
- Fixtures in Playwright
- Environment management
- Multi-environment testing
- API + UI hybrid testing

**Topics:**
- Advanced POM patterns
- Fixture setup/teardown
- Configuration management
- Cross-environment testing

### Advanced Level ⭐⭐⭐

**Then:** Framework 3 & 4

**Framework 3 - Booking (Cucumber BDD):**
- Business-driven test development
- Gherkin syntax
- Parallel execution
- Tag-based test organization

**Framework 4 - Slot Booking (Full-Featured):**
- Advanced data utilities
- Custom reporters
- Role-based testing
- Complex test scenarios

**Topics:**
- BDD methodology
- Advanced data handling
- Custom reporting
- Performance considerations

---

## 📦 Common Setup Steps (All Frameworks)

```bash
# 1. Navigate to framework directory
cd <framework-directory>

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Verify installation by running first test
npm test

# 5. View test reports
npm run report      # or specific command per framework
```

---

## 🐛 Troubleshooting

### Issue: "Playwright not found"
```bash
# Solution: Install Playwright binaries
npx playwright install
```

### Issue: "Tests fail with timeout"
```bash
# Check and increase timeout in playwright.config.ts
timeout: 120 * 1000,  // 120 seconds
```

### Issue: "Port already in use"
```bash
# Kill process using the port (Windows PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Issue: "Test data not found"
```bash
# Generate test data
npm run generate:test-data
```

### Issue: "Browser launch fails"
```bash
# Try installing with specific flags
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## 📚 Additional Resources

### Playwright Documentation
- [Playwright Official Docs](https://playwright.dev/)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### TypeScript Documentation
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

### Test Automation Best Practices
- [Test Automation Pyramid](https://martinfowler.com/bliki/TestPyramid.html)
- [Page Object Model](https://selenium.dev/documentation/en/guidelines_and_recommendations/encouraged_practices/#page_object_models)
- [BDD with Cucumber](https://cucumber.io/docs/bdd/)

---

## 🤝 Framework Maintenance

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update Playwright specifically
npm install @playwright/test@latest
```

### Running All Framework Tests

```bash
# Script to test all frameworks (create test-all.sh)
#!/bin/bash

for dir in playwright_with_typescript_using_mocha \
           playwrightSimpleFrameworks \
           typescript_playwright_with_cucumber \
           typescriptPlaywrightWithMocha; do
  echo "Testing $dir..."
  cd $dir
  npm install
  npx playwright install
  npm test
  cd ..
done
```

---

## 📋 Quick Command Reference

```bash
# Douglas Framework (Mocha)
cd playwright_with_typescript_using_mocha && npm install && npm test

# OrangeHRM Framework (Simple POM)
cd playwrightSimpleFrameworks && npm install && npm run test:qa

# Booking Framework (Cucumber)
cd typescript_playwright_with_cucumber && npm install && npm run test:smoke

# Slot Booking Framework (Full-Featured)
cd typescriptPlaywrightWithMocha && npm install && npm run test:ui:dev
```

---

## 📞 Support & Questions

For each framework:
1. Check the individual README.md in each directory
2. Review the documentation files
3. Check implementation examples
4. Review test specifications

---

## 📄 License

These frameworks are provided for educational and testing purposes.

---

**Last Updated:** February 2026

**Version:** 1.0.0

---

## 🎯 Next Steps

1. **Choose a framework** based on your learning level
2. **Follow the setup guide** for your selected framework
3. **Run the example tests** to verify installation
4. **Review the documentation** in each framework directory
5. **Start writing tests** following the patterns used

Happy Testing! 🚀
