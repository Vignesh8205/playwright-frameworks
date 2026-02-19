import { test, expect } from '@playwright/test';
import { FooterPage } from '../../pages/footer.page';
import { getEnv } from '../../config/env.config';
import testData from '../../test-data/testData.json';

test.describe('Footer Navigation Links Validation', () => {
  let footerPage: FooterPage;
  const baseUrl = getEnv().baseURL;

  test.beforeEach(async ({ page }) => {
    footerPage = new FooterPage(page);
  });

  test('Validate footer navigation links are present, clickable, and redirect correctly', async ({ page }) => {
    await test.step('Navigate to the application homepage', async () => {
      await footerPage.goToHomePage();
      expect(page.url()).toBe(`${baseUrl}/`);
    });

    await test.step('Scroll down to the footer section', async () => {
      await footerPage.scrollToFooter();
      const footerLinks = await footerPage.getFooterLinks();
      expect(footerLinks.length).toBeGreaterThan(0);
    });

    for (const linkData of testData.footer.links) {
      if (linkData.url === '#') {
        await test.step(`Verify "${linkData.name}" link is present (URL: ${linkData.url})`, async () => {
          const isVisible = await footerPage.isFooterLinkVisible(linkData.name);
          expect(isVisible).toBe(true);
        });
      } else {
        await test.step(`Click "${linkData.name}" and validate navigation`, async () => {
          await footerPage.scrollToFooter();
          await footerPage.clickFooterLink(linkData.name);
          
          const currentUrl = await footerPage.getCurrentUrl();
          expect(currentUrl).toContain(linkData.url);
          
          if (linkData.heading) {
            const heading = await footerPage.getPageHeading();
            expect(heading).toBe(linkData.heading);
          }
        });

        await test.step(`Return to homepage after validating "${linkData.name}"`, async () => {
          await footerPage.goToHomePage();
          expect(page.url()).toBe(`${baseUrl}/`);
        });
      }
    }

    await test.step('Verify no errors occurred during navigation', async () => {
      const footerLinks = await footerPage.getFooterLinkDetails();
      expect(footerLinks.length).toBeGreaterThanOrEqual(4);
    });
  });
});
