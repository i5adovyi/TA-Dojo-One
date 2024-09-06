import { expect, Locator, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app');
});

test.describe('Order new coffee: ', () => {
  test('ISCS-1 - Order espresso', async ({ page }) => {
    const emailField: Locator = page.locator('input[name=email][id=email]');
    await expect(
      page.locator('.cup-body[aria-label=Espresso][data-test=Espresso]')
    ).toBeVisible();

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

  test('ISCS-3 - Order 2 espresso via hover', async ({ page }) => {
    await page.locator('[data-test="Espresso"]').click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $10.00'
    );
    await page.locator('[data-test="checkout"]').hover();
    await expect(
      page.locator('ul').filter({ hasText: 'Espresso x 1+-' })
    ).toBeVisible();
    await expect(page.locator('#app')).toContainText('Espresso');
    await page.getByLabel('Add one Espresso').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $20.00'
    );
    await page.locator('[data-test="checkout"]').click();
    await expect(page.getByText('Payment details×We will send')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Payment details');
  });

  test('ISCS-4 - Right click on Mocha', async ({ page }) => {
    await page.locator('[data-test="Mocha"]').click({
      button: 'right',
    });
    await expect(page.getByRole('button', { name: 'Yes' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'No' })).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $8.00'
    );
    await page.locator('[data-test="Mocha"]').click({
      button: 'right',
    });
    await page.getByRole('button', { name: 'No' }).click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $8.00'
    );
  });

  test('ISCS-5 - Promo Message', async ({ page }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(
      page.getByText(
        "It's your lucky day! Get an extra cup of Mocha for $4.espressochocolate"
      )
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Yes, of course!' })
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: "Nah, I'll skip." })
    ).toBeVisible();
    await page.getByRole('button', { name: "Nah, I'll skip." }).click();
    await page.locator('[data-test="checkout"]').hover();
    await expect(
      page.locator('ul').filter({ hasText: 'Cappuccino x 3+-' })
    ).toBeVisible();
    await expect(page.locator('#app')).toContainText('Cappuccino x 3+-');
    await page.locator('[data-test="Mocha"]').click();
    await page.locator('[data-test="Mocha"]').click();
    await page.locator('[data-test="Mocha"]').click();
    await expect(
      page.getByRole('button', { name: 'Yes, of course!' })
    ).toBeVisible();
    await page.getByRole('button', { name: 'Yes, of course!' }).click();
    await page.locator('[data-test="checkout"]').hover();
    await expect(page.locator('#app')).toContainText('(Discounted) Mocha');
    await page.getByLabel('Cart page').click();
    await expect(page.locator('#app')).toContainText('(Discounted) Mocha');
  });
});
