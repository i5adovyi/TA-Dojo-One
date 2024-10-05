import { faker } from '@faker-js/faker';
import { expect, test } from '@playwright/test';
import { HomePage } from './login-page.pom';

const username: string = faker.internet.userName();
const email: string = faker.internet.email();
const password: string = faker.internet.password();

test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate('https://demo.learnwebdriverio.com/');
});

test.describe('Login page', () => {
  test('Register from home page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickSignUpLink();
    await homePage.fillEmail(email);
    await homePage.fillPassword(password);
    await homePage.fillUsername(username);
    await homePage.clickSignUpButton();
  });

  test('Login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickSignInLink();
    await homePage.fillEmail(email);
    await homePage.fillPassword(password);
    await homePage.clickSignInButton();
  });

  test('Login with invalid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickSignInLink();
    await homePage.fillEmail(email);
    await homePage.fillPassword(faker.internet.password());
    await homePage.clickSignInButton();

    await expect(page.locator('#app')).toContainText('email or password is invalid');
  });
});
