import { Locator, Page } from '@playwright/test';

export class MenuLocators {
  private page: Page;
  paymentForm: Locator;
  name: Locator;
  email: Locator;
  promotionCheckbox: Locator;
  submitPayment: Locator;
  promotionButtonYes: Locator;
  promotionButtonNo: Locator;
  checkoutButton: Locator;
  hoverMessage: Locator;
  successSnackbar: Locator;
  addToCartModal: Locator;
  modalButtonYes: Locator;
  modalButtonNo: Locator;
  addNamedCoffee: (coffeeName: string) => Locator;
  removeNamedCoffee: (coffeeName: string) => Locator;
  discountedMocha: Locator;
  coffeeLocator: (coffeeName: string) => Locator;

  constructor(page) {
    this.page = page;
    this.paymentForm = page.locator('[aria-label="Payment form"]');
    this.name = page.locator('input[name=name][id=name]');
    this.email = page.locator('input[name=email][id=email]');
    this.promotionCheckbox = page.locator(
      'input[name=promotion][id=promotion]'
    );
    this.submitPayment = page.locator(
      'button[id="submit-payment"][type=submit]'
    );
    this.promotionButtonYes = page.locator(
      `//*[@class='buttons']/button[@class='yes']`
    );
    this.promotionButtonNo = page.locator(
      `//*[@class='buttons']/button[not(@class='yes')]`
    );
    this.checkoutButton = page.locator(`//*[@data-test="checkout"]`);
    this.hoverMessage = page.locator(`//*[@class='cart-preview']`);
    this.successSnackbar = page.locator('.snackbar.success[role=button]');
    this.addToCartModal = page.locator(
      '//dialog[@data-cy="add-to-cart-modal"]'
    );
    this.modalButtonYes = page.locator(`//*[@method='dialog']/button[1]`);
    this.modalButtonNo = page.locator(`//*[@method='dialog']/button[2]`);

    this.addNamedCoffee = (coffeeName: string) => {
      return page.locator(
        `//*[@class="unit-controller"]/*[@aria-label="Add one ${coffeeName}"]`
      );
    };
    this.removeNamedCoffee = (coffeeName: string) => {
      return page.locator(
        `//*[@class="unit-controller"]/*[@aria-label="Remove one ${coffeeName}"]`
      );
    };
    this.discountedMocha = page.locator('//*[@aria-label="(Discounted) Mocha"]');

    this.coffeeLocator = (coffeeName: string) => {
      return page.locator(
        `//*[@aria-label="${coffeeName}" and contains(@class, 'cup-body')]`
      );
    };
  }
}
