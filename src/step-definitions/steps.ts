import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals'

import HalfordsLoginPage from '../pageobjects/halfords.login.page.js';
import HalfordsDashoardPage from '../pageobjects/halfords.dashoard.page.js';

Given('I am on the halfords website home page', async () => {
    await HalfordsLoginPage.appLaunch('https://www.halfords.com/login?rurl=1&_wt.mode=staging');
    await browser.maximizeWindow();
    await HalfordsLoginPage.cookie();
});

When(/^I login with halfords (.*), (.*)/, async (email, password) => {
    await HalfordsLoginPage.halfordsLogin(email, password);
});

Then('I check dashboard Booking orders contents', async () => {
    await HalfordsDashoardPage.halfordsBookingOrders();
});