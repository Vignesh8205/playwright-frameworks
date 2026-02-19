import { Page } from '@playwright/test';

export class CookieHandler {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Accepts all cookies if the consent banner is present.
     * Handles common selectors used by OneTrust or custom implementations.
     */
    async acceptCookies(timeout: number = 15000) {
        try {
            // Smart wait: wait for the element to be attached to the DOM first
            console.log(`Waiting for cookie banner (timeout: ${timeout}ms)...`);
            const selector = '[data-testid="uc-accept-all-button"]';
            const button = this.page.locator(selector).first();

            // Wait up to specified timeout for the banner to be attached/visible
            // This handles the "wait then handle" requirement without a hard sleep
            await button.waitFor({ state: 'visible', timeout: timeout });

            await button.click();

            // Wait for banner to disappear
            await button.waitFor({ state: 'hidden', timeout: 5000 });
            console.log('Cookie banner accepted.');

        } catch (e) {
            // console.log('Cookie banner interaction failed or not found.');
        }
    }
}
