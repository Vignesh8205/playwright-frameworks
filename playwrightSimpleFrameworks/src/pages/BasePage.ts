import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    protected page: Page;
    public name: string = "karan";

    constructor(page: Page) {
    page = page;
    }

    async wait(ms: number) {
        await this.page.waitForTimeout(ms);
    }

    async click(locator: Locator) {
        await locator.click();
    }

    async fill(locator: Locator, text: string) {
        await locator.fill(text);

    }


}
