import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../coffee-shop-tests/src/fixtures/main-fixture';
import { coffeeMenuList } from '../coffee-shop-tests/src/pages/menu/coffee-menu-list';
import { clickFewTimes } from '/Users/admin/TA Dojo One/coffee-shop-tests/src/helpers/helpers.ts';

const userName = faker.internet.userName();
const userEmail = faker.internet.email();

test.describe('Order new coffee: ', () => {
  test('ISCS-1 - Order espresso', async ({ menuPage }) => {
    await expect
      .soft(menuPage.locators.coffeeLocator('Espresso'))
      .toBeVisible();
    //await menuPage.espresso.click();
    await menuPage.clickOnCup(coffeeMenuList.espresso);
    await menuPage.clickCheckoutButton();
    await expect.soft(menuPage.locators.paymentForm).toBeVisible();
    await menuPage.fillName(userName);
    await menuPage.fillEmail(userEmail);
    await menuPage.fillPromotionCheckbox();
    await menuPage.clickSubmitPayment();
    await expect(menuPage.locators.successSnackbar).toBeVisible();
  });

  test('ISCS-2 - Order all coffee', async ({ menuPage, cartPage }) => {
    for (const coffeeName of Object.values(coffeeMenuList)) {
      await menuPage.clickOnCup(coffeeName);
    }
    await cartPage.clickCartPageButton();

    await expect.soft(menuPage.locators.checkoutButton).toBeVisible();

    for (const coffeeKey in coffeeMenuList) {
      const coffeeValue = coffeeMenuList[coffeeKey];
      await expect
        .soft(cartPage.locators.addCoffeeButtonCart(coffeeValue))
        .toBeVisible();
    }

    await menuPage.clickCheckoutButton();
    await expect.soft(menuPage.locators.paymentForm).toBeVisible();
    await menuPage.fillName(userName);
    await menuPage.fillEmail(userEmail);
    await menuPage.fillPromotionCheckbox();
    await menuPage.clickSubmitPayment();
    await expect(menuPage.locators.successSnackbar).toBeVisible();
  });

  test('ISCS-3 - Ordering two espresso via hover on checkout button', async ({
    menuPage,
  }) => {
    await menuPage.clickOnCup(coffeeMenuList.espresso);
    await expect
      .soft(menuPage.locators.checkoutButton)
      .toContainText('Total: $10.00');
    await menuPage.locators.checkoutButton.hover();
    await expect
      .soft(menuPage.locators.addNamedCoffee(coffeeMenuList.espresso))
      .toBeVisible();
    await menuPage.clickOnCup(coffeeMenuList.espresso);
    await expect
      .soft(menuPage.locators.checkoutButton)
      .toContainText('Total: $20.00');
    await menuPage.clickCheckoutButton();
    await expect(menuPage.locators.paymentForm).toBeVisible();
  });

  test('ISCS-4 - Right click on Mocha', async ({ menuPage }) => {
    await menuPage.locators
      .coffeeLocator(coffeeMenuList.mocha)
      .click({ button: 'right' });
    await expect.soft(menuPage.locators.addToCartModal).toBeVisible();
    await menuPage.clickModalButtonYes();
    await expect
      .soft(menuPage.locators.checkoutButton)
      .toContainText('Total: $8.00');
    await menuPage.locators
      .coffeeLocator(coffeeMenuList.mocha)
      .click({ button: 'right' });
    await menuPage.clickModalButtonNo();
    await expect(menuPage.locators.checkoutButton).toContainText(
      'Total: $8.00'
    );
  });

  test('ISCS-5 - Promo Message', async ({ menuPage, cartPage }) => {
    await clickFewTimes(
      menuPage.locators.coffeeLocator(coffeeMenuList.cappuccino),
      3,
      menuPage.page
    );
    await expect.soft(menuPage.locators.discountedMocha).toBeVisible();
    await expect.soft(menuPage.locators.promotionButtonNo).toBeVisible();
    await expect.soft(menuPage.locators.promotionButtonYes).toBeVisible();

    await menuPage.clickPromotionButtonNo();
    await menuPage.locators.checkoutButton.hover();
    await expect
      .soft(menuPage.locators.addNamedCoffee('Cappuccino'))
      .toBeVisible();
    await clickFewTimes(
      menuPage.locators.coffeeLocator(coffeeMenuList.mocha),
      3,
      menuPage.page
    );
    await expect.soft(menuPage.locators.promotionButtonYes).toBeVisible();
    await menuPage.clickPromotionButtonYes();
    await menuPage.locators.checkoutButton.hover();
    await expect
      .soft(menuPage.locators.addNamedCoffee('(Discounted) Mocha'))
      .toBeVisible();
    await cartPage.clickCartPageButton();
    await expect(
      cartPage.locators.addCoffeeButtonCart('(Discounted) Mocha')
    ).toBeVisible();
    await expect(
      cartPage.locators.removeCoffeeButtonCart('(Discounted) Mocha')
    ).toBeVisible();
  });
});
