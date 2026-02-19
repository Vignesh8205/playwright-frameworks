import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ParfumPage } from '../pages/ParfumPage';
import highlightsData from '../test-data/highlightsFilters.json';
import filterCategories from '../test-data/filterCategories.json';

test.describe('Douglas Parfum Data-Driven Filter Tests - Client Side', () => {
    let homePage: HomePage;
    let parfumPage: ParfumPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        parfumPage = new ParfumPage(page);
    });

    filterCategories.forEach(async (data) => {
        test(`Data-Driven: List products matching criteria (${data})`, async () => {
            // 1. Navigate to Parfum
            await homePage.navigate();
            await homePage.navigateToParfum();
            await parfumPage.clickFilterAndSelectFirst(data);


            // Extract all visible products after filter
            const allProducts = await parfumPage.getAllProductDetails();
            console.log(`Total products found: ${allProducts.length}\n`);

            console.log(`\nTotal products scanned: ${allProducts.length}\n`);

            // 3. Filter and Print based on highlights data
            for (const highlight of highlightsData) {
                console.log(`=======================================================`);
                console.log(`Filtering by: ${highlight.filterValue}`);

                // Filter products that have the badge (Sale, NEU, Limitiert)
                const matches = allProducts.filter(p =>
                    p.badges.some(badge => badge.includes(highlight.filterValue)) ||
                    p.fullText.includes(highlight.filterValue)
                );

                if (matches.length === 0) {
                    console.log('No products found matching this criteria in the current view.');
                } else {
                    console.log(`Found ${matches.length} matches:`);
                    matches.forEach((p, index) => {
                        const badgesStr = p.badges.length > 0 ? `[${p.badges.join(', ')}]` : '';
                        console.log(`${index + 1}. [${p.brand}] ${p.name} - ${p.category} (${p.gender}) ${badgesStr}`);
                    });
                }
                console.log('\n');
            }

            // Print highlights data
            console.log('--- Highlights Data ---');
            highlightsData.forEach((highlight) => {
                console.log(`${highlight.filterValue}`);
            });
            console.log('\n');

        });
    })

});
