import { expect } from '@playwright/test';
import { guestUserTest } from './fixtures/guest-user-fixture';
import { loggedInTest } from './fixtures/logged-in-fixture';
import { userData } from './src/userData';

const email = userData.getEmail();
// const password = userData.getPassword();
const username = userData.getUsername();

guestUserTest.describe('User registration and actions', () => {
  guestUserTest('Register a new user', async ({ homePage }) => {
    await homePage.navigate('https://demo.learnwebdriverio.com/');
    await homePage.clickSignUpLink();
    await homePage.fillEmail(email);
    await homePage.fillUsername(username);
    await homePage.fillPassword(email);
    await homePage.clickSignUpButton();
    await expect(homePage.locators.newArticleLink).toBeVisible();
    await expect(homePage.locators.settingsLink).toBeVisible();
  });

  guestUserTest('Login with newly created user', async ({ homePage }) => {
    await homePage.navigate('https://demo.learnwebdriverio.com/');
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
});

loggedInTest.describe('User actions', () => {
  loggedInTest(
    'Accessing dashboard as logged-in user',
    async ({ homePage }) => {
      await expect(homePage.locators.yourFeedTab).toBeVisible();
      await expect(homePage.locators.newArticleLink).toBeVisible();
      await expect(homePage.locators.settingsLink).toBeVisible();
    }
  );

  loggedInTest(
    'Add new article',
    async ({ homePage, editorPage, articlePage }) => {
      await homePage.clickNewArticleLink();
      await editorPage.fillTitle('New article');
      await editorPage.fillDescription('New article description');
      await editorPage.fillPostBody('New article body');
      await editorPage.addTags(['new', 'article']);
      await editorPage.submitPost();
      await articlePage.locators.articleTitle.waitFor({
        state: 'visible',
      });
      await expect(articlePage.locators.articleTitle).toHaveText('New article');
    }
  );
});
