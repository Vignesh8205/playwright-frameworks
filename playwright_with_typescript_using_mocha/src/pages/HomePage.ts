import { Page, Locator } from '@playwright/test';
import { CookieHandler } from '../utils/cookieHandler';

export class HomePage {
    readonly page: Page;
    readonly parfumLink: Locator;
    readonly cookieHandler: CookieHandler;

    constructor(page: Page) {
        this.page = page;
        this.cookieHandler = new CookieHandler(page);

        // Selectors
        // Using robust selectors from user recording
        this.parfumLink = page.getByTestId('header-component-item--navigation').getByRole('link', { name: 'Parfum' });
    }

    async navigate() {
        await this.page.goto('/');
        await this.cookieHandler.acceptCookies();
    }

    async navigateToParfum() {
        await this.parfumLink.first().click();
        // Waiting for 'load' instead of 'domcontentloaded' to ensure all heavy scripts/assets are processed
        await this.page.waitForLoadState('load');

        // Workaround for product loading issues: Reload the page
        console.log('Reloading page to ensure products load...');
        await this.page.reload({ waitUntil: 'domcontentloaded' });

        // Re-check cookies quickly (2s) just in case reload brought them back, but don't block for long
        await this.cookieHandler.acceptCookies(2000);
    }
}
