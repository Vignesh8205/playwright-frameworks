import { expect, Locator } from '@playwright/test';

/**
 * Custom assertions to enhance readability and reuse generic checks.
 */
export class CustomAssertions {

    /**
     * Validates that a list of elements is not empty.
     * @param locator The locator pointing to the list of elements.
     * @param timeout Optional timeout.
     */
    static async assertListIsNotEmpty(locator: Locator, timeout: number = 5000) {
        await locator.first().waitFor({ state: 'visible', timeout });
        const count = await locator.count();
        expect(count, 'Expected list to have at least one item').toBeGreaterThan(0);
    }

    /**
     * Validates that text content contains specific substring (case-insensitive default).
     */
    static async assertTextContains(actualText: string, expectedText: string) {
        expect(actualText.toLowerCase()).toContain(expectedText.toLowerCase());
    }

    /**
     * Validates that url contains specific path/param.
     */
    static async assertUrlContains(page: any, text: string) {
        await expect(page).toHaveURL(new RegExp(text));
    }
}
