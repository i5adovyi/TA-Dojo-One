import { expect, Locator, test } from '@playwright/test';
import { clickFewTimes } from './helpers';
import {
  addNamedCoffeeLocator,
  cartPageLocators,
  getCoffeeLocators,
} from './locators';

let menu: ReturnType<typeof getCoffeeLocators>;
let cart: ReturnType<typeof cartPageLocators>;
test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app');
  menu = getCoffeeLocators(page);
  cart = cartPageLocators(page);
});

test.describe('Order new coffee: ', () => {
  test('ISCS-1 - Order espresso', async ({ page }) => {
    const emailField: Locator = page.locator('input[name=email][id=email]');
    await expect(menu.espresso).toBeVisible();

    await page
      .locator('.cup-body[aria-label=Espresso][data-test=Espresso]')
      .click();
    await page
      .locator('button[aria-label="Proceed to checkout"][data-test=checkout]')
      .click();

    await expect(page.locator('[aria-label="Payment form"]')).toBeVisible();
    await page.locator('input[name=name][id=name]').fill('bob');
    await emailField.fill('bob@marley.com');
    await page.locator('input[name=promotion][id=promotion]').check();
    await page.locator('button[id="submit-payment"][type=submit]').click();
    await expect(page.locator('.snackbar.success[role=button]')).toBeVisible();
  });

  test('ISCS-2 - Order all coffee', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Mocha"]').click();
    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="Americano"]').click();
    await page.locator('[data-test="Cafe_Latte"]').click();
    await page.locator('[data-test="Espresso_Con Panna"]').click();
    await page.locator('[data-test="Cafe_Breve"]').click();
    await page.locator('[aria-label="Cart page"]').click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Americano"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Cafe Breve"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Cafe Latte"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Cappuccino"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Espresso"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Espresso Con Panna"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Espresso Macchiato"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Flat White"][type="button"]:visible'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '.list-item button[aria-label="Add one Mocha"][type="button"]:visible'
      )
    ).toBeVisible();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('form[aria-label="Payment form"]')).toBeVisible();
    await page.locator('#name').fill('bobo');
    await page.locator('#email').fill('bob@explain.com');
    await page.locator('#promotion').check();
    await page.locator('#submit-payment').click();
    await expect(
      page.locator('.snackbar.success[role="button"]')
    ).toBeVisible();
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
    await expect(
      menu.addNamedCoffee('(Discounted) Mocha')
    ).toBeVisible();
    await cart.cartPageButton.click();
    await expect(cart.addCoffeeButtonCart('(Discounted) Mocha')).toBeVisible();
    await expect(
      cart.removeCoffeeButtonCart('(Discounted) Mocha')
    ).toBeVisible();
  });
});
