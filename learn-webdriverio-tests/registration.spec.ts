import { faker } from '@faker-js/faker';
import test, { expect } from '@playwright/test';

let username = faker.internet.userName();
let email = faker.internet.email();
let surname = faker.person.lastName();
let password = faker.internet.password();

test.beforeEach(async ({ page }) => {
  await page.goto('https://demo.learnwebdriverio.com/');
});

test.describe('Login page', () => {
  test('Login with valid credentials', async ({ page }) => {
    await page.locator('//ul[@data-qa-id="site-nav"]/li[3]').click();
    await page.locator('//input[@placeholder="Username"]').fill('name');
    await page.locator('//input[@placeholder="Email"]').fill('email');
    await page.locator('//input[@placeholder="Password"]').fill('password');
    await page.locator('//button[contains(text(), "Sign up")]').click();
  });

  test('Login with invalid credentials', async ({ page }) => {
    await page.locator('//ul[@data-qa-id="site-nav"]/li[3]').click();
    await page.locator('//input[@placeholder="Username"]').fill('name');
    await page.locator('//input[@placeholder="Email"]').fill('email');
    await page.locator('//input[@placeholder="Password"]').fill('password');
    await page.locator('//button[contains(text(), "Sign up")]').click();

    await expect(page.getByText('username is already taken.')).toBeVisible();
    await expect(page.getByText('email is already taken.')).toBeVisible();
    await expect(page.locator('#app')).toContainText(
      'username is already taken.'
    );
    await expect(page.locator('#app')).toContainText('email is already taken.');
  });
});
