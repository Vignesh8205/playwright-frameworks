import { BasePage } from "./BasePage";
import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage extends BasePage {

    dashboardTitle: Locator

    constructor(page: Page) {
        super(page);
        this.dashboardTitle = page.locator('//h6')
    }

    async verifyDashboard(title: string) {
        //    log
        await expect(this.dashboardTitle).toHaveText(title);
    }


}