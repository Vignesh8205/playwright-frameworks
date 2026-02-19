# Playwright Utilities Guide

Complete reference for all utility methods available in the framework.

## 📂 Structure

- **`pages/base.page.ts`** - Base page with common utilities
- **`utils/common.utils.ts`** - Advanced utility functions
- **`pages/login.page.ts`** - Example page with private Locator variables
- **`pages/demo.page.ts`** - Demo page showing all patterns

---

## 🎯 BasePage Utilities

### Navigation

```typescript
await basePage.navigateTo(url: string)
await basePage.goBack()
await basePage.goForward()
await basePage.reload()
await basePage.waitForUrl(url: string | RegExp)
await basePage.waitForLoadState("load" | "domcontentloaded" | "networkidle")
```

### Click Actions

```typescript
await basePage.click(locator: Locator | string)
await basePage.doubleClick(locator: Locator | string)
await basePage.rightClick(locator: Locator | string)
await basePage.clickWithModifier(locator, "Control" | "Alt" | "Meta" | "Shift")
```

### Type/Input Actions

```typescript
await basePage.type(locator, "text", { delay?: number, clear?: boolean })
await basePage.typeSlowly(locator, "text", delay: number)
await basePage.pressKey(locator, "Enter")
await basePage.clearField(locator)
```

### Get Text/Attributes

```typescript
const text = await basePage.getText(locator)
const value = await basePage.getValue(locator)
const attr = await basePage.getAttribute(locator, "href")
const count = await basePage.getElementCount(locator)
```

### Scroll Actions

```typescript
await basePage.scrollToElement(locator)
await basePage.scrollToTop()
await basePage.scrollToBottom()
await basePage.scrollByPixels(x: number, y: number)
```

### Highlight Element

```typescript
// Highlight element with red border and yellow background for 2 seconds
await basePage.highlightElement(locator, duration: number = 2000)
```

### Wait Actions

```typescript
await basePage.waitForElement(locator, "visible" | "hidden" | "attached" | "detached")
await basePage.waitForText(locator, "expected text")
await basePage.waitForTimeout(milliseconds: number)
```

### Dropdown/Select

```typescript
await basePage.selectDropdown(locator, "option")
await basePage.selectDropdown(locator, ["option1", "option2"])
```

### Checkbox/Radio

```typescript
await basePage.check(locator)
await basePage.uncheck(locator)
const isChecked = await basePage.isChecked(locator)
```

### Hover & Drag

```typescript
await basePage.hover(locator)
await basePage.dragAndDrop(sourceLocator, targetLocator)
```

### File Upload

```typescript
await basePage.uploadFile(locator, "path/to/file.pdf")
await basePage.uploadFile(locator, ["file1.pdf", "file2.pdf"])
```

### Assertions

```typescript
await basePage.verifyElementVisible(locator)
await basePage.verifyElementHidden(locator)
await basePage.verifyElementEnabled(locator)
await basePage.verifyElementDisabled(locator)
await basePage.verifyText(locator, "expected")
await basePage.verifyExactText(locator, "exact match")
await basePage.verifyElementCount(locator, expectedCount: number)
```

### Element State Checks

```typescript
const isVisible = await basePage.isElementVisible(locator)
const isEnabled = await basePage.isElementEnabled(locator)
```

### Screenshots

```typescript
await basePage.takeScreenshot("screenshots/page.png")
await basePage.takeElementScreenshot(locator, "screenshots/element.png")
```

---

## 🔧 CommonUtils Advanced Features

### Click with Retry

```typescript
const utils = new CommonUtils(page);

// Retry clicking up to 3 times if element is not ready
await utils.clickWithRetry(locator, maxRetries: 3)
```

### Type with Wait

```typescript
// Type and wait 500ms after
await utils.typeWithWait(locator, "text", waitTime: 500)
```

### Highlight with Custom Colors

```typescript
await utils.highlightElement(locator, {
  color: "blue",
  backgroundColor: "lightgreen",
  duration: 3000
})
```

### Scroll Utilities

```typescript
// Smooth scroll to element
await utils.scrollToElementSmooth(locator)

// Scroll by percentage of page
await utils.scrollByPercentage(50) // 50% down the page

// Scroll to coordinates
await utils.scrollToCoordinates(x: 0, y: 500, smooth: true)

// Scroll and highlight
await utils.scrollAndHighlight(locator, duration: 1500)
```

### Wait for Stable Element

```typescript
// Wait for element to stop moving (useful for animations)
await utils.waitForElementStable(locator, timeout: 5000)
```

### Advanced Click Actions

```typescript
// Click at specific position within element
await utils.clickAtPosition(locator, { x: 50, y: 100 })

// Hover then click with delay
await utils.hoverAndClick(locator, delay: 500)
```

### Realistic Typing

```typescript
// Type with random delays like a human
await utils.typeRealistic(locator, "Hello World")
```

### Element Style & State

```typescript
// Get computed style
const bgColor = await utils.getStyle(locator, "background-color")

// Check if element is in viewport
const inView = await utils.isInViewport(locator)
```

### Wait Utilities

```typescript
await utils.waitForNetworkIdle(timeout: 5000)
await utils.waitForAnimations(locator)
await utils.waitForTimeout(milliseconds: number)
```

### Conditional Actions

```typescript
// Click only if visible (returns true/false)
const clicked = await utils.clickIfVisible(locator, timeout: 5000)

// Type only if visible
const typed = await utils.typeIfVisible(locator, "text", timeout: 5000)
```

### Multiple Elements

```typescript
// Get all text from matching elements
const texts = await utils.getAllTexts(locator)
```

### Screenshots

```typescript
// Take screenshot with timestamp
const fileName = await utils.takeTimestampedScreenshot("test")
// Returns: "screenshots/test-2025-10-28T12-30-45.png"
```

### JavaScript Execution

```typescript
// Execute custom JavaScript
const result = await utils.executeScript<number>("return document.body.scrollHeight")
```

### Page Information

```typescript
const url = utils.getCurrentUrl()
const title = await utils.getPageTitle()
```

### Page Actions

```typescript
await utils.refreshAndWait("networkidle")
```

### Cookie Management

```typescript
await utils.setCookie("name", "value", "domain.com")
const value = await utils.getCookie("name")
await utils.clearCookies()
```

---

## 📖 Page Object Pattern with Private Locators

### Example: LoginPage

```typescript
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  // Private locators - proper typing
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators in constructor
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#loginBtn");
  }

  // Page actions using private locators
  async performLogin(username: string, password: string) {
    await this.type(this.usernameInput, username);
    await this.type(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async performLoginWithHighlight(username: string, password: string) {
    await this.highlightElement(this.usernameInput);
    await this.type(this.usernameInput, username);
    
    await this.highlightElement(this.passwordInput);
    await this.type(this.passwordInput, password);
    
    await this.highlightElement(this.loginButton);
    await this.click(this.loginButton);
  }
}
```

---

## 🧪 Usage in Tests

### Basic Usage

```typescript
test("Example test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const utils = new CommonUtils(page);

  // Navigate
  await loginPage.navigateTo("https://example.com");

  // Use page methods
  await loginPage.performLogin("user", "pass");

  // Use utilities
  await utils.highlightElement(page.locator(".welcome"), {
    color: "green",
    backgroundColor: "lightgreen",
    duration: 2000
  });

  // Verify
  await loginPage.verifyElementVisible(page.locator(".dashboard"));
});
```

### With Highlight and Scroll

```typescript
test("Visual test with highlighting", async ({ page }) => {
  const demoPage = new DemoPage(page);
  const utils = new CommonUtils(page);

  await demoPage.navigateTo("https://example.com");

  // Scroll and highlight
  const searchBox = page.locator("#search");
  await utils.scrollAndHighlight(searchBox, 1500);

  // Type slowly
  await demoPage.typeSlowly(searchBox, "test query", 100);

  // Highlight button
  const submitBtn = page.locator("button[type='submit']");
  await utils.highlightElement(submitBtn, {
    color: "blue",
    backgroundColor: "yellow",
    duration: 1000
  });

  await demoPage.click(submitBtn);
});
```

### Conditional Actions

```typescript
test("Handle optional elements", async ({ page }) => {
  const utils = new CommonUtils(page);

  await page.goto("https://example.com");

  // Close popup if it appears
  const popup = page.locator("#popup");
  const closed = await utils.clickIfVisible(popup, 2000);
  console.log("Popup closed:", closed);

  // Continue with test...
});
```

---

## 🎨 Best Practices

### 1. Use Private Locators in Page Objects

✅ **Good:**
```typescript
export class MyPage extends BasePage {
  private readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.submitButton = page.locator("#submit");
  }

  async submit() {
    await this.click(this.submitButton);
  }
}
```

❌ **Bad:**
```typescript
export class MyPage extends BasePage {
  submitButton = "#submit"; // String, not Locator

  async submit() {
    await this.click(this.submitButton);
  }
}
```

### 2. Use Highlight for Debugging

```typescript
// During test development, highlight elements
await utils.highlightElement(element, { duration: 2000 });

// Remove or reduce duration in production
```

### 3. Wait for Stability

```typescript
// For animated elements
await utils.waitForElementStable(animatedElement);
await utils.click(animatedElement);
```

### 4. Use Conditional Actions for Flaky Elements

```typescript
// Instead of try-catch blocks
const clicked = await utils.clickIfVisible(optionalElement);
if (clicked) {
  console.log("Element was clicked");
}
```

---

## 📚 Method Categories Quick Reference

| Category | BasePage Methods | CommonUtils Methods |
|----------|-----------------|---------------------|
| **Click** | click, doubleClick, rightClick | clickWithRetry, hoverAndClick, clickAtPosition, clickIfVisible |
| **Type** | type, typeSlowly, pressKey | typeWithWait, typeRealistic, typeIfVisible |
| **Scroll** | scrollToElement, scrollToTop, scrollToBottom | scrollToElementSmooth, scrollByPercentage, scrollAndHighlight, scrollToCoordinates |
| **Highlight** | highlightElement | highlightElement (with custom colors) |
| **Wait** | waitForElement, waitForText, waitForTimeout | waitForElementStable, waitForNetworkIdle, waitForAnimations |
| **Verify** | verifyElementVisible, verifyText, verifyElementCount | isInViewport |
| **Get** | getText, getValue, getAttribute, getElementCount | getAllTexts, getStyle, getCurrentUrl, getPageTitle |
| **Screenshots** | takeScreenshot, takeElementScreenshot | takeTimestampedScreenshot |
| **Cookies** | - | setCookie, getCookie, clearCookies |

---

## 🚀 Quick Start Examples

Check out these test files for complete examples:
- `tests/ui/login.spec.ts` - Basic usage with LoginPage
- `tests/ui/demo.spec.ts` - All utilities demonstrated

Run examples:
```powershell
npm run test:ui:dev
```
