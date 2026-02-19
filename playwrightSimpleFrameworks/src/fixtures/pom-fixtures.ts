import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PIMPage } from '../pages/PIMPage';
import { APIHelpers } from '../utils/APIHelpers';
import { TestData } from '../utils/test-data';
import { DashboardPage } from 'src/pages/Dashboard';


// Declare the types of your fixtures
type OrangeHRMFixtures = {
    loginPage: LoginPage;
    pimPage: PIMPage;
    apiHelpers: APIHelpers;
    dashboardPage: DashboardPage;
};

// Extend the base test to include your fixtures
export const test = base.extend<OrangeHRMFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    pimPage: async ({ page }, use) => {
        await use(new PIMPage(page));
    },
    apiHelpers: async ({ page }, use) => {
        await use(new APIHelpers(page.request, process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com'));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
});

export { expect } from '@playwright/test';
