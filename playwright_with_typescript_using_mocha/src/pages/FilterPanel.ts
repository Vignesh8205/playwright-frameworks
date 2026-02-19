import { Page, Locator } from '@playwright/test';
import { CookieHandler } from '../utils/cookieHandler';

export class FilterPanel {
    readonly page: Page;
    readonly cookieHandler: CookieHandler;

    constructor(page: Page) {
        this.page = page;
        this.cookieHandler = new CookieHandler(page);
    }

    /**
     * Opens a specific filter category (e.g., "Produktart", "Marke")
     */
    async openFilterCategory(categoryName: string) {
        // Precise mapping based on user provided data-testids
        const nameLower = categoryName.toLowerCase();
        let selector = '';

        if (nameLower === 'produktart') {
            selector = '[data-testid="menu-button-classificationClassName"]';
        } else if (nameLower === 'marke') {
            selector = '[data-testid="menu-button-brand"]';
        } else if (nameLower === 'für wen' || nameLower === 'fur wen') {
            selector = '[data-testid="menu-button-gender"]';
        } else if (nameLower === 'duftnote') {
            selector = '[data-testid="menu-button-fragranceNew"]';
        } else if (nameLower === 'verantwortung') {
            selector = '[data-testid="menu-button-responsibility"]';
        } else if (nameLower === 'zusatzstoffe') {
            selector = '[data-testid="menu-button-additives"]';
        } else if (nameLower === 'aktionen' || nameLower === 'highlights' || nameLower === 'sale' || nameLower === 'neu' || nameLower === 'limitiert') {
            // "Sale", "Neu", "Limitiert" are usually under "Highlights" (Aktionen) 
            // or sometimes top level. The snippet shows "Aktionen" is "menu-button-flags"
            selector = '[data-testid="menu-button-flags"]';
        } else if (nameLower === 'preis') {
            selector = '[data-testid="menu-button-priceValue"]';
        } else {
            // Fallback for generic text if not in the map
            selector = `button:has-text("${categoryName}")`;
        }

        console.log(`Opening filter category: ${categoryName} using selector: ${selector}`);
        const filterHeader = this.page.locator(selector).first();

        try {
            await filterHeader.first().scrollIntoViewIfNeeded();
            // Wait for it to be visible to avoid clicks on hidden elements
            await this.page.reload({ waitUntil: 'domcontentloaded' })
            await filterHeader.first().waitFor({ state: 'visible', timeout: 5000 });
            await filterHeader.first().click();
        } catch (error) {
            console.log(`Failed to open category "${categoryName}". Reloading and retrying...`);
            await this.page.reload({ waitUntil: 'load' });
            await this.cookieHandler.acceptCookies(2000);

            // Retry once after reload
            try {
                await this.page.reload({ waitUntil: 'load' });
                await filterHeader.first().waitFor({ state: 'visible', timeout: 5000 });
                await filterHeader.first().click();
            } catch (retryError) {
                console.log(`Retry failed for "${categoryName}":`, retryError);
                throw retryError; // Fail if second attempt fails
            }
        }
    }

    /**
     * Selects a value within an open filter category
     */
    async selectFilterValue(value: string) {
        try {
            // Try looking inside a dialog first
            const dialog = this.page.getByRole('dialog', { name: 'Filter' });

            // Wait briefly to see if dialog appears
            try {
                // Short wait because we handle failure below
                await dialog.waitFor({ state: 'visible', timeout: 3000 });
            } catch (e) { }

            if (await dialog.isVisible()) {
                await dialog.getByLabel(value, { exact: true }).check();
                // Close dialog if needed 
                const closeBtn = this.page.getByTestId('close-button');
                if (await closeBtn.isVisible()) {
                    await closeBtn.click();
                }
            } else {
                // Fallback to standard dropdown behavior in case it wasn't a dialog
                const option = this.page.locator(`.facet-option__text:has-text("${value}")`).or(
                    this.page.getByRole('checkbox', { name: value })
                ).or(this.page.getByText(value, { exact: true }));

                await option.first().scrollIntoViewIfNeeded();
                await option.first().click();
            }
        } catch (error) {
            console.log(`Error in selectFilterValue for "${value}". refreshing page to next...`);
            // "refresh it go to next" - user requested behavior
            await this.page.reload({ waitUntil: 'domcontentloaded' });
            // await this.cookieHandler.acceptCookies(2000);
        }
    }

    /**
     * Clears all filters
     */
    async clearAllFilters() {
        const clearButton = this.page.getByText('Alle Filter löschen').or(
            this.page.getByRole('button', { name: 'Filter löschen' })
        );

        if (await clearButton.isVisible()) {
            await clearButton.click();
        }
    }

    /**
     * Closes the filter panel or clicks apply if necessary.
     * Note: Many modern sites differ in applying filters (auto vs manual).
     * This method waits for the product list to update/loading spinner to disappear.
     */
    async applyFilter() {
        // Sometimes there is a "Show Results" button specifically on mobile or overlay
        const applyButton = this.page.getByRole('button', { name: /anzeigen|Apply/i });
        if (await applyButton.isVisible()) {
            await applyButton.click();
        }

        // Wait for loading overlay to disappear if it exists
        const loader = this.page.locator('.loading-spinner');
        if (await loader.isVisible()) {
            await loader.waitFor({ state: 'hidden' });
        }
    }
}
