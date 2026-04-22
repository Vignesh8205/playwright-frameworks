# 📘 APEX UI Automation Framework Guide

This guide provides detailed instructions on how to use and extend the framework, including creating Page Objects, Step Definitions, and managing Test Data.

---

## 🚀 1. How to Start the Script

### Running all tests
```bash
npm test
```

### Running specific scenarios by tags
```bash
npx cucumber-js --tags "@smoke"
```

### Running in different modes
- **Headed Mode**: Set `HEADLESS=false` in `.env` or run `$env:HEADLESS="false"; npm test`
- **Headless Mode**: Set `HEADLESS=true` in `.env` or run `$env:HEADLESS="true"; npm test`

---

## 🏢 2. Creating Page Objects (POM)

Page Objects are located in `src/pages/`. All page objects should extend `BasePage`.

### Example: `ContactPage.ts`
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactPage extends BasePage {
    // 1. Define Selectors
    private readonly selectors = {
        nameInput: '#name',
        submitBtn: 'button[type="submit"]'
    };

    // 2. Define Locators via getters
    private get nameInput(): Locator { return this.page.locator(this.selectors.nameInput); }

    constructor(page: Page) {
        super(page);
    }

    // 3. Define Actions
    async fillContactForm(name: string): Promise<void> {
        await this.fill(this.nameInput, name);
        await this.click(this.page.locator(this.selectors.submitBtn));
    }
}
```

---

## 🛠️ 3. Using BasePage Methods

`BasePage` provides common wrappers for Playwright actions with built-in logging and waiting.

| Method | Description |
|--------|-------------|
| `navigateTo(url)` | Navigates to a specific URL. |
| `click(locator)` | Waits for visibility and clicks an element. |
| `fill(locator, text)` | Clears and fills an input field. |
| `getText(locator)` | Retrieves text content from an element. |
| `waitForElement(locator)` | Explicitly waits for an element to be visible. |
| `verifyElementVisible(locator)`| Asserts that an element is visible. |

---

## 🎬 4. Creating Step Definitions

Step definitions are located in `src/steps/`. They connect Gherkin steps to Page Object actions.

### Example: `contact.steps.ts`
```typescript
import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { ContactPage } from '../pages/ContactPage';

let contactPage: ContactPage;

When('I fill the contact form with name {string}', async function (this: CustomWorld, name: string) {
    // 1. Initialize Page Object using this.page (Page instance from World)
    contactPage = new ContactPage(this.page);
    
    // 2. Perform Action
    await contactPage.fillContactForm(name);
});
```

---

## 🧪 5. Organizing Test Cases

Tests are written in Gherkin (`.feature` files) and located in `features/`.

### Recommended Structure:
```gherkin
@feature-tag
Feature: Feature Name
  As a [Role]
  I want [Action]
  So that [Value]

  Background:
    Given I load test data from "test-data/data.json"
    And I navigate to the application

  @scenario-tag
  Scenario: Scenario Description
    When I perform some action
    Then I should see the expected result
```

---

## 📂 6. Passing and Using Test Data (JSON)

We use a path-based system to retrieve data from JSON files.

### 1. Define Data in JSON (`test-data/contact.json`)
```json
{
  "user": {
    "profile": {
      "firstName": "John"
    }
  }
}
```

### 2. Load and Reference in Steps
In your step definitions, use the `TestDataManager` to resolve paths.

```typescript
import { TestDataManager } from '../utils/TestDataManager';

When('I enter my first name using path {string}', async function (this: CustomWorld, dataPath: string) {
    // Resolve path "user.profile.firstName" to "John"
    const firstName = TestDataManager.resolveValue(this.getTestData(), dataPath);
    await contactPage.fill(this.page.locator('#firstName'), firstName);
});
```

### 3. Usage in Gherkin
```gherkin
Background:
  Given I load test data from "test-data/contact.json"

Scenario: Fill Form
  When I enter my first name using path "user.profile.firstName"
```

---

## 🔗 7. Connecting Pages to Step Definitions

1. **The World**: `CustomWorld` (in `src/support/world.ts`) maintains the browser `page` and `testData`.
2. **Context Sharing**: When a scenario starts, a new `page` is created and stored in the World.
3. **Implicit Link**: Step definitions access the World instance via `this`. They use `this.page` to instantiate Page Objects and `this.getTestData()` to access loaded JSON data.

---

## ⚓ 8. Advanced Hooks and Failure Handling

The framework uses Cucumber hooks (in `src/support/hooks.ts`) to manage browser lifecycle and error recovery.

### Automatic Screenshots
If a step or scenario fails, the framework automatically:
1.  Logs the failure details to the console and log files.
2.  Captures a full-page screenshot and saves it to `reports/screenshots/`.
3.  Attaches the screenshot to the HTML report.

### Custom Hooks
You can add your own hooks with tag filters:
```typescript
Before({ tags: '@needs-cleanup' }, async function () {
    // Custom logic before scenarios with this tag
});
```

---

## 🧰 9. Extended Utility API

### `WaitHelper` (`src/utils/WaitHelper.ts`)
Used for complex wait conditions beyond simple visibility.

```typescript
const wait = new WaitHelper(this.page);
await wait.waitForNetworkIdle();      // Wait for all requests to finish
await wait.waitForElementClickable('#btn'); // Wait for visibility + enabled state
await wait.waitForUrlContains('admin'); // Wait for URL redirection
```

### `Logger` (`src/utils/Logger.ts`)
Provides structured logging to both the terminal and rotating log files.

```typescript
this.log('My message'); // Simplified log in World context
// Or use the Logger directly:
const logger = new Logger();
logger.info('Info message');
logger.error('Error message', { detail: 'extra info' });
```

---

## 🔍 10. Debugging & Troubleshooting

### Playwright Trace Viewer
Traces are the best way to debug intermittent failures. They record every action, network request, and console log.

1.  Enable tracing in `playwright.config.ts` (or via CLI).
2.  Open a trace file:
```bash
npx playwright show-trace path/to/trace.zip
```

### Log File Locations
- **All Logs**: `reports/logs/test-execution.log`
- **Errors Only**: `reports/logs/errors.log`

---

## 📊 11. Report Management

The following reports are generated after every run:

- **HTML Report**: `reports/cucumber-report/cucumber-report.html` (Interactive dashboard)
- **JSON Metadata**: `reports/cucumber-report.json` (For CI/CD ingestion)
- **JUnit**: `reports/junit.xml` (For test management tools)

---
**Happy Automating! 🚀**
