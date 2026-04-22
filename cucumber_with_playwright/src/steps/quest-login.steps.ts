import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/QuestLoginPage';
import { ConfigReader } from '../utils/ConfigReader';
import { TestDataManager } from '../utils/TestDataManager';

/**
 * Step Definitions for APEX UI Login Demo
 */

let loginPage: LoginPage;
setDefaultTimeout(120* 1000);

/**
 * Given Steps
 */
Given('I navigate to the APEX UI application', {timeout:90000},async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  const baseUrl = ConfigReader.getBaseUrl();
  await loginPage.navigateToLoginPage(baseUrl);
  this.log(`Navigated to APEX UI: ${baseUrl}`);
});

/**
 * When Steps
 */
When('I enter training username {string}', async function (this: CustomWorld, username: string) {
  const resolvedUsername = TestDataManager.resolveValue(this.getTestData(), username);
  await loginPage.enterUsername(resolvedUsername);
  this.log(`Entered username: ${resolvedUsername}`);
});

When('I enter training password {string}', async function (this: CustomWorld, password: string) {
  const resolvedPassword = TestDataManager.resolveValue(this.getTestData(), password);
  await loginPage.enterPassword(resolvedPassword);
  this.log('Entered password');
});

When('I click the login button', async function (this: CustomWorld) {
  await loginPage.clickLoginButton();
  this.log('Clicked login button');
});

When('I login with the configured training credentials', async function (this: CustomWorld) {
  const credentials = ConfigReader.getCredentials();
  await loginPage.login(credentials.username, credentials.password);
  this.log(`Logged in with credentials: ${credentials.username}`);
});

/**
 * Then Steps
 */
Then('I should be logged in successfully', async function (this: CustomWorld) {
  // Wait for page to load after login
  await this.page.waitForLoadState('networkidle');
  
  // Verify we're not on the login page anymore
  const currentUrl = this.page.url();
  expect(currentUrl).not.toContain('/login');
  
  this.log(`Login successful - Current URL: ${currentUrl}`);
});

Then('I should see the APEX UI dashboard', async function (this: CustomWorld) {
  // Wait for dashboard to load
  await this.page.waitForLoadState('domcontentloaded');
  
  // Verify page title or dashboard element
  const title = await this.page.title();
  this.log(`Dashboard loaded - Page title: ${title}`);
  
  // Take a screenshot for verification
  await this.page.screenshot({ path: 'reports/screenshots/apex-dashboard.png' });
  this.log('Dashboard screenshot captured');
});

Then('I should see the login page displayed', async function (this: CustomWorld) {
  await loginPage.verifyLoginPageDisplayed();
  this.log('Login page is displayed');
});






