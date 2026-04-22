import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashBoardPage';
import { BasePage } from '../pages/BasePage';
import { ConfigReader } from '../utils/ConfigReader';

let dashboardPage:DashboardPage

//When('I navigate to the dashboard Page', async function(this: CustomWorld){..
      //dashboardPage= new DashboardPage(this.page)
     // await dashboardPage.navigateToDashboardPage()
//});

//Then('I should see the page Dashboard', async function(this:CustomWorld ,title:string) {
  //await dashboardPage.verfiyTitle()
//})