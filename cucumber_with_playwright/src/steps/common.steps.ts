import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { BasePage } from '../pages/BasePage';
import { TestDataManager } from '../utils/TestDataManager';

let basePage:BasePage

When('I navigate to the {string} Page', async function(this: CustomWorld ,page:string){
      basePage= new BasePage(this.page)
      const resolvedPage = TestDataManager.resolveValue(this.getTestData(), page);
      await basePage.navigateToPage(resolvedPage);
})

Then('I should see the page {string}', async function(this:CustomWorld ,title:string) {
  const resolvedTitle = TestDataManager.resolveValue(this.getTestData(), title);
  await basePage.verfiyTitle(resolvedTitle)
})

Given('I load test data from {string}', async function (this: CustomWorld, filePath: string) {
    const data = TestDataManager.loadData(filePath);
    this.setTestData(data);
    this.log(`Test data loaded from: ${filePath}`);
});

When('user clicks on {string}', async function (this: CustomWorld,buttonName) {
  if (basePage == undefined) {
      basePage= new BasePage(this.page)
  }
  await basePage.clickButtonByRole(buttonName)
});