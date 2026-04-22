import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CreateLegalEntitiesPage extends BasePage {
    
    private readonly createlegalEntityformtitle: Locator;
    private readonly entityNameinput: Locator;
    private readonly searchAddressInput: Locator;
    private readonly marketTypeButton: Locator;
    private readonly addTypeButton: Locator;
    private readonly productGroupButton: Locator;
    private readonly representativeTypeButton: Locator;

    // Company Details
    private readonly vatNumberInput: Locator;
    private readonly frnNumberInput: Locator;
    private readonly companyNumberInput: Locator;
    private readonly telephoneInput: Locator;
    private readonly websiteInput: Locator;
    private readonly saveAndCloseButton: Locator;

    constructor(page: Page) {
        super(page);
        this.createlegalEntityformtitle = this.page.locator('[ class="itc-form-basic-outer"] h3');
        this.entityNameinput = this.page.getByPlaceholder('Entity name');
        this.searchAddressInput = this.page.getByPlaceholder('Search address...');
        
        // Using accessible names identified during manual investigation
        this.marketTypeButton = this.page.getByRole('combobox', { name: 'Market Type' });
        this.addTypeButton = this.page.getByText('Add type');
        
        // These are identified by text since they are custom buttons
        this.productGroupButton = this.page.locator('button:has-text("Product Group")');
        this.representativeTypeButton = this.page.locator('button:has-text("Representative Type")');

        this.vatNumberInput = this.page.getByPlaceholder('VAT number');
        this.frnNumberInput = this.page.getByPlaceholder('FRN number');
        this.companyNumberInput = this.page.getByPlaceholder('Company number');
        this.telephoneInput = this.page.getByPlaceholder('Phone number');
        this.websiteInput = this.page.getByPlaceholder('Website url');
        
        // There are multiple "Save and close" buttons, target the one in the form footer/sidepanel
        this.saveAndCloseButton = this.page.getByRole('button', { name: 'Save and close' }).last();
    }

    async verfiylegalEntitiespagetitle(expectText: string) {
        await this.verifyText(this.createlegalEntityformtitle, expectText);
    }

    async entityName(entityname: string) {
        await this.fill(this.entityNameinput, entityname);
    }

    async selectMarket(market: string) {
        await this.selectCustomDropdown(this.marketTypeButton, market);
    }

    async selectTypeAndRepresentative(type: string, representative: string) {
        await this.click(this.addTypeButton);
        await this.selectCustomDropdown(this.productGroupButton, type);
        // Sometimes Representative Type takes a moment to become enabled after Product Group selection
        await this.page.waitForTimeout(500); 
        await this.selectCustomDropdown(this.representativeTypeButton, representative);
    }

    async fillAddress(address: string) {
        await this.fill(this.searchAddressInput, address);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000); 
    }

    async fillCompanyDetails(details: any) {
        if (details.vatNumber) await this.fill(this.vatNumberInput, details.vatNumber);
        if (details.frnNumber) await this.fill(this.frnNumberInput, details.frnNumber);
        if (details.companyNumber) await this.fill(this.companyNumberInput, details.companyNumber);
        if (details.telephone) await this.fill(this.telephoneInput, details.telephone);
        if (details.website) await this.fill(this.websiteInput, details.website);
    }

    async clickSaveAndClose() {
        await this.click(this.saveAndCloseButton);
    }

    /**
     * Helper for custom dropdowns (button trigger + div options)
     */
    private async selectCustomDropdown(trigger: Locator, optionText: string) {
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        const option = this.page.locator('div[role="option"]').getByText(optionText, { exact: true });
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
    }
}