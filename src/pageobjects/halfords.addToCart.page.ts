import { $ } from '@wdio/globals'
import Page from './page.js';
import { size } from 'cypress/types/lodash/index.js';

class HalfordsAddToCartPage extends Page {

    public get cycling() {
        return $('//a[@role="button"][normalize-space()="Cycling"]');
    }

    public get bikeAccessories() {
        return $('//ul[@class="border border-gray-200 border-bottom-0"]//li//a[normalize-space()="Bike Accessories"]');
    }

    public get BikeHelmet() {
        return $('//div[@class="b-lhn"]//li[normalize-space()="Bike Helmets"]');
    }

    public get adultBikeHelmet() {
        return $('//div[@class="b-type7__wrapper row bg-white justify-content-center"]//a[@title="Adult Bike Helmets"]');
    }

    public get searchButton() {
        return $('//input[@class="b-search__submit"]');
    }

    public get search() {
        return $('//input[@placeholder="Search"]');
    }

    public async addToCart(value){
        return $('//div[@class="b-product__details b-product__details--compare b-product__list--hidden"]//button[normalize-space()="Add to Basket" and @data-product-name="'+value+'"]')
    }

    public async feature(value){
        return $('//a[@data-display-value="'+value+'"]')
    }

    public get location() {
        return $('//input[@placeholder="Postcode or location"]');
    } 

    public get locationPdp() {
        return $('//div[@data-cmp-id="storeLookup"]//input[@placeholder="Postcode or location"]');
    } 
    
    public get locationFirst() {
        return $('//ul[@class="localities-container"]//li[1]');
    }

    public get addCart() {
        return $('//button[@data-cmp="addToCart"]');
    }

    public get addCartPdp() {
        return $('//button[@data-cmp-id="addToCart"]');
    }

    public get cart() {
        return $('//div[@data-id="minicart-icon"]');
    }

    public get close() {
        return $('//button[@class="modal__close close js-default-btn"]');
    }

    public get firstProduct() {
        return $('//div[@data-cmp="carousel"]//div[@class="slick-slide slick-current slick-active"]');
    }

    public get Vnr() {
        return $('//input[@placeholder="YOUR REG"]');
    }

    public get Find() {
        return $('//button[@class="b-vrn-lookup__button js-vrn-find b-button__primary"]');
    }

    public get continueWithoutFitting() {
        //return $('//input[@data-fitting-label="Continue without fitting"]');
        return $('//label[@for="radio-option-161003-997577-0"]');
        
        
    }
       
    public async  navigateToadultBikeHelmet() {
        await this.cycling.click();
        await browser.pause(2000)
        await this.bikeAccessories.click();
        await browser.pause(2000)      
        await this.BikeHelmet.click();
        await browser.pause(2000)      
        await this.adultBikeHelmet.click();
    }

   
    public async  halfordsAddToCart(product,size,color,location) {
       await this.search.setValue(product);
        await this.searchButton.click();
        (await this.addToCart(product)).click();
        await $('//a[@data-display-value="'+size+'"]').click();
        await browser.pause(2000)      
        await $('//a[@data-display-value="'+color+'"]').click();
        await browser.pause(1000)      
        await this.location.setValue(location);
        await browser.pause(1000)      
        await this.locationFirst.click();
        await browser.pause(4000)  
        await browser.keys('Tab')
        await browser.keys('Tab')
        await browser.keys('Tab')
        await browser.keys('Tab')
        await browser.keys('Tab')
        await browser.keys('Tab')  
        await browser.keys('Tab')
        await browser.keys('Tab')
        await browser.keys('Enter')
        //await this.addCart.click();
        await browser.pause(2000)  
   }
    
    public async  halfordsBasket(product) {
        await this.cart.click();
        await browser.pause(2000)      
        //await this.close.click();
        await expect($('//a[contains(text(), "'+product+'")]')).toBeDisplayed();
    }

    public async  halfordsAddToCartViaPdp(product,size,color,location) {
        await this.search.setValue(product);
         await this.searchButton.click();
         await browser.pause(1000)      
         await this.firstProduct.click();
         await $('//div[@key="productOptionsBlock"]//span[@data-attr-value="'+size+'"]').click();
         await browser.pause(2000)      
         await $('//div[@key="productOptionsBlock"]//span[@data-attr-value="'+color+'"]').click();
         await browser.pause(1000)      
         await this.locationPdp.setValue(location);
         await browser.pause(1000)      
         await this.locationFirst.click();
         await browser.pause(4000) 
         await browser.keys('Tab')  
         await browser.keys('Enter')  
         await browser.pause(1000)         
         //await this.addCartPdp.click();
     }

     public async  halfordsAddToCartBatteries(product,vrn,code,location) {
        await this.search.setValue(product);
         await this.searchButton.click();
         await browser.pause(1000)      
         await this.firstProduct.click();
         await this.Vnr.setValue(vrn);
         await browser.keys('Enter');
         await browser.pause(1000)     
         await expect($('//div[text()="'+code+'"]')).toBeDisplayed();
         await browser.pause(1000)   
         await this.continueWithoutFitting.moveTo();
         //await this.continueWithoutFitting.scrollIntoView(); 
         await this.continueWithoutFitting.waitForClickable();
         await browser.pause(1000)
         await this.continueWithoutFitting.click();
         await browser.pause(1000)     
         //await this.locationPdp.scrollIntoView();  
         await this.locationPdp.setValue(location);
         await browser.pause(1000) 
         await this.locationFirst.click();
         await this.addCartPdp.moveTo();
         await this.addCartPdp.waitForClickable();
         await browser.pause(1000)      
         await this.addCartPdp.click();
     }

     public async  halfordsAddToCartPressureWasher(product,location,locationCode) {
        await this.search.setValue(product);
         await this.searchButton.click();
         await browser.pause(1000)      
         await this.firstProduct.click();
         await browser.pause(1000)      
         await this.locationPdp.setValue(location);
         await browser.pause(1000)      
         await this.locationFirst.click();
         //await expect($('//div[@class="b-product-collect-item__title"][normalize-space()="'+locationCode+'"]')).toBeDisplayed();
         await this.addCartPdp.click();
     }
     
}

export default new HalfordsAddToCartPage();