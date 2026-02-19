# 🎯 AI-Driven Slot Booking Test Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-2D4C73?style=flat&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

A comprehensive, beginner-friendly test automation framework for **AI-Driven Slot Booking Application** built with **Playwright + TypeScript**. Perfect for learning modern test automation practices!

---

## 📖 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Key Features](#-key-features)  
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🧪 Running Tests](#-running-tests)
- [📊 Data Utilities](#-data-utilities)
- [🔐 Test Credentials](#-test-credentials)
- [📋 Examples](#-examples)
- [📊 Reports](#-reports)
- [🛠️ Configuration](#️-configuration)
- [🐛 Troubleshooting](#-troubleshooting)
- [📚 Learning Resources](#-learning-resources)

## 🎯 Overview

This framework is designed to help you learn and implement **modern test automation** for web applications. It focuses on the AI-Driven Slot Booking system with **real-world examples** and **best practices**.

### 🎓 Perfect for Learning:
- **Beginners** - Clear examples and detailed documentation
- **Intermediate** - Advanced patterns and data-driven testing
- **Teams** - Scalable architecture and maintainable code

## ✨ Key Features

### 🧪 **Testing Capabilities**
- 🎯 **UI Testing** - Complete web application testing
- 🔌 **API Testing** - Backend service validation  
- 👥 **Role-Based Testing** - SuperAdmin, Trainer, Trainee roles
- 🔄 **Cross-Environment** - DEV, QA environment support

### 📊 **Data Management** 
- 📈 **Data Generation** - Random test data creation
- 📄 **Excel Support** - Read/write Excel files
- 📋 **CSV Operations** - Complete CSV handling
- 🎲 **Dynamic Data** - Runtime data generation

### 🏗️ **Architecture**
- 📄 **Page Object Model** - Maintainable test structure
- 🔒 **TypeScript** - Type-safe development
- ⚡ **Parallel Execution** - Fast test execution
- 📸 **Auto Screenshots** - Visual test documentation

### 📊 **Reporting**
- 📋 **HTML Reports** - Interactive test results
- 📝 **Text Reports** - Simple `.txt` output
- 🎥 **Video Recording** - Test execution videos
- 📊 **Multiple Formats** - Various report types

## � Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- **VS Code** ([Download](https://code.visualstudio.com/)) - Recommended

### ⚡ 1-Minute Setup

```bash
# Clone the repository
git clone https://github.com/Vignesh8205/ai-driven-Slot-Booking-Automation.git
cd ai-driven-Slot-Booking-Automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Generate sample test data
npm run generate:test-data

# Run your first test
npm run test:ui:dev
```

### 🎉 Verify Installation

```bash
# Check if everything works
npm run test:data-driven
```

**Expected Output:** ✅ All tests should pass and you'll see generated test data in the console.

## �📁 Project Structure

### 📂 **Core Framework**
```
📁 ai-driven-slot-booking-test-framework/
├── 📁 config/
│   └── 📄 env.config.ts          # 🌍 Environment settings (DEV/QA)
├── 📁 pages/
│   ├── 📄 base.page.ts           # 🏗️ Base page with utilities
│   ├── 📄 login.page.ts          # 🔐 Login functionality
│   └── 📄 dashboard.page.ts      # 📊 Main dashboard features
├── 📁 utils/
│   ├── 📄 data-generator.ts      # 🎲 Random data creation
│   ├── 📄 excel-reader.ts        # 📊 Excel file operations
│   ├── 📄 csv-reader.ts          # 📋 CSV file operations
│   └── 📄 index.ts               # 📦 Utility exports
└── 📁 tests/
    ├── 📁 ui/
    │   ├── 📄 login.spec.ts       # 🧪 Login tests
    │   └── 📄 data-driven.spec.ts # 📊 Data-driven examples
    └── 📁 api/
        └── 📄 user-api.spec.ts    # 🔌 API tests
```

### 📂 **Test Data & Reports**
```
├── 📁 test-data/
│   ├── 📄 credentials.json       # 🔑 User credentials
│   ├── 📄 sample-data.xlsx       # 📊 Excel test data
│   ├── 📄 sample-data.csv        # 📋 CSV test data
│   └── 📄 generated-users.csv    # 👥 Auto-generated users
├── 📁 reports/                   # 📈 Test reports (auto-created)
├── 📁 screenshots/               # 📸 Test screenshots (auto-created)
└── 📁 scripts/
    └── 📄 generate-test-data.js   # 🛠️ Data generation script
```

## 🧪 Running Tests

### 🎯 **Quick Test Commands**

```bash
# 🚀 Run all tests (recommended for beginners)
npm run test:ui:dev

# 🎭 Run with browser visible (great for learning)
npx playwright test --headed

# 📊 Run data-driven tests (see data utilities in action)
npm run test:data-driven

# 🔍 Run specific test file
npx playwright test tests/ui/login.spec.ts
```

### 🌍 **Environment-Based Testing**

```bash
# 🔧 Development Environment
npm run test:ui:dev        # UI tests in DEV
npm run test:api:dev       # API tests in DEV  
npm run test:all:dev       # All tests in DEV

# 🧪 QA Environment
npm run test:ui:qa         # UI tests in QA
npm run test:api:qa        # API tests in QA
npm run test:all:qa        # All tests in QA
```

### 🎥 **Interactive Mode**
```bash
# 🎮 Interactive test runner (beginner-friendly)
npx playwright test --ui

# 📊 View test reports
npx playwright show-report
```



## 📊 Viewing Reports

After test execution, a text report is automatically generated:

**Location:** `reports/test-report.txt`

**Open in Notepad:**
```powershell
notepad reports\test-report.txt
```

### Sample Report Output

```
===========================
PLAYWRIGHT TEST REPORT
===========================
DATE: 10/28/2025, 5:50:00 PM
---------------------------
✅ Valid user should login successfully (PASSED)
✅ GET /users returns 200 (PASSED)
---------------------------
TOTAL: 2
STATUS: PASSED
===========================
```

## 🌐 Environment Configuration

Edit `config/env.config.ts` to customize environments:

```typescript
export const EnvConfig = {
  dev: {
    baseURL: "https://aidrivenslotbookingapp.netlify.app/",
    username: "testsuperadmin@gmail.com",
    password: "testsuperadmin@gmail.com"
  },
  qa: {
    baseURL: "https://aidrivenslotbookingapp.netlify.app/",
    username: "testtrainer@gmail.com",
    password: "testtrainer@gmail.com"
  }
};
```

## 📝 Writing Tests

### Slot Booking Login Test Example

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { AuthUtils, loginAsRole } from "../../utils/auth.utils";
import { getEnv } from "../../config/env.config";

const env = getEnv();

test("Login as SuperAdmin and verify dashboard", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const authUtils = new AuthUtils(page);

  // Navigate to application
  await page.goto(env.baseURL);

  // Login as SuperAdmin with role-based helper
  await loginAsRole(page, 'superadmin');

  // Verify successful login
  expect(await authUtils.isLoggedIn()).toBe(true);
  expect(await authUtils.getCurrentUserRole()).toBe("superadmin");
});
```

### Role-Based Authentication Test Example

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { AuthUtils } from "../../utils/auth.utils";
import { getEnv } from "../../config/env.config";

const env = getEnv();

test("Test all user roles", async ({ page }) => {
  const authUtils = new AuthUtils(page);

  // Test SuperAdmin login
  await authUtils.loginAsSuperAdmin();
  expect(await authUtils.getCurrentUserRole()).toBe("superadmin");
  await authUtils.logout();

  // Test Trainer login
  await authUtils.loginAsTrainer();
  expect(await authUtils.getCurrentUserRole()).toBe("trainer");
  await authUtils.logout();

  // Test Trainee login
  await authUtils.loginAsTrainee();
  expect(await authUtils.getCurrentUserRole()).toBe("trainee");
});
```

### Page Object with Private Locators - Login Page

```typescript
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  // Private readonly locators with proper typing
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator("#email, input[name='email']");
    this.passwordInput = page.locator("#password, input[name='password']");
    this.loginButton = page.locator("button[type='submit']");
    this.errorMessage = page.locator(".error, .alert-error");
  }

  async performLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async performLoginWithHighlight(email: string, password: string) {
    await this.highlightElement(this.emailInput);
    await this.typeSlowly(this.emailInput, email, 100);
    await this.highlightElement(this.passwordInput);
    await this.typeSlowly(this.passwordInput, password, 100);
    await this.click(this.loginButton);
  }
}
```

### API Test Example

```typescript
import { test, expect } from "@playwright/test";
import { getEnv } from "../../config/env.config";

const env = getEnv();

test("API test", async ({ request }) => {
  const response = await request.get(`${env.baseURL}/api/users`);
  expect(response.status()).toBe(200);
});
```

## 🔐 Test Credentials

**Ready to use!** The application supports three user roles with pre-configured test accounts:

```json
{
  "superAdmin": {
    "username": "testsuperadmin@gmail.com",
    "password": "testsuperadmin@gmail.com"
  },
  "trainer": {
    "username": "testtrainer@gmail.com",
    "password": "testtrainer@gmail.com"
  },
  "trainee": {
    "username": "testtrainee@gmail.com",
    "password": "testtrainee@gmail.com"
  }
}
```

### 🚀 **Quick Login Helpers** (Copy These!)

```typescript
// Use role-based login helpers
await loginAsRole(page, 'superadmin');
await loginAsRole(page, 'trainer');
await loginAsRole(page, 'trainee');

// Or use AuthUtils class
const authUtils = new AuthUtils(page);
await authUtils.loginAsSuperAdmin();
await authUtils.loginAsTrainer();
await authUtils.loginAsTrainee();
```

## 📋 Examples

### 🧪 **Your First Test** (Start Here!)

Create `my-first-test.spec.ts` and copy this code:

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test("My first login test", async ({ page }) => {
  // 1. Create a login page object
  const loginPage = new LoginPage(page);
  
  // 2. Go to the application  
  await page.goto("https://aidrivenslotbookingapp.netlify.app/");
  
  // 3. Login as SuperAdmin
  await loginPage.loginAsSuperAdmin();
  
  // 4. Verify we're logged in
  expect(page.url()).toContain("aidrivenslotbookingapp.netlify.app");
  
  console.log("🎉 My first test passed!");
});
```

**Run it:**
```bash
npx playwright test my-first-test.spec.ts --headed
```

### 📊 **Data-Driven Test** (Next Level!)

```typescript
import { test, expect } from "@playwright/test";
import { CSVReader, DataGenerator } from "../../utils";
import { LoginPage } from "../../pages/login.page";

test("Login with generated data", async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Generate random user data
  const randomUser = DataGenerator.generateUserData('trainer');
  console.log("Generated user:", randomUser);
  
  // Read real credentials from CSV file  
  const credentials = await CSVReader.readTestCredentials('./test-data/sample-data.csv');
  const realTrainer = credentials.trainer[0];
  
  await page.goto("https://aidrivenslotbookingapp.netlify.app/");
  
  // Use real credentials for login
  await loginPage.performLogin(realTrainer.username, realTrainer.password);
  
  expect(page.url()).toContain("aidrivenslotbookingapp.netlify.app");
});
```

### 🎯 **Page Object Example** (Professional Pattern!)

```typescript
// Create your own page object
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class MyCustomPage extends BasePage {
  private readonly myButton: Locator;
  private readonly myInput: Locator;
  
  constructor(page: Page) {
    super(page);
    this.myButton = page.locator("#my-button");
    this.myInput = page.locator("#my-input");
  }
  
  async fillAndSubmit(text: string) {
    await this.type(this.myInput, text);
    await this.click(this.myButton);
  }
}
```

## 📊 Reports

### 🎨 **HTML Reports** (Interactive & Beautiful)

```bash
# Run tests and generate HTML report
npm run test:ui:dev

# View the beautiful HTML report
npx playwright show-report
```

**Features:**
- 📊 Interactive test results
- 📸 Screenshots on failure
- 🎥 Video recordings
- 📈 Test statistics
- 🔍 Detailed error logs

### 📝 **Text Reports** (Simple & Quick)

**Location:** `reports/test-report.txt`

```bash
# View in Notepad (Windows)
notepad reports/test-report.txt

# View in terminal
cat reports/test-report.txt
```

**Sample Output:**
```
===========================
PLAYWRIGHT TEST REPORT  
===========================
DATE: 11/03/2025, 2:30:15 PM
---------------------------
✅ Login as Super Admin (PASSED) 
✅ Generate test data (PASSED)
✅ Read CSV credentials (PASSED)
---------------------------
TOTAL: 3 tests
PASSED: 3 ✅
FAILED: 0 ❌  
STATUS: ALL TESTS PASSED 🎉
===========================
```

## ⚙️ Configuration

### 🔧 **Framework Settings** (`playwright.config.ts`)

**Optimized for learning and productivity:**

- ⏱️ **Timeout:** 60 seconds per test (no rushing!)
- 🔄 **Retries:** 1 retry on failure (forgiving for beginners)
- ⚡ **Workers:** 4 parallel workers (fast execution)
- 📸 **Screenshots:** Auto-capture on failure
- 🎥 **Videos:** Recorded when tests fail
- 📊 **Reports:** HTML + Text format

### 📜 **Available Commands**

| 🎯 Purpose | 💻 Command | 📖 Description |
|------------|------------|-----------------|
| **🚀 Quick Start** | `npm run test:ui:dev` | Run UI tests (best for beginners) |
| **📊 Data Learning** | `npm run test:data-driven` | See data utilities in action |
| **🎮 Interactive** | `npx playwright test --ui` | Visual test runner |
| **👀 Watch Mode** | `npx playwright test --headed` | See browser actions |
| **📈 Generate Data** | `npm run generate:test-data` | Create sample files |
| **🌍 Environment** | `npm run test:ui:qa` | Test in QA environment |
| **🔌 API Testing** | `npm run test:api:dev` | Test backend APIs |
| **📊 Reports** | `npx playwright show-report` | View HTML results |

## 🐛 Troubleshooting

### 🔧 **Common Issues & Solutions**

#### ❌ **"Browsers not found"**
```bash
# Solution: Install browsers
npx playwright install
```

#### ❌ **"Module not found" errors**
```bash
# Solution: Install dependencies
npm install
```

#### ❌ **Tests fail to find elements**
```bash
# Check if site is accessible
curl https://aidrivenslotbookingapp.netlify.app/

# Run in headed mode to see what's happening
npx playwright test --headed

# Check your locators in DevTools (F12)
```

#### ❌ **TypeScript compilation errors**
```bash
# Check for TypeScript issues
npx tsc --noEmit

# If you see errors, check your import statements
```

### 🎯 **Debug Mode Commands**

```bash
# 👀 See what the browser is doing
npx playwright test --headed

# 🐛 Step-by-step debugging  
npx playwright test --debug

# 🎮 Interactive test runner
npx playwright test --ui

# 📋 Run only one test file
npx playwright test tests/ui/login.spec.ts

# 🔍 Verbose output
npx playwright test --reporter=line
```

## 📚 Learning Resources

### 🎓 **Start Your Learning Journey**

#### **Step 1: Understand the Basics** 
- 📄 **Page Objects** - `pages/login.page.ts` (see how elements are organized)
- 🧪 **Simple Tests** - `tests/ui/login.spec.ts` (start here!)
- 🔧 **Configuration** - `playwright.config.ts` (framework settings)

#### **Step 2: Master Data-Driven Testing**
- 📊 **Data Generation** - `utils/data-generator.ts`  
- 📄 **CSV Operations** - `utils/csv-reader.ts`
- 📊 **Excel Operations** - `utils/excel-reader.ts`
- 🧪 **Examples** - `tests/ui/data-driven.spec.ts`

#### **Step 3: Advanced Patterns**
- 🏗️ **Base Page Pattern** - `pages/base.page.ts`
- 🌍 **Environment Config** - `config/env.config.ts`
- 📊 **Custom Reporting** - `reporter/native-text-reporter.ts`

### 🔗 **External Resources**

- 📚 [Playwright Documentation](https://playwright.dev/docs/intro)
- 🎥 [Playwright YouTube Channel](https://www.youtube.com/@Playwrightdev)
- 💻 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🎯 [Page Object Model Guide](https://playwright.dev/docs/pom)

### Utilities Guide
See **[docs/UTILITIES_GUIDE.md](docs/UTILITIES_GUIDE.md)** for complete documentation of all 70+ utility methods including:
- Click, type, scroll, highlight methods
- Wait strategies and element stability checks
- Private readonly Locator pattern examples
- Advanced features (retry, conditional actions, realistic typing)
- Best practices and quick reference

### Quick Reference
See **[docs/QUICK_REFERENCE.md](docs/QUICK_REFERENCE.md)** for a cheat sheet with:
- Most-used utility methods
- Common test patterns
- Page object template
- Test writing examples

### Available Utility Categories
- **Navigation** - goto, back, forward, reload, waitForUrl
- **Click Actions** - click, doubleClick, rightClick, clickWithRetry, hoverAndClick, clickAtPosition
- **Type Actions** - type, typeSlowly, typeRealistic, pressKey, clearField
- **Scroll** - scrollToElement, scrollToTop/Bottom, scrollByPercentage, scrollByPixels, scrollAndHighlight
- **Highlight** - highlightElement (with custom colors and duration)
- **Wait** - waitForElement, waitForStable, waitForAnimations, waitForNetworkIdle, waitForTimeout
- **Assertions** - verifyElementVisible, verifyText, verifyCount, verifyEnabled/Disabled
- **Form Actions** - check, uncheck, selectDropdown, isChecked, getValue
- **Get/Read** - getText, getValue, getElementCount, getStyle, isInViewport, isElementVisible
- **Screenshots** - takeScreenshot, takeElementScreenshot, takeTimestampedScreenshot
- **Cookies** - setCookie, getCookie, clearCookies
- **Conditional Actions** - clickIfVisible, typeIfVisible (no error if element not found)
- **Advanced** - clickWithRetry, waitForElementStable, refreshAndWait, getPageTitle, getCurrentUrl
- And many more!

## 📦 Dependencies

- **@playwright/test:** ^1.49.0
- **typescript:** ^5.6.0
- **cross-env:** ^7.0.3 (for cross-platform env variables)

## 📊 Data Utilities

**Perfect for learning data-driven testing!** The framework includes powerful, easy-to-use data utilities:

### 🎲 **Data Generation** (Beginner-Friendly)

**Learn:** Generate realistic test data without hardcoding values!

```typescript
import { DataGenerator } from "../utils";

// Generate random user data
const user = DataGenerator.generateUserData('trainer');
// Output: { email: "john.smith@slotbooking.test", password: "abc123", firstName: "John", ... }

// Generate slot booking data
const slot = DataGenerator.generateSlotData();
// Output: { slotId: "SLOT_ABC123", date: "2025-11-15", time: "10:00", ... }

// Generate multiple records
const users = DataGenerator.generateMultipleRecords(() => 
  DataGenerator.generateUserData('trainee'), 5
);
```

### 📄 **CSV Operations** (Excel Alternative)

**Learn:** Work with CSV files - simpler than Excel, perfect for beginners!

```typescript
import { CSVReader } from "../utils";

// Read test credentials from CSV
const credentials = await CSVReader.readTestCredentials('./test-data/sample-data.csv');
console.log(credentials.superAdmin); // Array of super admin users

// Read any CSV file
const data = await CSVReader.readCSVFile('./test-data/users.csv');

// Write data to CSV
await CSVReader.writeCSVFile(testData, './output/results.csv');

// Filter CSV data
const activeUsers = await CSVReader.readCSVWithFilter(
  './test-data/users.csv',
  row => row.status === 'active'
);
```

### 📊 **Excel Operations** (Advanced)

**Learn:** Handle complex Excel files with multiple sheets and data types!

```typescript
import { ExcelReader } from "../utils";

// Read test credentials from Excel
const credentials = await ExcelReader.readTestCredentials('./test-data/sample-data.xlsx');

// Read specific sheet
const slotData = await ExcelReader.readSlotBookingData('./test-data/bookings.xlsx', 'SlotData');

// Write data to Excel
await ExcelReader.writeExcelFile(testResults, './reports/test-results.xlsx');

// Read with data type conversion
const typedData = await ExcelReader.readExcelWithTypes(
  './test-data/bookings.xlsx',
  { capacity: 'number', date: 'date', active: 'boolean' }
);
```

### 📁 **One-Click Data Setup**

**Learn:** Get started instantly with pre-generated sample data!

```powershell
# Generate all sample files
npm run generate:test-data

# Validate data file structure  
npm run validate:test-data

# Run data-driven tests
npm run test:data-driven
```

**Generated Files:**
- `sample-data.xlsx` - Excel file with test credentials
- `sample-data.csv` - CSV file with test credentials  
- `generated-users.csv` - Random user data
- `slot-bookings.csv` - Random slot booking data

###  **Complete Example** (Copy & Learn!)

```typescript
import { test, expect } from "@playwright/test";
import { CSVReader, DataGenerator } from "../../utils";
import { LoginPage } from "../../pages/login.page";

test("Login with CSV data", async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Read credentials from CSV
  const credentials = await CSVReader.readTestCredentials('./test-data/sample-data.csv');
  const trainerCred = credentials.trainer[0];
  
  // Use CSV data for login
  await loginPage.performLogin(trainerCred.username, trainerCred.password);
  
  // Verify login success
  expect(page.url()).toContain('/dashboard');
});
```

## 🐛 Troubleshooting

### Issue: "Browser not installed"
**Solution:**
```powershell
npx playwright install
```

### Issue: TypeScript errors
**Solution:**
```powershell
npm install
npx tsc --noEmit
```

### Issue: Tests fail to find elements
**Solution:** 
- Check that the base URL is correct in `config/env.config.ts`
- Verify elements exist on the page using browser DevTools
- Update locators in page objects (`taxonomy.page.ts`, `login.page.ts`) to match your application

### Issue: Cross-platform script errors
**Solution:** This framework uses `cross-env` package to ensure scripts work on Windows, Mac, and Linux. Make sure dependencies are installed:
```powershell
npm install
```

## 🎯 Key Features of Taxonomy Tests

The `e2e-search.spec.ts` test suite demonstrates:

1. **Category Search** - Search taxonomy categories with visual highlighting
2. **Filter & Hierarchy** - Apply filters and verify taxonomy hierarchy structure  
3. **Scroll Interactions** - Navigate through categories with smooth scrolling
4. **Realistic Typing** - Human-like typing simulation for search inputs
5. **Conditional Handling** - Smart handling of optional elements (cookie banners, load more buttons)
6. **State Validation** - Comprehensive page state checks (URL, title, styles, counts)
7. **Visual Feedback** - Element highlighting with custom colors for better debugging
8. **Screenshots** - Automated screenshot capture for documentation and debugging

All tests use the **private readonly Locator** pattern for type safety and maintainability.

## 🤝 Contributing

We welcome contributions from developers at all skill levels! 

### 🚀 **How to Contribute**
1. **Fork** this repository to your GitHub account
2. **Clone** your fork locally: `git clone <your-fork-url>`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes and test them
5. **Commit** with clear messages: `git commit -m "Add amazing feature"`
6. **Push** to your fork: `git push origin feature/amazing-feature`
7. **Submit** a pull request with description

### 💡 **What You Can Contribute**
- 🐛 Bug fixes and improvements
- 📝 Documentation updates
- 🧪 New test examples
- 🛠️ Utility functions
- 🎨 Better error messages

### 🎯 **First-Time Contributors**
Look for issues labeled `good-first-issue` or start with:
- Adding test data examples
- Improving error messages
- Writing documentation
- Adding utility functions

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 🎉 Happy Testing! 

**Remember**: Every expert was once a beginner. Start small, learn gradually, and don't hesitate to ask questions!

> *"The best way to learn testing is by doing it!"* 🚀

---

**Built with ❤️ using Playwright + TypeScript for AI-Driven Slot Booking Application** 🎭📚
#   a i - d r i v e n - S l o t - B o o k i n g - A u t o m a t i o n 
 
 