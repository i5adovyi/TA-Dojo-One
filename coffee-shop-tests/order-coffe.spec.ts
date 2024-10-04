import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { clickFewTimes, clickOnCup, coffeeLocator } from './helpers';
import { cartPageLocators, coffeeMenuList, menuPageLocators } from './locators';

let menu: ReturnType<typeof menuPageLocators>;
let cart: ReturnType<typeof cartPageLocators>;
//const coffeeList: object = coffeeMenuList;
const userName = faker.internet.userName();
const userEmail = faker.internet.email();

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app');
  menu = menuPageLocators(page);
  cart = cartPageLocators(page);
});

test.describe('Order new coffee: ', () => {
  test('ISCS-1 - Order espresso', async ({ page }) => {
    await expect.soft(coffeeLocator('Espresso', page)).toBeVisible();
    //await menu.espresso.click();
    await clickOnCup(coffeeMenuList.espresso, page);
    await menu.checkoutButton.click();
    await expect.soft(menu.paymentForm).toBeVisible();
    await menu.name.fill(userName);
    await menu.email.fill(userEmail);
    await menu.promotionCheckbox.check();
    await menu.submitPayment.click();
    await expect(menu.successSnackbar).toBeVisible();
  });

  test('ISCS-2 - Order all coffee', async ({ page }) => {
    for (const coffeeName of Object.values(coffeeMenuList)) {
      await clickOnCup(coffeeName, page);
    }

    await cart.cartPageButton.click();

    await expect.soft(menu.checkoutButton).toBeVisible();

    for (const coffeeKey in coffeeMenuList) {
      const coffeeValue = coffeeMenuList[coffeeKey];
      await expect.soft(cart.addCoffeeButtonCart(coffeeValue)).toBeVisible();
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
    await clickOnCup(coffeeMenuList.espresso, page);
    await expect.soft(menu.checkoutButton).toContainText('Total: $10.00');
    await menu.checkoutButton.hover();
    await expect
      .soft(menu.addNamedCoffee(coffeeMenuList.espresso))
      .toBeVisible();
    await menu.addNamedCoffee(coffeeMenuList.espresso).click();
    await expect.soft(menu.checkoutButton).toContainText('Total: $20.00');
    await menu.checkoutButton.click();
    await expect(menu.paymentForm).toBeVisible();
  });

  test('ISCS-4 - Right click on Mocha', async ({ page }) => {
    await coffeeLocator(coffeeMenuList.mocha, page).click({ button: 'right' });
    await expect.soft(menu.addToCartModal).toBeVisible();
    await menu.modalButtonYes.click();
    await expect.soft(menu.checkoutButton).toContainText('Total: $8.00');
    await coffeeLocator(coffeeMenuList.mocha, page).click({ button: 'right' });
    await menu.modalButtonNo.click();
    await expect(menu.checkoutButton).toContainText('Total: $8.00');
  });

  test('ISCS-5 - Promo Message', async ({ page }) => {
    await clickFewTimes(coffeeLocator(coffeeMenuList.cappuccino, page), 3, page);
    await expect.soft(menu.discountedMocha).toBeVisible();
    await expect.soft(menu.promotionButtonNo).toBeVisible();
    await expect.soft(menu.promotionButtonYes).toBeVisible();
    await menu.promotionButtonNo.click();
    await menu.checkoutButton.hover();
    await expect.soft(menu.addNamedCoffee('Cappuccino')).toBeVisible();
    await clickFewTimes(coffeeLocator(coffeeMenuList.mocha, page), 3, page);
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
