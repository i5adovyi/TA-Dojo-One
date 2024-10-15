import { expect } from '@playwright/test';
import { test } from './fixtures/baseFixture';

// const email = userData.email;
// const password = userData.password;
// const username = userData.username;

const email = process.env.EMAIL!;
const password = process.env.PASSWORD!;
const username = process.env.USERNAME!;

test.describe('User registration and actions', () => {
  test('Register a new user', async ({ homePage }) => {
    await homePage.clickSignUpLink();
    await homePage.fillEmail(email);
    await homePage.fillUsername(username);
    await homePage.fillPassword(password);
    await homePage.clickSignUpButton();
    await expect(homePage.locators.newArticleLink).toBeVisible();
    await expect(homePage.locators.settingsLink).toBeVisible();
  });

  test('Login with newly created user', async ({ homePage }) => {
    await homePage.clickSignInLink();
    await homePage.fillEmail(email);
    await homePage.fillPassword(password);
    expect(homePage.locators.signInButton).toBeVisible();
    await homePage.clickSignInButton();

    await expect(homePage.locators.yourFeedTab).toBeVisible();
    await expect(homePage.locators.newArticleLink).toBeVisible();
    await expect(homePage.locators.settingsLink).toBeVisible();
  });

  test('Accessing dashboard as logged-in user', async ({ userLoggedIn }) => {
    await expect(userLoggedIn.locators.yourFeedTab).toBeVisible();
    await expect(userLoggedIn.locators.newArticleLink).toBeVisible();
    await expect(userLoggedIn.locators.settingsLink).toBeVisible();
  });

  // test('Creating a new post as logged-in user', async ({ userLoggedIn }) => {
  //   // Створення нового посту
  //   await userLoggedIn.page.click('text=New Post');
  //   await userLoggedIn.page.fill('#title', 'My New Post');
  //   await userLoggedIn.page.fill('#body', 'This is the content of my new post');
  //   await userLoggedIn.page.click('text=Publish');

  //   // Перевіряємо, що пост успішно створено
  //   await expect(
  //     userLoggedIn.page.locator('text=Post Published')
  //   ).toBeVisible();
  // });
});
