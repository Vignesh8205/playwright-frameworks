# Quick Command Reference - All Frameworks

A quick lookup guide for running tests across all Playwright frameworks.

---

## Table of Contents

- [Initial Setup](#initial-setup)
- [Framework 1: Douglas (Mocha)](#framework-1-douglas-mocha)
- [Framework 2: OrangeHRM (Simple POM)](#framework-2-orangehrm-simple-pom)
- [Framework 3: Booking (Cucumber BDD)](#framework-3-booking-cucumber-bdd)
- [Framework 4: Slot Booking (Mocha)](#framework-4-slot-booking-mocha)
- [Quick Reference Table](#quick-reference-table)
- [Common Commands](#common-commands)

---

## Initial Setup

### One-Time Setup

```bash
# Option 1: Setup one framework
cd <framework-name>
npm install
npx playwright install

# Option 2: Setup all frameworks
for dir in playwright_with_typescript_using_mocha playwrightSimpleFrameworks typescript_playwright_with_cucumber typescriptPlaywrightWithMocha; do
  echo "Setting up $dir..."
  cd $dir
  npm install
  npx playwright install
  cd ..
done
```

### Check Environment

```bash
# Verify Node.js and npm
node --version   # Should be 16+
npm --version    # Should be 8+

# Verify Playwright
npx playwright --version
npx playwright codegen https://example.com  # Opens code generator
```

---

## Framework 1: Douglas (Mocha)

**Directory:** `playwright_with_typescript_using_mocha/`

### Quick Commands

```bash
# Basic
npm install                    # Install dependencies
npx playwright install        # Install browsers
npm test                      # Run all tests

# Execution Modes
npm run test:headed           # Run tests with visible browser
npm run test:debug            # Run in debug mode

# Reports
npm run report                # View HTML report

# Debugging
npx playwright test --debug   # Step through tests
npx playwright codegen        # Record test interactions
npx playwright test --trace on # Generate trace files

# Specific Tests
npx playwright test parfum-filter.spec.ts
npx playwright test --grep "Filter"
```

### Test Files

| File | Description |
|------|-------------|
| `src/tests/parfum-filter.spec.ts` | Filter functionality tests |
| `src/tests/parfum-datadriven.spec.ts` | Data-driven filter tests |

### Test Data

```bash
# View test data
cat src/test-data/parfumFilters.json
cat src/test-data/dataDrivenFilters.json
```

---

## Framework 2: OrangeHRM (Simple POM)

**Directory:** `playwrightSimpleFrameworks/`

### Quick Commands

```bash
# Installation
npm install                   # Install all packages
npx playwright install       # Install browsers

# Environment-Based Testing
npm run test:qa              # Run QA environment tests
npm run test:dev             # Run DEV environment tests
npm run test:stage           # Run STAGE environment tests

# Test Modes
npm run test:ui              # Interactive UI mode
npm run test:debug           # Debug mode
npm run test:api             # API tests only

# Reports
npm run report               # View HTML report

# Performance Testing (requires K6)
npm run k6:login             # Performance test: login
npm run k6:create            # Performance test: create employee

# Specific Tests
npx playwright test auth.spec.ts
npx playwright test pim.spec.ts
```

### Environment Setup

```bash
# Create environment files
echo "BASE_URL=https://opensource-demo.orangehrmlive.com" > .env.qa
echo "TEST_ENV=qa" >> .env.qa

# Run test targeting environment
cross-env TEST_ENV=qa npm test
```

### Test Files

```
src/tests/
├── auth.spec.ts              # Authentication tests
├── pim.spec.ts               # PIM module tests
├── admin.spec.ts             # Admin module tests
└── ...
```

---

## Framework 3: Booking (Cucumber BDD)

**Directory:** `typescript_playwright_with_cucumber/`

### Quick Commands

```bash
# Installation
npm install                   # Install dependencies
npx playwright install       # Install browsers
npm run generate:test-data   # Generate test data

# Run All Tests
npm run test:all             # All tests
npm run test:dryrun          # Dry run (no execution)

# Run by Tag
npm run test:smoke           # @smoke tests
npm run test:regression      # @regression tests
npm run test:critical        # @critical tests
npm run test:e2e             # @e2e tests
npm run test:footer          # @footer tests
npm run test:booking         # @booking tests
npm run test:oneway          # @oneway tests
npm run test:twoway          # @twoway tests
npm run test:smoke:critical  # @smoke AND @critical

# Parallel Execution
npm run test:parallel        # Run with 4 workers

# Headed Mode (Visible Browser)
npm run test:headed          # All tests visible
npm run test:headed:smoke    # Smoke tests visible
npm run test:headed:twoway   # Two-way tests visible

# Debug Mode (Step Through)
npm run test:debug           # All tests debug
npm run test:debug:smoke     # Smoke tests debug
npm run test:debug:twoway    # Two-way tests debug

# Browser-Specific
npm run test:firefox         # Run in Firefox
npm run test:webkit          # Run in WebKit

# Custom Tags
npm run test:tag '@smoke'    # Custom tag
npm run test:tag:headed '@smoke'     # Custom with headed
npm run test:tag:debug '@smoke'      # Custom with debug
npm run test:tag:qa '@smoke'         # Custom in QA
npm run test:tag:parallel '@smoke'   # Custom parallel

# Reports
npm run test:report          # Generate HTML report
```

### Feature Files

```bash
# View feature files
ls src/test/features/

# Run specific feature
npx cucumber-js src/test/features/booking.feature

# Run with specific tag
npx cucumber-js --tags '@smoke'
```

### Data Management

```bash
# Generate new test data
npm run generate:test-data

# Validate test data
npm run validate:test-data
```

### Available Tags

```gherkin
@smoke          # Smoke tests
@regression     # Full regression
@critical       # Critical tests
@e2e            # End-to-end
@footer         # Footer tests
@booking        # Booking tests
@oneway         # One-way booking
@twoway         # Round-trip booking
```

---

## Framework 4: Slot Booking (Mocha)

**Directory:** `typescriptPlaywrightWithMocha/`

### Quick Commands

```bash
# Installation
npm install                  # Install dependencies
npx playwright install      # Install browsers
npm run generate:test-data  # Generate test data

# UI Tests
npm run test:ui:dev         # Dev environment
npm run test:ui:qa          # QA environment
npm run test:data-driven    # Data-driven tests

# API Tests
npm run test:api:dev        # Dev environment
npm run test:api:qa         # QA environment

# Combined Tests
npm run test:all:dev        # All tests (UI+API) dev
npm run test:all:qa         # All tests (UI+API) qa

# Data Utilities
npm run generate:test-data  # Generate test data files
npm run validate:test-data  # Validate test data integrity

# Reports
npx playwright show-report  # View HTML report
```

### Test Files

```
src/tests/
├── ui/
│   ├── admin.spec.ts              # Admin role tests
│   ├── superadmin.spec.ts         # SuperAdmin tests
│   ├── trainee.spec.ts            # Trainee role tests
│   ├── trainer.spec.ts            # Trainer role tests
│   ├── footer-navigation.spec.ts  # Footer tests
│   └── data-driven.spec.ts        # Data-driven tests
└── api/
    └── api.spec.ts                # API tests
```

### Data Files

```bash
# View test data
cat src/test-data/credentials.json
cat src/test-data/testData.json

# Edit credentials
# File: src/test-data/credentials.json
{
  "admin": { "username": "...", "password": "..." },
  "superadmin": { ... },
  "trainer": { ... },
  "trainee": { ... }
}
```

### Running Specific Tests

```bash
# By user role
npx playwright test admin.spec.ts
npx playwright test trainer.spec.ts

# By feature
npx playwright test footer-navigation
npx playwright test data-driven

# With grep pattern
npx playwright test --grep "Admin"
npx playwright test --grep "booking"
```

---

## Quick Reference Table

### Running Tests

| Task | Framework 1 | Framework 2 | Framework 3 | Framework 4 |
|------|------------|------------|------------|------------|
| **Install** | `npm install` | `npm install` | `npm install` | `npm install` |
| **Browsers** | `npx playwright install chromium` | `npx playwright install` | `npx playwright install` | `npx playwright install` |
| **Basic Test** | `npm test` | `npm run test:qa` | `npm run test:smoke` | `npm run test:ui:dev` |
| **Headed** | `npm run test:headed` | `npm run test:ui` | `npm run test:headed` | N/A |
| **Debug** | `npm run test:debug` | `npm run test:debug` | `npm run test:debug` | N/A |
| **Report** | `npm run report` | `npm run report` | `npm run test:report` | Show report |

### Environment Configuration

| Framework | Dev | QA | Stage | Method |
|-----------|-----|----|----|--------|
| **Douglas** | ❌ | N/A | N/A | Direct in config |
| **OrangeHRM** | ✅ | ✅ | ✅ | `.env.*` files |
| **Booking** | ✅ | ✅ | N/A | env.config.ts |
| **SlotBooking** | ✅ | ✅ | N/A | env.config.ts |

### Data Utilities

| Feature | Framework 1 | Framework 2 | Framework 3 | Framework 4 |
|---------|------------|------------|------------|------------|
| **CSV Support** | ❌ | ❌ | ✅ | ✅ |
| **Excel** | ❌ | ❌ | ✅ | ✅ |
| **Data Generation** | ❌ | ❌ | ✅ | ✅ |
| **JSON Data** | ✅ | ✅ | ✅ | ✅ |

---

## Common Commands

### Across All Frameworks

```bash
# Check installed version
npx playwright --version

# Install a specific Playwright version
npm install @playwright/test@1.41.0

# Update all packages
npm update

# Check for outdated packages
npm outdated

# Clean installation
rm -r node_modules package-lock.json
npm install

# Run with specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run with number of workers
npx playwright test --workers=1   # Serial
npx playwright test --workers=4   # 4 parallel

# Generate test
npx playwright codegen https://example.com

# View test traces
npx playwright show-trace trace.zip

# Run tests and exit on first failure
npx playwright test --bail

# Repeat test until pass
npx playwright test --repeat-each=3
```

### TypeScript Compilation

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Compile TypeScript
npx tsc

# Watch mode (auto-compile)
npx tsc --watch

# Check specific file
npx tsc src/tests/example.spec.ts --noEmit
```

### Environment Variables

```bash
# Windows PowerShell - Set environment variable
$env:TEST_ENV = "qa"
npm test

# Windows Command Line
set TEST_ENV=qa
npm test

# Using cross-env (works everywhere)
cross-env TEST_ENV=qa npm test
```

### Git Operations

```bash
# Clone all frameworks
git clone <repo-url>
cd playwright-frameworks

# Check git status
git status

# Add and commit
git add .
git commit -m "Test changes"

# Push changes
git push origin main
```

---

## Keyboard Shortcuts in Debug Mode

When running with `--debug` flag:

| Shortcut | Action |
|----------|--------|
| **Step Over** | Step to next line |
| **Step Into** | Enter function |
| **Step Out** | Exit function |
| **Continue** | Run until next breakpoint |
| **Resume** | Continue execution |

---

## Performance Tips

### Speed Up Test Execution

```bash
# Run in parallel
npx playwright test --workers=4

# Run specific test file
npx playwright test login.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"

# Skip some projects
npx playwright test --project=chromium

# Use headed: false (faster, default)
# In playwright.config.ts:
use: {
  headless: true,  // Much faster
}
```

### Reduce Flakiness

```bash
# Increase timeouts
timeout: 60000,  // 60 seconds
expect: {
  timeout: 10000  // 10 seconds for assertions
}

# Use explicit waits
await page.waitForLoadState('networkidle');
await page.locator('selector').waitFor();

# Slow down interaction
use: {
  slowMo: 1000,  // Slow down by 1 second
}
```

---

## Troubleshooting Quick Fixes

```bash
# Clear caches
npm cache clean --force

# Reinstall browsers
npx playwright install --with-deps

# Kill Playwright processes
taskkill /F /IM chrome.exe 2>nul || true
taskkill /F /IM firefox.exe 2>nul || true
taskkill /F /IM msedgedriver.exe 2>nul || true

# Clear test results
rm -r test-results/
rm -r playwright-report/

# Reset framework
rm -r node_modules package-lock.json
npm install
npx playwright install
```

---

## IDE Integration

### VS Code Debugging

Add to `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Playwright Debug",
      "runtimeExecutable": "npx",
      "runtimeArgs": ["playwright", "test", "--debug"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Run Tests from VS Code

1. Install "Playwright Test for VSCode" extension
2. Click play button on test files
3. View results inline

---

## Useful Links

### Documentation
- [Playwright Official](https://playwright.dev/)
- [Cucumber.js](https://cucumber.io/docs/cucumber/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Cheat Sheets
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Fixtures](https://playwright.dev/docs/test-fixtures)

---

## Framework Selection Quick Guide

```
Choose Framework Based On:

1. LEARNING BEGINNERS ➜ Framework 1 (Douglas)
   - Simplest setup
   - Basic POM pattern
   - JSON data management

2. ENTERPRISE APPS ➜ Framework 2 (OrangeHRM)
   - Dependency injection
   - Multi-environment
   - API + UI testing

3. BUSINESS-DRIVEN ➜ Framework 3 (Booking)
   - Gherkin syntax
   - BDD approach
   - Stakeholder readable

4. FULL-FEATURED ➜ Framework 4 (SlotBooking)
   - Complete utilities
   - Data generation
   - Custom reporting
```

---

**Last Updated:** February 2026

**Version:** 1.0.0
