import { Page, Locator, expect } from '@playwright/test';
import { FilterPanel } from './FilterPanel';
import { CookieHandler } from '../utils/cookieHandler';

export class ParfumPage {
    readonly page: Page;
    readonly filterPanel: FilterPanel;
    readonly cookieHandler: CookieHandler;

    // Locators for product grid
    readonly productTile: Locator;
    readonly productBrand: Locator;
    readonly productTitle: Locator;
    readonly productCategory: Locator;
    readonly breadcrumb: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filterPanel = new FilterPanel(page);
        this.cookieHandler = new CookieHandler(page);

        // Specific locators based on user provided HTML snippet
        this.productTile = page.locator('[data-testid="product-tile"]');
        this.productBrand = page.locator('.text.top-brand');
        this.productTitle = page.locator('.text.name');
        this.productCategory = page.locator('.text.category');
        this.breadcrumb = page.locator('.breadcrumb');
    }

    async selectCategory(categoryName: string) {
        // Handling specific subcategory navigation like "Damendüfte" -> "Deodorants"
        // The recording showed: page.getByLabel('Damendüfte').getByRole('link', { name: 'Deodorants' })
        // We generalize this:
        await this.page.getByLabel(categoryName).click();

        await this.page.waitForLoadState('load');
        console.log('Reloading after category selection...');
        await this.page.reload({ waitUntil: 'load' });
        await this.cookieHandler.acceptCookies(2000);
    }

    async selectProductType(typeName: string) {
        // Often inside the menu opened by selectCategory or directly accessible
        // Based on recording: page.getByLabel('Damendüfte').getByRole('link', { name: 'Deodorants' })
        // The previous step clicks the Category Label (opening the menu or page), this clicks the link inside
        await this.page.getByRole('link', { name: typeName }).first().click();

        await this.page.waitForLoadState('load');
        console.log('Reloading after product type selection...');
        await this.page.reload({ waitUntil: 'load' });
        await this.cookieHandler.acceptCookies(2000);
    }

    async applyFilter(type: string, value: string) {
        await this.filterPanel.openFilterCategory(type);
        await this.filterPanel.selectFilterValue(value);
        await this.filterPanel.applyFilter();

        // Wait for list to refresh or reload if needed
        console.log('Reloading after applying filter...');
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        await this.cookieHandler.acceptCookies(2000);
    }

    async clickFilterAndSelectFirst(categoryName: string) {
        console.log(`Clicking filter category: ${categoryName} and selecting first option...`);

        // Click the filter category button
        await this.page.getByText(categoryName).click();

        // Wait briefly for dialog/dropdown to appear
        await this.page.waitForTimeout(500);

        try {
            // Click the first checkbox option
            await this.page.locator('[role="checkbox"]').first().click();

            // Close the dialog if close button exists
            const closeButton = this.page.locator('[data-testid="close-button"]');
            if (await closeButton.isVisible()) {
                await closeButton.click();
            }
        } catch (error) {
            console.log('Failed to select first option or close dialog: ', error);
        }

        // Reload to ensure products are updated
        console.log('Reloading after filter selection...');
        await this.page.reload({ waitUntil: 'domcontentloaded' });

    }

    async clearFilters() {
        await this.filterPanel.clearAllFilters();
        await this.page.waitForLoadState('load');

        console.log('Reloading after clearing filters...');
        await this.page.reload({ waitUntil: 'load' });
        await this.cookieHandler.acceptCookies(2000);
    }

    async getProductCount(): Promise<number> {
        // Wait for any potential skeletons or loading states to disappear
        console.log(`Checking for products on: ${this.page.url()}`);
        try {
            await this.productTile.first().waitFor({ state: 'visible', timeout: 10000 });
        } catch (e) {
            console.log('Timeout waiting for first product tile. Page content might be empty or blocked.');
        }

        const count = await this.productTile.count();
        console.log(`Found ${count} product tiles.`);
        return count;
    }

    async getVisibleProductBrands(): Promise<string[]> {
        return await this.productBrand.allInnerTexts();
    }

    async validateFirstProductContainsText(text: string) {
        const firstTitle = await this.productTitle.first().innerText();
        const firstBrand = await this.productBrand.first().innerText();
        const combinedText = `${firstBrand} ${firstTitle}`.toLowerCase();

        if (!combinedText.includes(text.toLowerCase())) {
            throw new Error(`Product text "${combinedText}" does not contain expected "${text}"`);
        }
    }

    async validateFirstProductCategory(expectedCategory: string) {
        // Wait for product to be visible
        await this.productCategory.first().waitFor({ state: 'visible', timeout: 10000 });
        const actualCategory = await this.productCategory.first().innerText();

        if (actualCategory.trim().toLowerCase() !== expectedCategory.toLowerCase()) {
            throw new Error(`Product category "${actualCategory}" does not match expected "${expectedCategory}"`);
        }
    }
    async getAllProductDetails() {
        // Ensure tiles are loaded
        try {
            await this.productTile.first().waitFor({ state: 'visible', timeout: 5000 });
        } catch (e) { }

        const tiles = await this.productTile.all();
        const products: Array<{ brand: string; name: string; category: string; fullText: string; badges: string[] }> = [];

        console.log(`Extracting details for ${tiles.length} products...`);
        expect(tiles.length).toBeGreaterThan(0);

        // Use sequential extraction to avoid flakiness, or use evaluateAll for speed
        // Evaluation allows getting all texts in one go
        const productData = await this.productTile.evaluateAll(list => list.map(element => {
            const brand = element.querySelector('.text.top-brand')?.textContent?.trim() || 'N/A';
            const name = element.querySelector('.text.name')?.textContent?.trim() || 'N/A';
            const category = element.querySelector('.text.category')?.textContent?.trim() || 'N/A';
            const fullText = element.textContent || '';

            // Extract gender from image title, e.g. "Parfum für Weiblich ..."
            const imgDiv = element.querySelector('div[role="img"]');
            const title = imgDiv?.getAttribute('title') || '';
            let gender = 'N/A';
            if (title.includes('Weiblich')) gender = 'Weiblich';
            if (title.includes('Männlich')) gender = 'Männlich';
            if (title.includes('Unisex')) gender = 'Unisex';

            // Extract badges/eyecatchers (Sale, NEU, Limitiert, etc.)
            const badges: string[] = [];
            const eyecatcherElements = element.querySelectorAll('[data-testid^="product-eyecatcher-"]');
            eyecatcherElements.forEach(eyecatcher => {
                const badgeText = eyecatcher.textContent?.trim();
                if (badgeText) badges.push(badgeText);
            });

            return { brand, name, category, fullText, gender, badges };
        }));

        return productData;
    }
}
