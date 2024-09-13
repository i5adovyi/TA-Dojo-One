import { Page } from '@playwright/test';

export const getCoffeeLocators = (page: Page) => {
  //
  const getCoffeeLocator = (coffeeName: string, page: Page) => {
    return page.locator(
      `//*[@aria-label="${coffeeName}" and contains(@class, 'cup-body')]`
    );
  };

  return {
    // list of coffee
    espresso: getCoffeeLocator('Espresso', page),
    espressoMacchiato: getCoffeeLocator('Espresso Macchiato', page),
    cappuccino: getCoffeeLocator('Cappuccino', page),
    mocha: getCoffeeLocator('Mocha', page),
    flatWhite: getCoffeeLocator('Flat White', page),
    americano: getCoffeeLocator('Americano', page),
    cafeLatte: getCoffeeLocator('Cafe Latte', page),
    espressoConPanna: getCoffeeLocator('Espresso Con Panna', page),
    cafeBreve: getCoffeeLocator('Cafe Breve', page),
    discountedMocha: getCoffeeLocator('(Discounted) Mocha', page),

    //payment form
    paymentForm: page.locator('[aria-label="Payment form"]'),
    name: page.locator('input[name=name][id=name]'),
    email: page.locator('input[name=email][id=email]'),
    submitPayment: page.locator('button[id="submit-payment"][type=submit]'),

    //promotion form
    promotion: page.locator('input[name=promotion][id=promotion]'),
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
  };
};

// export const addNamedCoffeeLocator = (
//   coffeeName: string,
//   page: Page
// ): Locator => {
//   return page.locator(
//     `//*[@class="unit-controller"]/*[@aria-label="Add one ${coffeeName}"]`
//   );
// };

// export const removeNamedCoffeeLocator = (
//   coffeeName: string,
//   page: Page
// ): Locator => {
//   return page.locator(
//     `//*[@class="unit-controller"]/*[@aria-label="Remove one ${coffeeName}"]`
//   );
// };

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
