import { test as base } from '@playwright/test';
import { config } from 'dotenv';
import { promises as fs } from 'fs';
import { ArticlePage } from '../src/article-page/ArticlePage';
import { EditorPage } from '../src/editor-page/EditorPage';
import { HomePage } from '../src/home-page/HomePage';
import { userData } from '../src/userData';

config(); // Load environment variables

export const loggedInTest = base.extend<{
  homePage: HomePage;
  editorPage: EditorPage;
  articlePage: ArticlePage;
}>({
  // Фікстура для логування користувача
  page: async ({ page, context }, use) => {
    const homePage = new HomePage(page);
    const email = userData.getEmail();
    const username = userData.getUsername();
    const storageStatePath = 'storageState.json';

    try {
      // Перевірка наявності файлу з сесією
      const state = await fs.readFile(storageStatePath, 'utf-8');
      await context.addCookies(JSON.parse(state).cookies);
      console.log('Using saved session state');

      // Перевірка, чи дійсна сесія (перевіряємо, чи користувач залогінений)
      await homePage.navigate('https://demo.learnwebdriverio.com/');
      const isLoggedIn = await homePage.locators.yourFeedTab.isVisible({
        timeout: 3000,
      });
      if (!isLoggedIn) {
        throw new Error('Session state is not valid');
      }
    } catch (e) {
      console.log('No valid session state. Performing new login.');

      // Виконуємо логін новим користувачем
      await homePage.navigate('https://demo.learnwebdriverio.com/');
      await homePage.clickSignUpLink();
      await homePage.fillEmail(email);
      await homePage.fillUsername(username);
      await homePage.fillPassword(email);
      await homePage.clickSignUpButton();

      // Збереження стану сесії
      await context.storageState({ path: storageStatePath });
    }

    await use(page); // Передаємо сторінку далі для використання
  },

  // Ініціалізація сторінок після логування
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  editorPage: async ({ page }, use) => {
    const editorPage = new EditorPage(page);
    await use(editorPage);
  },

  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },
});
