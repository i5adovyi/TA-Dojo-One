import { expect } from '@playwright/test';
import { test } from './fixtures/baseFixture';
import { userData } from './src/userData';

const email = userData.getEmail();
const password = userData.getPassword();
const username = userData.getUsername();

test.describe('User registration and actions', () => {
  test('Register a new user', async ({ homePage }) => {
    await homePage.clickSignUpLink();
    await homePage.fillEmail(email);
    await homePage.fillUsername(username);
    await homePage.fillPassword(email);
    await homePage.clickSignUpButton();
    await expect(homePage.locators.newArticleLink).toBeVisible();
    await expect(homePage.locators.settingsLink).toBeVisible();
  });

  test.skip('Login with newly created user', async ({ homePage }) => {
    await homePage.clickSignInLink();
    await homePage.fillEmail(email);
    await homePage.fillPassword(email);
    await expect.soft(homePage.locators.signInButton).toBeVisible();
    //await homePage.page.waitForTimeout(5000);
    await homePage.clickSignInButton();

    await expect(homePage.locators.yourFeedTab).toBeVisible();
    await expect(homePage.locators.newArticleLink).toBeVisible();
    await expect(homePage.locators.settingsLink).toBeVisible();
  });

  test('Accessing dashboard as logged-in user', async ({ userLoggedIn }) => {
    await expect(userLoggedIn.homePage.locators.yourFeedTab).toBeVisible();
    await expect(userLoggedIn.homePage.locators.newArticleLink).toBeVisible();
    await expect(userLoggedIn.homePage.locators.settingsLink).toBeVisible();
  });

  test('Add new article', async ({ userLoggedIn }) => {
    await userLoggedIn.homePage.clickNewArticleLink();
    await userLoggedIn.editorPage.fillTitle('New article');
    await userLoggedIn.editorPage.fillDescription('New article description');
    await userLoggedIn.editorPage.fillPostBody('New article body');
    await userLoggedIn.editorPage.addTags(['new', 'article']);
    await userLoggedIn.editorPage.submitPost();
    await userLoggedIn.articlePage.locators.articleTitle.waitFor({
      state: 'visible',
    });
    expect(userLoggedIn.articlePage.locators.articleTitle).toHaveText(
      'New article'
    );
  });
});
