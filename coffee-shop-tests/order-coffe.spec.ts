import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { clickFewTimes } from './helpers';
import { cartPageLocators, getCoffeeLocators } from './locators';

let menu: ReturnType<typeof getCoffeeLocators>;
let cart: ReturnType<typeof cartPageLocators>;
let coffeeNamesList = [
  'Espresso',
  'Espresso Macchiato',
  'Cappuccino',
  'Mocha',
  'Flat White',
  'Americano',
  'Cafe Latte',
  'Espresso Con Panna',
  'Cafe Breve',
];
let userName = faker.internet.userName();
let userEmail = faker.internet.email();
test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app');
  menu = getCoffeeLocators(page);
  cart = cartPageLocators(page);
});

test.describe('Order new coffee: ', () => {
  test('ISCS-1 - Order espresso', async ({ page }) => {
    await expect.soft(menu.espresso).toBeVisible();
    await menu.espresso.click();
    await menu.checkoutButton.click();
    await expect.soft(menu.paymentForm).toBeVisible();
    await menu.name.fill(userName);
    await menu.email.fill(userEmail);
    await menu.promotionCheckbox.check();
    await menu.submitPayment.click();
    await expect(menu.successSnackbar).toBeVisible();
  });

  test('ISCS-2 - Order all coffee', async ({ page }) => {
    let coffeeList = [
      'espresso',
      'espressoMacchiato',
      'cappuccino',
      'mocha',
      'flatWhite',
      'americano',
      'cafeLatte',
      'espressoConPanna',
      'cafeBreve',
    ];
    for (let coffee of coffeeList) {
      await menu[coffee].click();
    }

    await cart.cartPageButton.click();

    await expect.soft(menu.checkoutButton).toBeVisible();

    for (let coffee of coffeeNamesList) {
      await expect.soft(cart.addCoffeeButtonCart(coffee)).toBeVisible();
    }

    await menu.checkoutButton.click();
    await expect.soft(menu.paymentForm).toBeVisible();
    await menu.name.fill(userName);
    await menu.email.fill(userEmail);
    await menu.promotionCheckbox.check();
    await menu.submitPayment.click();
    await expect(menu.successSnackbar).toBeVisible();
  });

  test('ISCS-3 - Ordering two espresso via hover on checkout button', async ({
    page,
  }) => {
    await menu.espresso.click();
    await expect.soft(menu.checkoutButton).toContainText('Total: $10.00');
    await menu.checkoutButton.hover();
    await expect.soft(menu.addNamedCoffee('Espresso')).toBeVisible();
    await menu.addNamedCoffee('Espresso').click();
    await expect.soft(menu.checkoutButton).toContainText('Total: $20.00');
    await menu.checkoutButton.click();
    await expect(menu.paymentForm).toBeVisible();
  });

  test('ISCS-4 - Right click on Mocha', async ({ page }) => {
    await menu.mocha.click({
      button: 'right',
    });
    await expect.soft(menu.addToCartModal).toBeVisible();
    await menu.modalButtonYes.click();
    await expect.soft(menu.checkoutButton).toContainText('Total: $8.00');
    await menu.mocha.click({
      button: 'right',
    });
    await menu.modalButtonNo.click();
    await expect(menu.checkoutButton).toContainText('Total: $8.00');
  });

  test('ISCS-5 - Promo Message', async ({ page }) => {
    await clickFewTimes(menu.cappuccino, 3, page);
    await expect.soft(menu.discountedMocha).toBeVisible();
    await expect.soft(menu.promotionButtonNo).toBeVisible();
    await expect.soft(menu.promotionButtonYes).toBeVisible();
    await menu.promotionButtonNo.click();
    await menu.checkoutButton.hover();
    await expect.soft(menu.addNamedCoffee('Cappuccino')).toBeVisible();
    await clickFewTimes(menu.mocha, 3, page);
    await expect.soft(menu.promotionButtonYes).toBeVisible();
    await menu.promotionButtonYes.click();
    await menu.checkoutButton.hover();
    await expect.soft(menu.addNamedCoffee('(Discounted) Mocha')).toBeVisible();
    await cart.cartPageButton.click();
    await expect(cart.addCoffeeButtonCart('(Discounted) Mocha')).toBeVisible();
    await expect(
      cart.removeCoffeeButtonCart('(Discounted) Mocha')
    ).toBeVisible();
  });
});
