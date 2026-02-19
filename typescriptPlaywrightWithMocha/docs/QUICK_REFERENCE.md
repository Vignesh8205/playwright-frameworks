# Playwright Framework - Quick Reference

## 🎯 Page Object Pattern (Recommended)

```typescript
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class MyPage extends BasePage {
  // ✅ Use private readonly Locators
  private readonly submitBtn: Locator;
  private readonly nameInput: Locator;
  
  constructor(page: Page) {
    super(page);
    this.submitBtn = page.locator("#submit");
    this.nameInput = page.locator("#name");
  }
  
  async fillForm(name: string) {
    await this.type(this.nameInput, name);
    await this.click(this.submitBtn);
  }
}
```

## 🔥 Most Used Methods

### Click
```typescript
await page.click(locator)              // Basic click
await page.highlightElement(locator)   // Highlight element
await page.doubleClick(locator)        // Double click
```

### Type
```typescript
await page.type(locator, "text")           // Fast fill
await page.typeSlowly(locator, "text", 100) // Slow typing (100ms delay)
await page.clearField(locator)             // Clear field
```

### Scroll
```typescript
await page.scrollToElement(locator)    // Scroll to element
await page.scrollToTop()               // Scroll to page top
await page.scrollToBottom()            // Scroll to page bottom
```

### Wait
```typescript
await page.waitForElement(locator, "visible")
await page.waitForText(locator, "expected text")
await page.waitForLoadState("networkidle")
```

### Verify
```typescript
await page.verifyElementVisible(locator)
await page.verifyText(locator, "expected")
await page.verifyElementCount(locator, 5)
```

## 🚀 CommonUtils Advanced

```typescript
import { CommonUtils } from "../utils/common.utils";
const utils = new CommonUtils(page);
```

### Highlight with Colors
```typescript
await utils.highlightElement(locator, {
  color: "blue",
  backgroundColor: "yellow",
  duration: 2000
})
```

### Scroll and Highlight
```typescript
await utils.scrollAndHighlight(locator, 1500)
```

### Click with Retry
```typescript
await utils.clickWithRetry(locator, 3)  // Retry up to 3 times
```

### Realistic Typing
```typescript
await utils.typeRealistic(locator, "Hello")  // Types like a human
```

### Conditional Actions
```typescript
const clicked = await utils.clickIfVisible(locator, 2000)
const typed = await utils.typeIfVisible(locator, "text", 2000)
```

### Wait for Stable
```typescript
await utils.waitForElementStable(locator)  // Wait until element stops moving
```

## 📋 Test Template

```typescript
import { test, expect } from "@playwright/test";
import { MyPage } from "../../pages/my.page";
import { CommonUtils } from "../../utils/common.utils";
import { getEnv } from "../../config/env.config";

const env = getEnv();

test.describe("Feature Tests", () => {
  test("Test name", async ({ page }) => {
    const myPage = new MyPage(page);
    const utils = new CommonUtils(page);
    
    // Navigate
    await myPage.navigateTo(env.baseURL);
    
    // Perform actions
    await myPage.performAction();
    
    // Verify
    await myPage.verifyResult();
  });
});
```

## 🎨 Common Patterns

### Login with Highlight
```typescript
async performLoginWithHighlight(user: string, pass: string) {
  await this.highlightElement(this.usernameInput);
  await this.type(this.usernameInput, user);
  
  await this.highlightElement(this.passwordInput);
  await this.type(this.passwordInput, pass);
  
  await this.click(this.loginButton);
}
```

### Search with Scroll
```typescript
async searchProduct(query: string) {
  await this.scrollToElement(this.searchBox);
  await this.type(this.searchBox, query);
  await this.click(this.searchButton);
  await this.waitForLoadState("networkidle");
}
```

### Form Fill Pattern
```typescript
async fillContactForm(data: ContactData) {
  await this.type(this.nameInput, data.name);
  await this.type(this.emailInput, data.email);
  await this.selectDropdown(this.countrySelect, data.country);
  await this.check(this.agreeCheckbox);
  await this.click(this.submitButton);
}
```

## ⚡ Quick Commands

```powershell
# Install
npm install
npx playwright install

# Run tests
npm run test:ui:dev        # UI tests (DEV)
npm run test:ui:qa         # UI tests (QA)
npm run test:api:dev       # API tests (DEV)
npm run test:all:dev       # All tests (DEV)

# Debug
npx playwright test --headed
npx playwright test --ui
npx playwright test --debug

# Reports
notepad reports\test-report.txt
npx playwright show-report
```

## 📖 Full Documentation

- **[UTILITIES_GUIDE.md](UTILITIES_GUIDE.md)** - Complete method reference
- **[README.md](../README.md)** - Setup and configuration guide
