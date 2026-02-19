import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class FooterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Scroll to the footer section
   */
  async scrollToFooter(): Promise<void> {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get all footer navigation links
   */
  async getFooterLinks(): Promise<string[]> {
    const footerLinks = await this.page
      .locator('footer ul li a')
      .filter({ hasText: /Notices|Terms & Conditions|Privacy Policy|Contact Us/ })
      .allTextContents();
    return footerLinks;
  }

  /**
   * Click on a specific footer link by name
   */
  async clickFooterLink(linkName: string): Promise<void> {
    await this.page.locator('footer').getByRole('link', { name: linkName }).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Get page heading (h1 or h2)
   */
  async getPageHeading(): Promise<string | null> {
    const heading = await this.page.locator('h1, h2').first().textContent();
    return heading;
  }

  /**
   * Navigate back to home page
   */
  async goToHomePage(): Promise<void> {
    await this.page.goto('https://droptaxie.in/');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify if footer link is visible
   */
  async isFooterLinkVisible(linkName: string): Promise<boolean> {
    const link = this.page.locator('footer').getByRole('link', { name: linkName });
    return await link.isVisible();
  }

  /**
   * Get all footer link details (name and href)
   */
  async getFooterLinkDetails(): Promise<Array<{ name: string; href: string }>> {
    const links = await this.page
      .locator('footer ul li a')
      .filter({ hasText: /Notices|Terms & Conditions|Privacy Policy|Contact Us/ })
      .evaluateAll((elements) =>
        elements.map((el) => ({
          name: el.textContent?.trim() || '',
          href: el.getAttribute('href') || '',
        }))
      );
    return links;
  }

  /**
   * Validate footer link navigation
   */
  async validateFooterLinkNavigation(
    linkName: string,
    expectedUrl: string,
    expectedHeading: string
  ): Promise<{ success: boolean; actualUrl: string; actualHeading: string | null }> {
    await this.clickFooterLink(linkName);
    
    const actualUrl = await this.getCurrentUrl();
    const actualHeading = await this.getPageHeading();
    
    const success = actualUrl.includes(expectedUrl) && actualHeading === expectedHeading;
    
    return {
      success,
      actualUrl,
      actualHeading,
    };
  }
}
