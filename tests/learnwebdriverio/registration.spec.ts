import test, { expect } from '@playwright/test';

test('Registration page', async ({ page }) => {
  await page.goto('https://demo.learnwebdriverio.com/');
  await page.locator('//a[@href="/register"]').click();
  await page.locator('//input[@placeholder="Username"]').fill('bob');
  await page.locator('//input[@placeholder="Email"]').fill('bob@example.com');
  await page.locator('//input[@placeholder="Password"]').fill('12345');
  await page.locator('//button[contains(text(), "Sign up")]').click();

  await expect(page.getByText('username is already taken.')).toBeVisible();
  await expect(page.getByText('email is already taken.')).toBeVisible();
  await expect(page.locator('#app')).toContainText(
    'username is already taken.'
  );
  await expect(page.locator('#app')).toContainText('email is already taken.');
});
