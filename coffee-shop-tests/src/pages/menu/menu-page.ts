import { Page } from '@playwright/test';
import { MenuLocators } from './menu-locators';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async navigate(url: string) {
    await this.page.goto(url);
  }
}

export class MenuPage extends   BasePage {
  readonly locators: MenuLocators;
  constructor(page: Page) {
    super(page);
    this.locators = new MenuLocators(page);
  }

  async clickCheckoutButton() {
    await this.locators.checkoutButton.click();
  }

  async hoverOverCart() {
    await this.locators.hoverMessage.hover();
  }

  async clickAddCoffee(coffeeName: string) {
    await this.locators.addNamedCoffee(coffeeName).click();
  }
  async clickRemoveCoffee(coffeeName: string) {
    await this.locators.removeNamedCoffee(coffeeName).click();
  }

  async clickPromotionButtonYes() {
    await this.locators.promotionButtonYes.click();
  }

  async clickPromotionButtonNo() {
    await this.locators.promotionButtonNo.click();
  }

  async clickSubmitPayment() {
    await this.locators.submitPayment.click();
  }

  async fillEmail(email: string) {
    await this.locators.email.fill(email);
  }

  async fillName(name: string) {
    await this.locators.name.fill(name);
  }

  async clickSuccessSnackbar() {
    await this.locators.successSnackbar.click();
  }

  async clickModalButtonYes() {
    await this.locators.modalButtonYes.click();
  }

  async clickModalButtonNo() {
    await this.locators.modalButtonNo.click();
  }

  async clickAddToCartModal() {
    await this.locators.addToCartModal.click();
  }

  async fillPromotionCheckbox() {
    await this.locators.promotionCheckbox.check();
  }

  async clickOnCup(coffeeName: string) {
    await this.locators.coffeeLocator(coffeeName).click();
  }
}
