import {Page, Locator} from '@playwright/test';

export class CartLocators {
    readonly page: Page;
    cartPageButton: Locator;
    addCoffeeButtonCart: (coffeeName: string) => Locator;
    removeCoffeeButtonCart: (coffeeName: string) => Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartPageButton = page.locator('//*[@aria-label="Cart page"]');
        this.addCoffeeButtonCart = (coffeeName: string) =>
            page.locator(
                `//*[@class='list-header']/parent::ul//button[@aria-label="Add one ${coffeeName}"]`
            );
        this.removeCoffeeButtonCart = (coffeeName: string) =>
            page.locator(
                `//*[@class='list-header']/parent::ul//button[@aria-label="Remove one ${coffeeName}"]`
            );
    }
}