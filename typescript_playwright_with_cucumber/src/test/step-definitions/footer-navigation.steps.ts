import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { FooterPage } from '../../../pages/footer.page';
import { ICustomWorld } from '../support/custom-world';
import testData from '../../../test-data/testData.json';

let footerPage: FooterPage;

Given('I am on the Droptaxie homepage', async function (this: ICustomWorld) {
  footerPage = new FooterPage(this.page!);
  await footerPage.goToHomePage();
  expect(this.page!.url()).toContain('droptaxie.in');
});

When('I scroll down to the footer section', async function (this: ICustomWorld) {
  await footerPage.scrollToFooter();
});

Then('I should see footer links including {string}, {string}, {string}, and {string}', async function (
  this: ICustomWorld,
  link1: string,
  link2: string,
  link3: string,
  link4: string
) {
  const footerLinks = await footerPage.getFooterLinks();
  expect(footerLinks.length).toBeGreaterThan(0);
  
  const linkTexts = footerLinks.join(',');
  expect(linkTexts).toContain(link1);
  expect(linkTexts).toContain(link2);
  expect(linkTexts).toContain(link3);
  expect(linkTexts).toContain(link4);
});

Then('all footer links should be visible', async function (this: ICustomWorld) {
  const footerLinkDetails = await footerPage.getFooterLinkDetails();
  expect(footerLinkDetails.length).toBeGreaterThanOrEqual(4);
  
  for (const link of testData.footer.links) {
    const isVisible = await footerPage.isFooterLinkVisible(link.name);
    expect(isVisible).toBe(true);
  }
});

When('I click on the {string} footer link', async function (this: ICustomWorld, linkName: string) {
  await footerPage.scrollToFooter();
  await footerPage.clickFooterLink(linkName);
});

Then('I should be redirected to {string}', async function (this: ICustomWorld, expectedUrl: string) {
  const currentUrl = await footerPage.getCurrentUrl();
  expect(currentUrl).toContain(expectedUrl);
});

Then('the page heading should be {string}', async function (this: ICustomWorld, expectedHeading: string) {
  const heading = await footerPage.getPageHeading();
  expect(heading).toBe(expectedHeading);
});

When('I navigate back to homepage', async function (this: ICustomWorld) {
  await footerPage.goToHomePage();
});
