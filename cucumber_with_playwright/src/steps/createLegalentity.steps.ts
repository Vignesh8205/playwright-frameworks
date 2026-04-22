import { When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { CreateLegalEntitiesPage } from '../pages/CreateLegalEntityPage';
import { TestDataManager } from '../utils/TestDataManager';
import { DataUtils } from '../utils/DataUtils';

let createleaglentities: CreateLegalEntitiesPage;
setDefaultTimeout(120 * 1000);

Then('user should see {string} form title', { timeout: 90000 }, async function (this: CustomWorld, title: string) {
    createleaglentities = new CreateLegalEntitiesPage(this.page);
    await createleaglentities.verfiylegalEntitiespagetitle(title);
});

When('user enters entity name {string}', async function (this: CustomWorld, entityName: string) {
    const resolvedEntityname = TestDataManager.resolveValue(this.getTestData(), entityName);
    await createleaglentities.entityName(resolvedEntityname);
    this.log(`Entered entity name: ${resolvedEntityname}`);
});

When('user fills entity selection details', async function (this: CustomWorld, dataTable) {
    const rawData = dataTable.hashes()[0];
    const resolvedData = TestDataManager.resolveDataTable(this.getTestData(), rawData);
    
    if (resolvedData.address) await createleaglentities.fillAddress(resolvedData.address);
    if (resolvedData.marketType) await createleaglentities.selectMarket(resolvedData.marketType);
    if (resolvedData.type && resolvedData.representative) {
        await createleaglentities.selectTypeAndRepresentative(resolvedData.type, resolvedData.representative);
    }
});

When(/^user fills company details.*$/, async function (this: CustomWorld, dataTable) {
    const rawData = dataTable.hashes()[0];
    const finalData: any = {};

    for (const [key, value] of Object.entries(rawData)) {
        if (value === 'RANDOM') {
            // Generate random data based on the key
            switch (key) {
                case 'vatNumber': finalData[key] = DataUtils.generateVATNumber(); break;
                case 'frnNumber': finalData[key] = DataUtils.generateFRNNumber(); break;
                case 'companyNumber': finalData[key] = DataUtils.generateCompanyNumber(); break;
                case 'telephone': finalData[key] = DataUtils.generateTelephone(); break;
                case 'website': finalData[key] = DataUtils.generateWebsite(); break;
                default: finalData[key] = DataUtils.generateRandomString(8);
            }
        } else if (TestDataManager.isDataPath(value)) {
            finalData[key] = TestDataManager.resolveValue(this.getTestData(), value as string);
        } else {
            finalData[key] = value;
        }
    }

    await createleaglentities.fillCompanyDetails(finalData);
    this.log(`Filled company details: ${JSON.stringify(finalData)}`);
});
