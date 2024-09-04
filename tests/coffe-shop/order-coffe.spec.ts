import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://coffee-cart.app');
});

test.describe('Order new coffee: ', () => {
  test('ISCS-1 - Order espresso', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Espresso $' })).toHaveText(
      'Espresso $10.00'
    );
    await expect(page.locator('[data-test="Espresso"]')).toBeVisible();

    await page.locator('[data-test="Espresso"]').click();
    await page.locator('[data-test="checkout"]').click();

    await expect(
      page.getByRole('heading', { name: 'Payment details' })
    ).toBeVisible();
    await page.getByLabel('Name').fill('bob');
    await page.getByLabel('Name').press('Tab');
    await page.getByLabel('Email').fill('bob@marley.com');
    await page.getByLabel('Promotion checkbox').check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(
      page.getByRole('button', { name: 'Thanks for your purchase.' })
    ).toBeVisible();
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
    await page.getByLabel('Cart page').click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('#app')).toContainText('Americano');
    await page
      .locator('div')
      .filter({ hasText: /^Cafe Breve$/ })
      .click();
    await expect(page.locator('#app')).toContainText('Cafe Breve');
    await expect(page.locator('#app')).toContainText('Cafe Latte');
    await expect(page.locator('#app')).toContainText('Cappuccino');
    await expect(page.locator('#app')).toContainText('Espresso');
    await expect(
      page.locator('div').filter({ hasText: /^Espresso Con Panna$/ })
    ).toBeVisible();
    await expect(page.locator('#app')).toContainText('Espresso Macchiato');
    await expect(page.locator('#app')).toContainText('Flat White');
    await expect(page.locator('#app')).toContainText('Mocha');
    await page.locator('[data-test="checkout"]').click();
    await expect(page.getByText('Payment details×We will send')).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('Payment details');
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('bob');
    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill('bob@explain.com');
    await page.getByLabel('Promotion checkbox').check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(
      page.getByRole('button', { name: 'Thanks for your purchase.' })
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
