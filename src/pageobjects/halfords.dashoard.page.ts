import { $ } from '@wdio/globals'
import Page from './page.js';

class HalfordsDashboardPage extends Page {

    public get bookingAndorders() {
        return $('//span[@class="mt-1"][normalize-space()="Bookings & Orders"]');
    }

    public get selectOrder() {
        return $('//div[@class="b-order-history__item"]//a[1]');
    }

    public get trackOrder() {
        return $('//h1[text()="Track your order"]');
    }

   
    public async halfordsBookingOrders () {

          await this.bookingAndorders.waitForDisplayed();
          await this.bookingAndorders.click();
          await this.selectOrder.waitForDisplayed();
          await this.selectOrder.click();
          await this.trackOrder.waitForDisplayed();
          await expect(this.trackOrder).toBeDisplayed();
    }
    
}

export default new HalfordsDashboardPage();