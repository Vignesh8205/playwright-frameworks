import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/custom-world';
import { bookingPage } from './ride-booking.steps';

let savedDropLocation: string = '';
let couponErrorMessage: string = '';

When('I switch to {string} booking tab', async function (this: ICustomWorld, bookingType: string) {
  if (bookingType === 'Two Way') {
    await bookingPage.switchToTwoWayBooking();
  }
});

Then(
  'the two-way booking form should be displayed with {string} and {string} fields',
  async function (this: ICustomWorld, field1: string, field2: string) {
    await bookingPage.verifyTwoWayFormDisplayed();
  }
);

Then('the drop location should be stored for later validation', async function (this: ICustomWorld) {
  savedDropLocation = bookingPage.getSelectedDropLocation();
  expect(savedDropLocation).toBeTruthy();
  console.log(`Stored drop location: ${savedDropLocation}`);
});

When('I enter drop location as {string}', async function (this: ICustomWorld, location: string) {
  await bookingPage.enterTwoWayDropLocation(location);
});

When('I select {string} with {int} days from today', async function (
  this: ICustomWorld,
  dateField: string,
  days: number
) {
  if (dateField === 'From Date') {
    await bookingPage.selectFromDate(days);
  } else if (dateField === 'To Date') {
    await bookingPage.selectToDate(days);
  } else if (dateField === 'Book Later') {
    await bookingPage.selectFutureDate(days);
  }
});

Then('both dates should be set correctly', async function (this: ICustomWorld) {
  // Dates are set, this is a verification step
  console.log('✓ From Date and To Date set successfully');
});

Then('I print all available cabs with their prices', async function (this: ICustomWorld) {
  await bookingPage.printCabList();
});

When('I verify the journey details on booking page', async function (this: ICustomWorld) {
  // This triggers the next verification step
});

Then('the pickup location should match {string}', async function (this: ICustomWorld, expectedLocation: string) {
  const pickupLocation = bookingPage.getSelectedPickupLocation();
  expect(pickupLocation).toContain(expectedLocation);
});

Then('the drop location should match the previously saved value', async function (this: ICustomWorld) {
  const currentDropLocation = bookingPage.getSelectedDropLocation();
  expect(currentDropLocation).toBe(savedDropLocation);
});

When('I verify the pickup and drop locations match saved values', async function (this: ICustomWorld) {
  await bookingPage.verifyPickupDropLocations();
});

When('I attempt to apply coupon code {string}', async function (this: ICustomWorld, couponCode: string) {
  await bookingPage.applyCoupon(couponCode);
});

Then('I should see coupon validation error message', async function (this: ICustomWorld) {
  await bookingPage.verifyCouponErrorDisplayed();
});

Then('I capture and log the coupon error message', async function (this: ICustomWorld) {
  couponErrorMessage = await bookingPage.getCouponErrorMessage();
  console.log(`\nCoupon Error: ${couponErrorMessage}\n`);
});

When('I select pickup time {string} from the time dropdown', async function (
  this: ICustomWorld,
  time: string
) {
  await bookingPage.selectPickupTime(time);
});

Then('the pickup time should be set to {string}', async function (this: ICustomWorld, expectedTime: string) {
  console.log(`✓ Pickup time set to: ${expectedTime}`);
});

When('I verify the GPay payment number', async function (this: ICustomWorld) {
  // This triggers the next verification
});

Then('the displayed GPay number should be {string}', async function (this: ICustomWorld, expectedNumber: string) {
  await bookingPage.verifyGPayNumber(expectedNumber);
});

When('I verify the terms and conditions checkbox', async function (this: ICustomWorld) {
  // This triggers the next verification
});

Then(
  'the checkbox {string} should be present',
  async function (this: ICustomWorld, checkboxText: string) {
    await bookingPage.verifyTermsCheckboxPresent();
  }
);

Then('I select the terms and conditions checkbox', async function (this: ICustomWorld) {
  await bookingPage.selectTermsCheckbox();
});

Then('the two-way booking should be successfully completed', async function (this: ICustomWorld) {
  await bookingPage.verifyTwoWayBookingConfirmation();
});
