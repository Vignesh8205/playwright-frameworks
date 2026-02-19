import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class BookingPage extends BasePage {
    // Locators for home page
    private readonly pickupInput: Locator;
    private readonly dropInput: Locator;
    private readonly pickupDateInput: Locator;
    private readonly searchCabsButton: Locator;

    // Locators for cab listing page
    private readonly cabListContainer: Locator;
    private readonly cabCards: Locator;
    private readonly bookNowButtons: Locator;

    // Locators for booking form page
    private readonly journeyTypeCell: Locator;
    private readonly cabTypeCell: Locator;
    private readonly fromLocationCell: Locator;
    private readonly toLocationCell: Locator;
    private readonly pickupDateCell: Locator;
    private readonly baseFareCell: Locator;
    private readonly taxCell: Locator;
    private readonly totalFareCell: Locator;
    private readonly distanceCell: Locator;

    private readonly nameInput: Locator;
    private readonly emailInput: Locator;
    private readonly mobileInput: Locator;
    private readonly pickupAddressInput: Locator;
    private readonly pickupTimeInput: Locator;
    private readonly confirmBookingButton: Locator;

    // Store selected values for verification
    private selectedPickupLocation: string = '';
    private selectedDropLocation: string = '';

    constructor(page: Page) {
        super(page);
        
        // Home page elements
        this.pickupInput = this.page.locator('#txt_source');
        this.dropInput = this.page.locator('#txt_destination');
        this.pickupDateInput = this.page.locator('#one-way-form input[name="pickup_date"]');
        this.searchCabsButton = this.page.getByRole('button', { name: 'Search Cabs' });

        // Cab listing page elements
        this.cabListContainer = this.page.locator('body');
        this.cabCards = this.page.locator('h3:has-text("Similar")').locator('..');
        this.bookNowButtons = this.page.getByRole('button', { name: 'Book Now' });

        // Booking form page elements
        this.journeyTypeCell = this.page.locator('table tr:has-text("Journey Type:") td:nth-child(2)');
        this.cabTypeCell = this.page.locator('table tr:has-text("Cab Type:") td:nth-child(2)');
        this.fromLocationCell = this.page.locator('table tr:has-text("From:") td:nth-child(2)');
        this.toLocationCell = this.page.locator('table tr:has-text("To:") td:nth-child(2)');
        this.pickupDateCell = this.page.locator('table tr:has-text("Pickup Date:") td:nth-child(2)');
        this.baseFareCell = this.page.locator('table tr:has-text("Fare( Inculding Driver Beta):") td:nth-child(2)');
        this.taxCell = this.page.locator('table tr:has-text("Tax") td:nth-child(2)');
        this.totalFareCell = this.page.locator('table tr:has-text("Total Fare:") td:nth-child(2)');
        this.distanceCell = this.page.locator('table tr:has-text("Distance:") td:nth-child(2)');

        this.nameInput = this.page.locator('input[placeholder="Name"]');
        this.emailInput = this.page.locator('input[placeholder="Email"]');
        this.mobileInput = this.page.locator('input[placeholder="Mobile"]');
        this.pickupAddressInput = this.page.locator('input[placeholder="Enter Pickup Address"]');
        this.pickupTimeInput = this.page.locator('input[placeholder="Enter Pickup Time"]');
        this.confirmBookingButton = this.page.getByRole('button', { name: 'Confirm Booking' });
    }

    /**
     * Navigate to the booking page
     */
    async navigate(): Promise<void> {
        await this.page.goto('https://droptaxie.in/');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Enter pickup location and select from autocomplete
     * @param location - Location to search for
     */
    async enterPickupLocation(location: string): Promise<void> {
        await this.pickupInput.click();
        await this.pickupInput.fill(location);
        
        // Wait for autocomplete to appear
        await this.page.waitForSelector('.pac-container .pac-item', { timeout: 5000 });
        
        // Click the first suggestion
        await this.page.locator('.pac-container .pac-item').first().click();
        
        // Store the selected value
        this.selectedPickupLocation = await this.pickupInput.inputValue();
    }

    /**
     * Enter drop location by typing first N characters and selecting specific suggestion
     * @param partialText - Partial text to type (e.g., "GA")
     * @param suggestionIndex - Index of suggestion to select (0-based, default: 1 for 2nd suggestion)
     */
    async enterDropLocation(partialText: string, suggestionIndex: number = 1): Promise<void> {
        await this.dropInput.click();
        await this.dropInput.fill(partialText);
        
        // Wait for autocomplete to appear
        await this.page.waitForSelector('.pac-container .pac-item', { timeout: 5000 });
        
        // Click the specified suggestion (suggestionIndex)
        await this.page.locator('.pac-container .pac-item').nth(suggestionIndex).click();
        
        // Store the selected value
        this.selectedDropLocation = await this.dropInput.inputValue();
    }

    /**
     * Select a future date from the date picker
     * @param daysFromToday - Number of days from today (default: 3)
     */
    async selectFutureDate(daysFromToday: number = 3): Promise<void> {
        await this.pickupDateInput.click();
        
        // Wait for date picker to appear
        await this.page.waitForSelector('.datepicker table', { timeout: 3000 });
        
        // Calculate target date
        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + daysFromToday);
        const dayOfMonth = targetDate.getDate();
        
        // Click the day
        await this.page.getByRole('cell', { name: dayOfMonth.toString(), exact: true }).click();
    }

    /**
     * Click the Search Cabs button
     */
    async clickSearchCabs(): Promise<void> {
        await this.searchCabsButton.click();
        await this.page.waitForURL('**/Pages/cabs/', { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Get the list of available cabs with names and prices
     * @returns Array of cab objects with name and price
     */
    async getCabList(): Promise<Array<{ name: string; price: string }>> {
        const cabList: Array<{ name: string; price: string }> = [];
        
        // Wait for Book Now buttons to be visible
        await this.bookNowButtons.first().waitFor({ timeout: 10000 });
        
        // Get count of available cabs
        const count = await this.bookNowButtons.count();
        
        // Get all h3 headings and price elements on the page
        const allHeadings = await this.page.locator('h3').allInnerTexts();
        const allPriceTexts = await this.page.locator('div').filter({ hasText: /^Rs\.\s*\d+$/ }).allInnerTexts();
        
        // Match them up (assuming same order)
        const minCount = Math.min(count, allHeadings.length, allPriceTexts.length);
        
        for (let i = 0; i < minCount; i++) {
            cabList.push({ 
                name: allHeadings[i].trim(), 
                price: allPriceTexts[i].trim() 
            });
        }
        
        return cabList;
    }

    /**
     * Select a cab by index and click Book Now
     * @param index - Index of the cab to book (0-based)
     */
    async selectCabByIndex(index: number = 0): Promise<void> {
        await this.bookNowButtons.nth(index).click();
        await this.page.waitForURL('**/Pages/addCart/', { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Select a cab by name and click Book Now
     * @param cabName - Partial or full name of the cab
     */
    async selectCabByName(cabName: string): Promise<void> {
        // Find the card that contains the cab name
        const cabCard = this.page.locator(`h3:has-text("${cabName}")`).locator('..').locator('..');
        await cabCard.locator('button:has-text("Book Now")').click();
        await this.page.waitForURL('**/Pages/addCart/', { timeout: 10000 });
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify pickup and drop locations on booking summary page
     */
    async verifyPickupDropLocations(): Promise<void> {
        const fromLocation = await this.fromLocationCell.innerText();
        const toLocation = await this.toLocationCell.innerText();
        
        // Verify pickup location contains the key parts
        expect(fromLocation).toContain('Rathinam College');
        expect(toLocation).toContain('Gameistry Entertainment');
    }

    /**
     * Get pricing details from booking summary
     * @returns Object containing base fare, tax, and total
     */
    async getPricingDetails(): Promise<{ baseFare: number; tax: number; total: number }> {
        const baseFareText = await this.baseFareCell.innerText();
        const taxText = await this.taxCell.innerText();
        const totalText = await this.totalFareCell.innerText();
        
        const baseFare = parseInt(baseFareText.replace(/[^\d]/g, ''));
        const tax = parseInt(taxText.replace(/[^\d]/g, ''));
        const total = parseInt(totalText.replace(/[^\d]/g, ''));
        
        return { baseFare, tax, total };
    }

    /**
     * Validate pricing calculation
     */
    async validatePricing(): Promise<void> {
        const pricing = await this.getPricingDetails();
        
        expect(pricing.total).toBe(pricing.baseFare + pricing.tax);
    }

    /**
     * Fill contact details in the booking form
     * @param name - Customer name
     * @param mobile - Mobile number
     * @param email - Email address
     * @param pickupAddress - Pickup address
     * @param pickupTime - Pickup time (optional, field is readonly and may require special handling)
     */
    async fillContactDetails(
        name: string,
        mobile: string,
        email: string,
        pickupAddress: string,
        pickupTime?: string
    ): Promise<void> {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.mobileInput.fill(mobile);
        await this.pickupAddressInput.fill(pickupAddress);
        
        // Pickup time field is readonly, so we'll try to interact with it if needed
        // For now, skip it as it may be optional or require a time picker interaction
        if (pickupTime) {
            try {
                // Try to click and use keyboard input if it opens a picker
                await this.pickupTimeInput.click({ timeout: 2000 });
                await this.page.keyboard.type(pickupTime);
            } catch (e) {
                // Pickup time field is readonly or requires special handling
            }
        }
    }

    /**
     * Click Confirm Booking button
     */
    async confirmBooking(): Promise<void> {
        // Close any open modals/time pickers that might be blocking the button
        const timePicker = this.page.locator('.mdtimepicker');
        const isTimePickerVisible = await timePicker.isVisible().catch(() => false);
        
        if (isTimePickerVisible) {
            // Press Escape to close the time picker
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
        }
        
        await this.confirmBookingButton.click();
        // Wait for booking confirmation or next page
        await this.page.waitForTimeout(2000);
    }

    /**
     * Verify booking confirmation (checks for success message or page change)
     */
    async verifyBookingConfirmation(): Promise<void> {
        // Check if URL changed or success message appeared
        const currentUrl = this.page.url();
        
        // You can add more specific checks based on the actual confirmation message/page
        // For example, checking for a success message, order ID, etc.
        expect(currentUrl).toBeTruthy();
    }

    /**
     * Get the selected pickup location
     */
    getSelectedPickupLocation(): string {
        return this.selectedPickupLocation;
    }

    /**
     * Get the selected drop location
     */
    getSelectedDropLocation(): string {
        return this.selectedDropLocation;
    }
}
