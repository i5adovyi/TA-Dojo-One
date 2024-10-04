import { Locator, Page } from '@playwright/test';
import { coffeeLocator } from './helpers';

//Main Menu Page Locators
export const menuPageLocators = (page: Page) => {
  //Locators generator




  return {
    // list of coffee
    // espresso: getCoffeeLocator('Espresso', page),
    // espressoMacchiato: getCoffeeLocator('Espresso Macchiato', page),
    // cappuccino: getCoffeeLocator('Cappuccino', page),
    // mocha: getCoffeeLocator('Mocha', page),
    // flatWhite: getCoffeeLocator('Flat White', page),
    // americano: getCoffeeLocator('Americano', page),
    // cafeLatte: getCoffeeLocator('Cafe Latte', page),
    // espressoConPanna: getCoffeeLocator('Espresso Con Panna', page),
    // cafeBreve: getCoffeeLocator('Cafe Breve', page),
     discountedMocha: coffeeLocator('(Discounted) Mocha', page),

    //payment form
    paymentForm: page.locator('[aria-label="Payment form"]'),
    name: page.locator('input[name=name][id=name]'),
    email: page.locator('input[name=email][id=email]'),
    promotionCheckbox: page.locator('input[name=promotion][id=promotion]'),
    submitPayment: page.locator('button[id="submit-payment"][type=submit]'),

    //promotion form
    promotionButtonYes: page.locator(
      `//*[@class='buttons']/button[@class='yes']`
    ),
    promotionButtonNo: page.locator(
      `//*[@class='buttons']/button[not(@class='yes')]`
    ),

    //Checkout button
    checkoutButton: page.locator(`//*[@data-test="checkout"]`),
    hoverMessage: page.locator(`//*[@class='cart-preview']`),
    addNamedCoffee: (coffeeName: string) => {
      return page.locator(
        `//*[@class="unit-controller"]/*[@aria-label="Add one ${coffeeName}"]`
      );
    },
    removeNamedCoffee: (coffeeName: string) => {
      return page.locator(
        `//*[@class="unit-controller"]/*[@aria-label="Remove one ${coffeeName}"]`
      );
    },
    //Success bar
    successSnackbar: page.locator('.snackbar.success[role=button]'),

    //Context menu
    addToCartModal: page.locator('//dialog[@data-cy="add-to-cart-modal"]'),
    modalButtonYes: page.locator(`//*[@method='dialog']/button[1]`),
    modalButtonNo: page.locator(`//*[@method='dialog']/button[2]`),
  };
};

//Cart Page Locators
export function cartPageLocators(page: Page) {
  return {
    cartPageButton: page.locator('//*[@aria-label="Cart page"]'),

    addCoffeeButtonCart: (coffeeName: string) =>
      page.locator(
        `//*[@class='list-header']/parent::ul//button[@aria-label="Add one ${coffeeName}"]`
      ),

    removeCoffeeButtonCart: (coffeeName: string) =>
      page.locator(
        `//*[@class='list-header']/parent::ul//button[@aria-label="Remove one ${coffeeName}"]`
      ),
  };
}

export const coffeeMenuList = {
  espresso: 'Espresso',
  espressoMacchiato: 'Espresso Macchiato',
  cappuccino: 'Cappuccino',
  mocha: 'Mocha',
  flatWhite: 'Flat White',
  americano: 'Americano',
  cafeLatte: 'Cafe Latte',
  espressoConPanna: 'Espresso Con Panna',
  cafeBreve: 'Cafe Breve',
};
