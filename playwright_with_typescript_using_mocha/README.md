# Douglas.de Automation Framework

A comprehensive Playwright-based automation testing framework for the Douglas.de e-commerce website, focusing on product filtering and validation scenarios.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Page Object Model](#page-object-model)
- [Test Data Management](#test-data-management)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This automation framework is designed to test the Douglas.de perfume/cosmetics e-commerce platform. It implements a robust Page Object Model (POM) architecture with TypeScript and Playwright, focusing on product filtering, search functionality, and data validation scenarios.

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **TypeScript**: Type-safe test development with enhanced IDE support
- **Data-Driven Testing**: JSON-based test data management for flexible test scenarios
- **Cookie Handling**: Automated cookie consent management
- **Anti-Bot Measures**: Custom browser configurations to avoid detection
- **Comprehensive Assertions**: Utility functions for robust validations
- **HTML Reporting**: Built-in Playwright HTML reports with screenshots and videos
- **Retry Mechanism**: Automatic retries on CI environments
- **Parallel Execution**: Configurable test parallelization

## 🛠 Technology Stack

- **Test Framework**: [Playwright](https://playwright.dev/) v1.41.0
- **Language**: TypeScript v5.3.3
- **Runtime**: Node.js
- **Package Manager**: npm
- **Test Runner**: Playwright Test Runner
- **Reporting**: Playwright HTML Reporter

## 📁 Project Structure

```
automation/
├── src/
│   ├── pages/                    # Page Object Model classes
│   │   ├── HomePage.ts          # Home page interactions
│   │   ├── ParfumPage.ts        # Parfum category page interactions
│   │   └── FilterPanel.ts       # Filter panel component
│   ├── tests/                   # Test specifications
│   │   ├── parfum-filter.spec.ts      # Filter validation tests
│   │   └── parfum-datadriven.spec.ts  # Data-driven filter tests
│   ├── test-data/               # Test data files (JSON)
│   │   ├── parfumFilters.json
│   │   ├── dataDrivenFilters.json
│   │   ├── highlightsFilters.json
│   │   └── filterCategories.json
│   └── utils/                   # Utility functions
│       ├── cookieHandler.ts     # Cookie consent automation
│       └── assertions.ts        # Custom assertion helpers
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 📋 Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **Operating System**: Windows, macOS, or Linux
- **Internet Connection**: Required for accessing Douglas.de

## 🚀 Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd automation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install chromium
   ```

## ⚙️ Configuration

### Playwright Configuration

The framework is configured in `playwright.config.ts` with the following settings:

- **Base URL**: `https://www.douglas.de/de`
- **Timeout**: 120 seconds per test
- **Expect Timeout**: 10 seconds
- **Workers**: 1 (sequential execution to avoid anti-bot triggers)
- **Retries**: 2 on CI, 0 locally
- **Browser**: Chromium with custom user agent
- **Screenshots**: On failure only
- **Videos**: Retained on failure
- **Traces**: On first retry

### Anti-Bot Configuration

The framework includes several anti-bot measures:

```typescript
args: [
  '--disable-blink-features=AutomationControlled',
  '--disable-dev-shm-usage',
  '--no-sandbox',
  '--start-maximized',
]
slowMo: 100  // Slows down operations by 100ms
```

## 🏃 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Specific Test File
```bash
npx playwright test src/tests/parfum-filter.spec.ts
```

### Run Tests with Specific Tag/Grep
```bash
npx playwright test --grep "SCENARIO 1"
```

### View Test Report
```bash
npm run report
```

## 🧪 Test Scenarios

### 1. Parfum Filter Tests (`parfum-filter.spec.ts`)

#### SCENARIO 1: Filter products using Produktart
- Navigates to the Parfum category
- Applies "Produktart → Parfum" filter
- Validates filtered products are displayed
- Verifies product category matches filter

#### SCENARIO 2: Remove filter and validate all products
- Applies a filter first
- Removes all applied filters
- Validates that the product list refreshes
- Ensures all products are displayed again

#### SCENARIO 3: Brand-based filtering (Calvin Klein)
- Navigates to subcategory: Damen Duft → Deodorants
- Applies brand filter: Calvin Klein
- Validates only Calvin Klein products are displayed
- Verifies brand names in product listings

### 2. Data-Driven Filter Tests (`parfum-datadriven.spec.ts`)

- **Dynamic Test Generation**: Tests are generated from JSON data files
- **Highlights Filtering**: Tests Sale, NEU, and Limitiert badges
- **Product Details Extraction**: Extracts brand, name, category, gender, and badges
- **Client-Side Validation**: Filters products based on extracted data

## 📄 Page Object Model

### HomePage (`src/pages/HomePage.ts`)
- `navigate()`: Navigates to the Douglas.de homepage
- `navigateToParfum()`: Navigates to the Parfum category
- Cookie consent handling

### ParfumPage (`src/pages/ParfumPage.ts`)
- `selectCategory(categoryName)`: Selects a product category
- `selectProductType(typeName)`: Selects a product type
- `applyFilter(type, value)`: Applies a specific filter
- `clearFilters()`: Clears all applied filters
- `getProductCount()`: Returns the number of visible products
- `getVisibleProductBrands()`: Returns all visible product brands
- `validateFirstProductCategory(expectedCategory)`: Validates product category
- `getAllProductDetails()`: Extracts comprehensive product information

### FilterPanel (`src/pages/FilterPanel.ts`)
- `openFilterCategory(category)`: Opens a filter category
- `selectFilterValue(value)`: Selects a filter value
- `applyFilter()`: Applies the selected filter
- `clearAllFilters()`: Clears all filters

### CookieHandler (`src/utils/cookieHandler.ts`)
- `acceptCookies(timeout)`: Handles cookie consent popups
- Implements retry logic for reliability

## 📊 Test Data Management

Test data is managed through JSON files in the `src/test-data/` directory:

### `parfumFilters.json`
```json
[
  {
    "scenario": "Parfum Filter",
    "filterType": "Produktart",
    "filterValue": "Parfum"
  },
  {
    "scenario": "Brand Filter",
    "filterType": "Marke",
    "brandValue": "Calvin Klein",
    "subCategory": "Damendüfte",
    "productType": "Deodorants"
  }
]
```

### `highlightsFilters.json`
```json
[
  { "filterValue": "Sale" },
  { "filterValue": "NEU" },
  { "filterValue": "Limitiert" }
]
```

### `filterCategories.json`
Contains filter category names for data-driven testing.

## 📈 Reporting

### HTML Report
After test execution, view the HTML report:
```bash
npm run report
```

The report includes:
- Test execution summary
- Pass/fail status for each test
- Screenshots on failure
- Video recordings on failure
- Execution traces for debugging

### Console Output
Tests provide detailed console logging:
- Product counts after filtering
- Filter application status
- Product details extraction
- Validation results

## 🎯 Best Practices

1. **Page Object Model**: All page interactions are encapsulated in page objects
2. **Explicit Waits**: Uses Playwright's auto-waiting with custom timeouts
3. **Reload Strategy**: Implements page reloads after filter changes for consistency
4. **Cookie Handling**: Automated cookie consent to avoid test interruptions
5. **Error Handling**: Try-catch blocks for graceful error handling
6. **Data-Driven**: Separates test data from test logic
7. **Assertions**: Uses Playwright's expect for robust assertions
8. **Logging**: Comprehensive console logging for debugging

## 🔧 Troubleshooting

### Tests Failing Due to Cookie Popup
- The framework includes automatic cookie handling
- If issues persist, increase the timeout in `cookieHandler.ts`

### Anti-Bot Detection
- Tests run with `slowMo: 100` to mimic human behavior
- Custom user agent is configured
- Workers set to 1 to avoid parallel requests

### Products Not Loading
- Check if the page requires additional wait time
- Verify the base URL is accessible
- Ensure network connection is stable

### Filter Not Applying
- The framework implements page reloads after filter changes
- Check if filter locators have changed on the website
- Verify test data matches available filters

### Timeout Errors
- Increase timeout values in `playwright.config.ts`
- Check network speed and website responsiveness
- Verify selectors are correct

## 📝 Contributing

When adding new tests or page objects:

1. Follow the existing POM structure
2. Add test data to appropriate JSON files
3. Use TypeScript for type safety
4. Include proper error handling
5. Add console logging for debugging
6. Update this README with new scenarios

## 📄 License

ISC

## 👤 Author

Created as part of the Douglas.de automation assessment project.

---

**Last Updated**: January 2026
**Framework Version**: 1.0.0
**Playwright Version**: 1.41.0
