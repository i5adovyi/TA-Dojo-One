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
    await expect(menu.paymentForm).toBeVisible();
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

    await expect(menu.checkoutButton).toBeVisible();

    for (let coffee of coffeeNamesList) {
      await expect(cart.addCoffeeButtonCart(coffee)).toBeVisible();
    }

    await menu.checkoutButton.click();
    await expect(menu.paymentForm).toBeVisible();
    await menu.name.fill(userName);
    await menu.email.fill(userEmail);
    await menu.promotionCheckbox.check();
    await menu.submitPayment.click();
    await expect(menu.successSnackbar).toBeVisible();
  });

  test('ISCS-3 - Ordering two espresso via hover on checkout button', async ({
    page,
  }) => {
    await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $10.00'
    );
    await page.locator('[data-test="checkout"]').hover();
    await expect(
      page.locator(
        '//*[@class="unit-controller"]/button[@aria-label="Add one Espresso"]'
      )
    ).toBeVisible();
    await page
      .locator(
        '//*[@class="unit-controller"]/*[@aria-label="Add one Espresso"]'
      )
      .click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $20.00'
    );
    await page.locator('[data-test="checkout"]').click();
    await expect(
      page.locator('//form[@aria-label="Payment form"]')
    ).toBeVisible();
  });

  test('ISCS-4 - Right click on Mocha', async ({ page }) => {
    await page.locator('[data-test="Mocha"]').click({
      button: 'right',
    });
    await expect(
      page.locator('//dialog[@data-cy="add-to-cart-modal"]')
    ).toBeVisible();
    await page
      .locator(`//*[@method='dialog']/button[contains(text(), 'Yes')]`)
      .click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $8.00'
    );
    await page.locator('[data-test="Mocha"]').click({
      button: 'right',
    });
    await page
      .locator(`//*[@method='dialog']/button[contains(text(), 'No')]`)
      .click();
    await expect(
      page.locator(
        `//*[@data-test="checkout" and contains(text(), 'Total: $8.00')]`
      )
    ).toBeVisible();
  });

  test('ISCS-5 - Promo Message', async ({ page }) => {
    await clickFewTimes(menu.cappuccino, 3, page);
    await expect(menu.discountedMocha).toBeVisible();
    await expect(menu.promotionButtonNo).toBeVisible();
    await expect(menu.promotionButtonYes).toBeVisible();
    await menu.promotionButtonNo.click();
    await menu.checkoutButton.hover();
    await expect(menu.addNamedCoffee('Cappuccino')).toBeVisible();
    await clickFewTimes(menu.mocha, 3, page);
    await expect(menu.promotionButtonYes).toBeVisible();
    await menu.promotionButtonYes.click();
    await menu.checkoutButton.hover();
    await expect(menu.addNamedCoffee('(Discounted) Mocha')).toBeVisible();
    await cart.cartPageButton.click();
    await expect(cart.addCoffeeButtonCart('(Discounted) Mocha')).toBeVisible();
    await expect(
      cart.removeCoffeeButtonCart('(Discounted) Mocha')
    ).toBeVisible();
  });
});
