import { test } from "src/fixtures/pom-fixtures";
import data from '../../testData/data.json';
import { TestData } from "src/utils/test-data";

test.describe('Dashboard Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await loginPage.login(TestData.user.username, TestData.user.password);
        await loginPage.isLoggedIn();
    });


    test.only("Verify Dashboard", async ({ dashboardPage }) => {
        await dashboardPage.verifyDashboard(data.dasboard.title);
    })

});