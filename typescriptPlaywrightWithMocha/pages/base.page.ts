import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  constructor(public page: Page) { }
  private readonly baseUrl: string = "http://example.com"; // Replace with your base URL
  public apiurl: string = "http://api.example.com"; // Replace with your API URL
  // Navigation
  async navigateTo(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async goBack() {
    await this.page.goBack();
  }

   baseUrls(){
    return this.baseUrl;
  }

  async goForward() {
    await this.page.goForward();
  }

  async reload() {
    await this.page.reload();
  }

  // Click actions
  async click(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.click();
  }

  async doubleClick(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.dblclick();
  }

  async rightClick(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.click({ button: "right" });
  }

  async clickWithModifier(locator: Locator | string, modifier: "Alt" | "Control" | "Meta" | "Shift") {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.click({ modifiers: [modifier] });
  }

  // Type/Input actions
  async type(locator: Locator | string, text: string, options?: { delay?: number; clear?: boolean }) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    if (options?.clear) {
      await element.clear();
    }
    await element.fill(text);
  }

  async typeSlowly(locator: Locator | string, text: string, delay: number = 100) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    await element.pressSequentially(text, { delay });
  }

  async pressKey(locator: Locator | string, key: string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.press(key);
  }

  async clearField(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.clear();
  }

  // Get text/attributes
  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible" });
    return await element.innerText();
  }

  async getValue(locator: Locator | string): Promise<string> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.inputValue();
  }

  async getAttribute(locator: Locator | string, attribute: string): Promise<string | null> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.getAttribute(attribute);
  }

  // Scroll actions
  async scrollToElement(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.scrollIntoViewIfNeeded();
  }

  async scrollToTop() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async scrollByPixels(x: number, y: number) {
    await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), { x, y });
  }

  // Highlight element (for debugging/demonstration)
  async highlightElement(locator: Locator | string, duration: number = 2000) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.evaluate((el, duration) => {
      const originalOutline = (el as HTMLElement).style.outline;
      const originalBackgroundColor = (el as HTMLElement).style.backgroundColor;
      (el as HTMLElement).style.outline = "3px solid red";
      (el as HTMLElement).style.backgroundColor = "yellow";
      setTimeout(() => {
        (el as HTMLElement).style.outline = originalOutline;
        (el as HTMLElement).style.backgroundColor = originalBackgroundColor;
      }, duration);
    }, duration);
    await this.page.waitForTimeout(duration);
  }

  // Wait actions
  async waitForElement(locator: Locator | string, state: "visible" | "hidden" | "attached" | "detached" = "visible", timeout: number = 30000) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state, timeout });
  }

  async waitForText(locator: Locator | string, text: string | RegExp, timeout: number = 30000) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.waitFor({ state: "visible", timeout });
    await expect(element).toContainText(text, { timeout });
  }

  async waitForUrl(url: string | RegExp, timeout: number = 30000) {
    await this.page.waitForURL(url, { timeout });
  }

  async waitForLoadState(state: "load" | "domcontentloaded" | "networkidle" = "load") {
    await this.page.waitForLoadState(state);
  }

  async waitForTimeout(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }

  // Dropdown/Select actions
  async selectDropdown(locator: Locator | string, option: string | string[]) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.selectOption(option);
  }

  // Checkbox/Radio actions
  async check(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.check();
  }



  async uncheck(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.uncheck();
    // await this.page.mouse.
     
  }

  async isChecked(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.isChecked();
  }

  // Hover action
  async hover(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.hover();
  }

  // Drag and drop
  async dragAndDrop(source: Locator | string, target: Locator | string) {
    const sourceElement = typeof source === "string" ? this.page.locator(source) : source;
    const targetElement = typeof target === "string" ? this.page.locator(target) : target;
    await sourceElement.dragTo(targetElement);
  }

  // File upload
  async uploadFile(locator: Locator | string, filePath: string | string[]) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.setInputFiles(filePath);
  }

  // Assertions
  async verifyElementVisible(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toBeVisible();
  }

  async verifyDowloading(locator: Locator, filePath: string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;

    const [download] = await Promise.all([
      this.page.waitForEvent('download')
      , element.click()
    ])

    download.saveAs(filePath)

    const isComplete = await download.failure();
    expect(isComplete).toBeNull()

  }

  async verifyElementHidden(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toBeHidden();
  }

  async verifyElementEnabled(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toBeEnabled();
  }

  async verifyElementDisabled(locator: Locator | string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toBeDisabled();
  }

  async verifyText(locator: Locator | string, expectedText: string | RegExp) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toContainText(expectedText);
  }

  async verifyExactText(locator: Locator | string, expectedText: string | RegExp) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toHaveText(expectedText);
  }

  async verifyElementCount(locator: Locator | string, count: number) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await expect(element).toHaveCount(count);
  }

  // Get element count
  async getElementCount(locator: Locator | string): Promise<number> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.count();
  }

  // Check if element exists
  async isElementVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  async isElementEnabled(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    return await element.isEnabled();
  }

  // Screenshot
  async takeScreenshot(fileName?: string) {
    await this.page.screenshot({ path: fileName, fullPage: true });
  }

  async takeElementScreenshot(locator: Locator | string, fileName?: string) {
    const element = typeof locator === "string" ? this.page.locator(locator) : locator;
    await element.screenshot({ path: fileName });
  }
}
