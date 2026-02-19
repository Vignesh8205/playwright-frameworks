import { test, expect } from '@playwright/test';
import { BookingPage } from '../../pages/booking.page';
import { getEnv } from '../../config/env.config';
import testData from '../../test-data/testData.json';

test.describe('One-Way Ride Booking - End to End Flow', () => {
    let bookingPage: BookingPage;
    const baseUrl = getEnv().baseURL;

    test.beforeEach(async ({ page }) => {
        bookingPage = new BookingPage(page);
    });

    test('Complete ride booking flow with location, date, cab selection and price validation', async ({ page }) => {
        test.setTimeout(120000);

        let pickupLocation: string;
        let dropLocation: string;
        let cabList: Array<{ name: string; price: string }>;
        let pricing: { baseFare: number; tax: number; total: number };

        await test.step('Navigate to Droptaxie application', async () => {
            await page.goto(baseUrl);
            await expect(page).toHaveTitle(/Droptaxie/);
        });

        await test.step('Enter pickup location - Rathinam College', async () => {
            await bookingPage.enterPickupLocation(testData.booking.pickup.location);
            pickupLocation = bookingPage.getSelectedPickupLocation();
            expect(pickupLocation).toContain('Rathinam College');
        });

        await test.step('Enter drop location - Type "GA" and select 2nd suggestion', async () => {
            await bookingPage.enterDropLocation(
                testData.booking.drop.partialText,
                testData.booking.drop.suggestionIndex
            );
            dropLocation = bookingPage.getSelectedDropLocation();
            expect(dropLocation).toContain(testData.booking.drop.expectedName);
        });

        await test.step('Select "Book Later" with future date', async () => {
            await bookingPage.selectFutureDate(testData.booking.date.daysFromToday);
        });

        await test.step('Click "Search Cabs" button', async () => {
            await bookingPage.clickSearchCabs();
            await expect(page).toHaveURL(/\/Pages\/cabs\//);
        });

        await test.step('Capture and print available cab list with prices', async () => {
            cabList = await bookingPage.getCabList();
            expect(cabList.length).toBeGreaterThan(0);
            
            for (const cab of cabList) {
                expect(cab.name).toBeTruthy();
                expect(cab.price).toMatch(/Rs\.\s*\d+/);
            }
        });

        await test.step('Select first available cab and click "Book Now"', async () => {
            await bookingPage.selectCabByIndex(0);
            await expect(page).toHaveURL(/\/Pages\/addCart\//);
        });

        await test.step('Verify pickup and drop locations on booking summary', async () => {
            await bookingPage.verifyPickupDropLocations();
        });

        await test.step('Validate pricing calculation (Base Fare + Tax = Total)', async () => {
            pricing = await bookingPage.getPricingDetails();
            expect(pricing.baseFare).toBeGreaterThan(0);
            expect(pricing.tax).toBeGreaterThan(0);
            expect(pricing.total).toBeGreaterThan(0);
            await bookingPage.validatePricing();
        });

        await test.step('Fill contact details', async () => {
            await bookingPage.fillContactDetails(
                testData.booking.contact.name,
                testData.booking.contact.mobile,
                testData.booking.contact.email,
                testData.booking.contact.pickupAddress,
                testData.booking.contact.pickupTime
            );
        });

        await test.step('Re-verify pickup and drop locations in confirmation section', async () => {
            await bookingPage.verifyPickupDropLocations();
        });

        await test.step('Confirm booking and verify confirmation', async () => {
            await bookingPage.confirmBooking();
            await page.waitForTimeout(2000);
            await bookingPage.verifyBookingConfirmation();
        });
    });
});
