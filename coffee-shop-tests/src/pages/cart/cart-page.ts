import { Page } from '@playwright/test';
import { BasePage } from '../menu/menu-page';
import { CartLocators } from './cart-locators';

export class CartPage extends BasePage {
  readonly locators: CartLocators;
  constructor(page: Page) {
    super(page);
    this.locators = new CartLocators(page);
  }

  async clickCartPageButton() {
    await this.locators.cartPageButton.click();
  }

  async clickAddCoffeeButtonCart(coffeeName: string) {
    await this.locators.addCoffeeButtonCart(coffeeName).click();
  }

  async clickRemoveCoffeeButtonCart(coffeeName: string) {
    await this.locators.removeCoffeeButtonCart(coffeeName).click();
  }
}
