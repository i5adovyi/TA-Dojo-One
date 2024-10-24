// import { test as base } from '@playwright/test';
// import { config } from 'dotenv';
// import { ArticlePage } from '../src/article-page/ArticlePage';
// import { EditorPage } from '../src/editor-page/EditorPage';
// import { HomePage } from '../src/home-page/HomePage';

// // Load environment variables from .env file
// config();

// export const test = base.extend<{
//   homePage: HomePage;
//   userLoggedIn: {
//     homePage: HomePage;
//     editorPage: EditorPage;
//     articlePage: ArticlePage;
//   };
// }>({
//   homePage: async ({ page }, use) => {
//     const homePage = new HomePage(page);
//     await homePage.navigate('https://demo.learnwebdriverio.com/');
//     await use(homePage);
//   },

//   userLoggedIn: async ({ page }, use) => {
//     const homePage = new HomePage(page);
//     const editorPage = new EditorPage(page);
//     const articlePage = new ArticlePage(page);

//     // Extract environment variables
//     const email = process.env.EMAIL!;
//     const password = process.env.PASSWORD!;

//     // Navigate to login page and perform login
//     await homePage.navigate('https://demo.learnwebdriverio.com/login');
//     await homePage.fillEmail(email);
//     await homePage.fillPassword(password);
//     await homePage.clickSignInButton();

//     // Use the logged-in user page in tests
//     await use({ homePage, editorPage, articlePage });
//   },
// });

// //=========================================================//

// export const guestUserTest = base.extend<{
//   homePage: HomePage;
//   articlePage: ArticlePage;
// }>({
//   homePage: async ({ page }, use) => {
//     const homePage = new HomePage(page);
//     await homePage.navigate('https://example.com');
//     await use(homePage);
//   },

//   articlePage: async ({ page }, use) => {
//     const articlePage = new ArticlePage(page);
//     await use(articlePage);
//   },
// });

// //=========================================================//
// export const loggedInTest = base.extend<{
//   homePage: HomePage;
//   editorPage: EditorPage;
//   articlePage: ArticlePage;
//   userLoggedIn: boolean;
// }>({
//   homePage: async ({ page }, use) => {
//     const homePage = new HomePage(page);
//     await homePage.navigate('https://example.com');
//     await use(homePage);
//   },

//   articlePage: async ({ page }, use) => {
//     const articlePage = new ArticlePage(page);
//     await use(articlePage);
//   },

//   userLoggedIn: async ({ page, context }, use) => {
//     const homePage = new HomePage(page);
//     const email = process.env.EMAIL!;
//     const password = process.env.PASSWORD!;

//     // Navigate to login page and perform login
//     await homePage.navigate('https://demo.learnwebdriverio.com/login');
//     await homePage.fillEmail(email);
//     await homePage.fillPassword(password);
//     await homePage.clickSignInButton();

//     await use(userLoggedIn);
//   },
// });
