import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $, browser } from '@wdio/globals'


import HalfordsLoginPage from '../pageobjects/halfords.login.page.js';
import HalfordsDashoardPage from '../pageobjects/halfords.dashoard.page.js';
import HalfordsAddToCartPage from '../pageobjects/halfords.addToCart.page.js';

Given('I am on the halfords website home page', async () => {
    await browser.deleteCookies();
    await HalfordsLoginPage.appLaunch('/');
    await browser.maximizeWindow();
    await HalfordsLoginPage.cookie();

});

When(/^I login with halfords (.*), (.*)/, async (email, password) => {
    await HalfordsLoginPage.halfordsLogin(email, password);
});

Then('I check dashboard Booking orders contents', async () => {
    await HalfordsDashoardPage.halfordsBookingOrders();
});

When(/^I select the product and added to cart (.*),(.*),(.*),(.*)/, async (product,size,color,location) => {
    await HalfordsAddToCartPage.halfordsAddToCart(product,size,color,location);
})

Then(/^I check in Basket (.*)/, async (product) => {
    await HalfordsAddToCartPage.halfordsBasket(product);
});

When(/^I add the product to cart via pdp (.*),(.*),(.*),(.*)/, async (product,size,color,location) => {
    await HalfordsAddToCartPage.halfordsAddToCartViaPdp(product,size,color,location);
})

When(/^I add the VRN and add to cart via pdp (.*),(.*),(.*),(.*)/, async (product,vrn,code,location) => {
    await HalfordsAddToCartPage.halfordsAddToCartBatteries(product,vrn,code,location);
})

When(/^I check for pressure washer and add to cart via pdp (.*),(.*),(.*)/, async (product,location,code) => {
    await HalfordsAddToCartPage.halfordsAddToCartPressureWasher(product,location,code);
})
 