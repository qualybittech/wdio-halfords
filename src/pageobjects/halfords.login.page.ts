import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HalfordsLoginPage extends Page {
    /**
     * define selectors using getter methods
     */


    public get account() {
        return $('//span[normalize-space()="Account"]');
    }

    public get cookies() {
        return $('//button[@id="onetrust-accept-btn-handler"]');
    }

    public get inputEmail () {
        return $('//input[@id="loginEmail"]');
    }

    public get inputPassword () {
        return $('//input[@id="loginPassword"]');
    }

    public get btnSubmit () {
        return $('//button[@name="login"]');
    }

    public get welcome () {
        return $('//h4[@class="b-my-account__header-welcome-message"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */

    public async appLaunch(url:string){
        return await browser.url(url)
    }

    public async cookie(){
       await browser.pause(3000)
      // await this.cookies.waitForDisplayed();
       await browser.keys('Tab');
       await browser.keys('Tab');
       await browser.keys('Enter');
       await browser.pause(2000)

    }

    public async halfordsLogin (email: string, password: string) {
            await browser.url("/login?rurl=1")
            await this.inputEmail.setValue(email);
            await this.inputPassword.setValue(password);
            await this.btnSubmit.click();
            await browser.pause(3000);
            await expect(this.welcome).toBeDisplayed();
    }
    
}

export default new HalfordsLoginPage();