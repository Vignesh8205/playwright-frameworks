import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ParfumPage } from '../pages/ParfumPage';
import filtersData from '../test-data/parfumFilters.json';

test.describe('Douglas Parfum Filter Scenarios', () => {
    let homePage: HomePage;
    let parfumPage: ParfumPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        parfumPage = new ParfumPage(page);
        await homePage.navigate();
    });

    test('SCENARIO 1: Filter products using Produktart', async () => {
        const data = filtersData.find(d => d.scenario === 'Parfum Filter');
        if (!data) throw new Error('Test data not found for Scenario 1');

        await test.step('Navigate to Parfum category', async () => {
            await homePage.navigateToParfum();
        });

        await test.step('Apply Filter: Produktart -> Parfum', async () => {
            await parfumPage.applyFilter(data.filterType, data.filterValue!);
        });

        await test.step('Validate filtered products are displayed', async () => {
            const count = await parfumPage.getProductCount();
            expect(count).toBeGreaterThan(0);
            console.log(`Found ${count} products after filtering.`);

            // Validate specific category text as requested
            await parfumPage.validateFirstProductCategory(data.filterValue!);
        });
    });

    test('SCENARIO 2: Remove filter and validate all products', async () => {
        const data = filtersData.find(d => d.scenario === 'Parfum Filter');
        if (!data) throw new Error('Test data not found for Scenario 2');

        await test.step('Setup: Apply a filter first', async () => {
            await homePage.navigateToParfum();
            await parfumPage.applyFilter(data.filterType, data.filterValue!);
            const filteredCount = await parfumPage.getProductCount();
            expect(filteredCount).toBeGreaterThan(0);
        });

        await test.step('Remove applied filters', async () => {
            await parfumPage.clearFilters();
        });

        await test.step('Validate filters are cleared and products list refreshes', async () => {
            const count = await parfumPage.getProductCount();
            expect(count).toBeGreaterThan(0);
            console.log('Filters cleared, product list refreshed.');
        });
    });

    test('SCENARIO 3: Brand-based filtering (Calvin Klein)', async () => {
        const data = filtersData.find(d => d.scenario === 'Brand Filter');
        if (!data) throw new Error('Test data not found for Scenario 3');

        await test.step('Navigate to Subcategory: Damen Duft -> Deodorants', async () => {
            await homePage.navigateToParfum();

            // Using POM methods which include robust reload handling
            await parfumPage.selectCategory(data.subCategory!);
            await parfumPage.selectProductType(data.productType!);
        });

        await test.step(`Apply Brand Filter: ${data.brandValue}`, async () => {
            await parfumPage.applyFilter(data.filterType, data.brandValue!);
        });

        await test.step('Validate only Calvin Klein products are displayed', async () => {
            const count = await parfumPage.getProductCount();
            expect(count).toBeGreaterThan(0);

            const brands = await parfumPage.getVisibleProductBrands();
            // Check first few items to ensure reliability
            for (const brand of brands.slice(0, 5)) {
                expect(brand.toUpperCase()).toContain(data.brandValue!.toUpperCase());
            }
        });
    });
});
