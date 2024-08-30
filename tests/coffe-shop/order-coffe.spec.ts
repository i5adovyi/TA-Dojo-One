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

    await expect(page.getByRole('heading', { name: 'Payment details' })).toBeVisible();
    await page.getByLabel('Name').fill('bob');
    await page.getByLabel('Name').press('Tab');
    await page.getByLabel('Email').fill('bob@marley.com');
    await page.getByLabel('Promotion checkbox').check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('button', { name: 'Thanks for your purchase.' })).toBeVisible();
  });

  test('ISCS-2 - Order latte', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await expect(page.locator('[data-test="Espresso_Macchiato"]')).toBeVisible();
    await page.hover('//*[@id="app"]/div[2]/div[1]/button')
    await expect(page.locator('#app')).toContainText('Espresso Macchiato $12.00');
    await page.locator('[data-test="Espresso_Macchiato"]').click();
    await expect(page.locator('[data-test="checkout"]')).toBeVisible();
    await expect(page.locator('[data-test="checkout"]')).toContainText('Total: $12.00');
    await expect(page.getByText('Espresso Macchiato', { exact: true })).toBeVisible();
    await expect(page.locator('ul').filter({ hasText: 'Espresso Macchiato x 1+-' })).toBeVisible();
    await page.getByLabel('Add one Espresso Macchiato').click();

  });
  
});
