# 🚀 APEX UI Automation Framework

A production-ready Test Automation Framework built with **Playwright**, **TypeScript**, and **Cucumber BDD** for the APEX UI application. This framework follows the Page Object Model (POM) pattern and includes a robust JSON-based test data management system.

---

## ✨ Key Features

- **Playwright**: Cutting-edge browser automation.
- **Cucumber BDD**: Business-readable test scenarios.
- **TypeScript**: Type-safe development.
- **JSON Test Data**: Externalized data management with dot-notation path resolution.
- **Multi-Browser**: Support for Chromium, Firefox, and WebKit.
- **Robust Reporting**: HTML, JSON, and JUnit reports.
- **CI/CD Ready**: Integrated with GitHub Actions.

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- **Node.js**: Version 18 or higher.
- **NPM**: Package manager (included with Node.js).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

### 4. Environment Configuration
Create or update your `.env` file in the project root:
```env
ENV=qa
BROWSER=chromium
HEADLESS=false
BASE_URL=https://admin.dev.itcapps.co/
```

---

## 🖥️ Execution Modes (Headed vs Headless)

The framework allows you to see the browser in action (Headed) or run it in the background (Headless).

### 1. Toggle via `.env`
Update the `HEADLESS` variable:
- `HEADLESS=false` (Headed mode - browser visible)
- `HEADLESS=true` (Headless mode - background)

### 2. Override via CLI
You can override the `.env` setting for a specific run:
```bash
# Windows (PowerShell)
$env:HEADLESS="true"; npm test

# Mac/Linux
HEADLESS=true npm test
```

---

## 🌐 Browser Selection

You can run your tests on different browser engines.

### 1. Supported Browsers
- `chromium` (Default)
- `firefox`
- `webkit` (Safari)

### 2. How to Switch
Update the `BROWSER` variable in your `.env` file, or pass it via CLI:
```bash
# Run on Firefox
$env:BROWSER="firefox"; npm test
```

---

## 🌎 Managing Environments

The framework supports multiple environments (e.g., `dev`, `qa`, `uat`). You can switch environments in two ways:

1. **Via `.env` file**: Update the `ENV` variable.
2. **Via Command Line**:
```bash
# Set environment for a single run (Cross-env used internally)
ENV=dev npm test
```

Environment-specific URLs are configured in `src/utils/ConfigReader.ts`.

---

## 📊 Test Data Management (JSON)

This framework uses a JSON-based system to keep test data separate from scenario logic.

### 1. Externalize Data
Data is stored in `test-data/*.json`. For example, `test-data/test.json`:
```json
{
  "credentials": {
    "validUser": {
      "username": "...",
      "password": "..."
    }
  }
}
```

### 2. Load and Use in Gherkin
Use the `Given I load test data from` step in your `Background` section, then reference the data using dot-notation:
```gherkin
Background:
  Given I load test data from "test-data/test.json"

Scenario: Successful Login
  When I enter training username "credentials.validUser.username"
  And I enter training password "credentials.validUser.password"
```

---

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run by Tags
```bash
# Run smoke tests
npm run test:smoke

# Run specifically tagged tests
npx cucumber-js --tags "@dashboard"
```

### Parallel Execution
Parallel execution is enabled by default in `cucumber.json`. You can adjust it via the `.env` file or `cucumber.json`:
```bash
npm run test:parallel
```

---

## 📂 Project Structure

```text
├── .github/workflows/  # CI/CD pipeline
├── features/           # BDD feature files (*.feature)
├── src/
│   ├── pages/         # Page Object Model classes
│   ├── steps/         # Step definition files
│   ├── support/       # Hooks and World configuration
│   └── utils/         # Helper utilities (TestDataManager, Logger, etc.)
├── test-data/          # JSON test data files
└── reports/            # Test execution results
```

---

## 📈 Reporting

After running tests, detailed reports are generated in the `reports/` folder:
- **HTML Report**: `reports/cucumber-report/cucumber-report.html`
- **Screenshots/Videos**: Captured on failure in `reports/screenshots/` and `reports/videos/`.

---
**Happy Testing! 🎉**
