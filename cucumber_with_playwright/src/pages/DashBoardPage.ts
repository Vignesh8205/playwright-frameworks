import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage{

       private readonly selectors ={
             dashboardTitle:'[title="Dashboard"]'} ;

        private get dashboardTitle(): Locator {
        return this.page.locator(this.selectors.dashboardTitle);
    }
        constructor(page: Page) {
        super(page);
    }

}