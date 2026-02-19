import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BookingPage } from '../../../pages/booking.page';
import { ICustomWorld } from '../support/custom-world';
import { getEnv } from '../../../config/env.config';

// Export bookingPage for two-way-ride-booking.steps.ts
export let bookingPage: BookingPage;
let cabList: Array<{ name: string; price: string }> = [];
let pricing: { baseFare: number; tax: number; total: number };

Given('I am on the Droptaxie application', async function (this: ICustomWorld) {
  this.page!.setDefaultTimeout(120000);
  bookingPage = new BookingPage(this.page!);
  await this.page!.goto(getEnv().baseURL);
  await expect(this.page!).toHaveTitle(/Droptaxie/);
});

When('I enter pickup location as {string}', async function (this: ICustomWorld, location: string) {
  // Check if we're on two-way tab
  const isTwoWay = await this.page!.locator('#two-way-form').isVisible().catch(() => false);
  
  if (isTwoWay) {
    await bookingPage.enterTwoWayPickupLocation(location);
  } else {
    await bookingPage.enterPickupLocation(location);
  }
});

Then('the pickup location should be set to {string}', async function (this: ICustomWorld, expectedLocation: string) {
  const pickupLocation = bookingPage.getSelectedPickupLocation();
  expect(pickupLocation).toContain(expectedLocation);
});

When('I enter drop location by typing {string} and selecting suggestion number {int}', async function (
  this: ICustomWorld,
  partialText: string,
  suggestionIndex: number
) {
  // Check if we're on two-way tab - two-way uses full location now
  const isTwoWay = await this.page!.locator('#two-way-form').isVisible().catch(() => false);
  
  if (isTwoWay) {
    // For two-way, this step won't be used - use "I enter drop location as" instead
    throw new Error('Use "I enter drop location as <location>" step for two-way booking');
  } else {
    // Convert 1-based user input to 0-based array index
    await bookingPage.enterDropLocation(partialText, suggestionIndex - 1);
  }
});

Then('the drop location should contain {string}', async function (this: ICustomWorld, expectedText: string) {
  const dropLocation = bookingPage.getSelectedDropLocation();
  expect(dropLocation).toContain(expectedText);
});

When('I click on {string} button', async function (this: ICustomWorld, buttonName: string) {
  if (buttonName === 'Search Cabs') {
    // Check if two-way form is visible
    const isTwoWay = await this.page!.locator('#two-way-form').isVisible().catch(() => false);
    if (isTwoWay) {
      await bookingPage.clickTwoWaySearchCabs();
    } else {
      await bookingPage.clickSearchCabs();
    }
  } else if (buttonName === 'Book Now') {
    await bookingPage.selectCabByIndex(0);
  } else if (buttonName === 'Confirm Booking') {
    await bookingPage.confirmBooking();
    await this.page!.waitForTimeout(2000);
  }
});

Then('I should be redirected to the cabs listing page', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/\/Pages\/cabs\//);
});

When('I view the available cab list', async function (this: ICustomWorld) {
  cabList = await bookingPage.getCabList();
});

Then('I should see at least {int} cab available', async function (this: ICustomWorld, minCabs: number) {
  expect(cabList.length).toBeGreaterThanOrEqual(minCabs);
});

Then('each cab should display name and price', async function (this: ICustomWorld) {
  for (const cab of cabList) {
    expect(cab.name).toBeTruthy();
    expect(cab.price).toMatch(/Rs\.\s*\d+/);
  }
});

When('I select the first available cab', async function (this: ICustomWorld) {
  // This is just a placeholder step - actual selection happens in "Book Now" button click
});

Then('I should be redirected to the booking summary page', async function (this: ICustomWorld) {
  await expect(this.page!).toHaveURL(/\/Pages\/addCart\//);
});

When('I verify the journey details', async function (this: ICustomWorld) {
  // This step triggers the verification in the next step
});

Then('the pickup and drop locations should be correctly displayed', async function (this: ICustomWorld) {
  await bookingPage.verifyPickupDropLocations();
});

When('I view the pricing details', async function (this: ICustomWorld) {
  pricing = await bookingPage.getPricingDetails();
});

Then('the base fare should be greater than {int}', async function (this: ICustomWorld, minValue: number) {
  expect(pricing.baseFare).toBeGreaterThan(minValue);
});

Then('the tax should be greater than {int}', async function (this: ICustomWorld, minValue: number) {
  expect(pricing.tax).toBeGreaterThan(minValue);
});

Then('the total fare should equal base fare plus tax', async function (this: ICustomWorld) {
  await bookingPage.validatePricing();
  expect(pricing.total).toBeGreaterThan(0);
});

When('I fill the contact details with:', async function (this: ICustomWorld, dataTable: DataTable) {
  const data = dataTable.rowsHash();
  
  await bookingPage.fillContactDetails(
    data.name,
    data.mobile,
    data.email,
    data.pickupAddress,
    data.pickupTime
  );
});

When('I verify the pickup and drop locations one more time', async function (this: ICustomWorld) {
  await bookingPage.verifyPickupDropLocations();
});

Then('I should see booking confirmation message', async function (this: ICustomWorld) {
  await bookingPage.verifyBookingConfirmation();
});

Then('the booking should be successfully completed', async function (this: ICustomWorld) {
  // Additional validation if needed
  console.log('✓ Booking completed successfully');
});
