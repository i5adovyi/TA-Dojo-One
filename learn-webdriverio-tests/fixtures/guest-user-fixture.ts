import { test as base } from '@playwright/test';
import { ArticlePage } from '../src/article-page/ArticlePage';
import { EditorPage } from '../src/editor-page/EditorPage';
import { HomePage } from '../src/home-page/HomePage';

export const guestUserTest = base.extend<{
  homePage: HomePage;
  editorPage: EditorPage;
  articlePage: ArticlePage;
}>({
  // Ініціалізація сторінок без логування
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate('https://demo.learnwebdriverio.com');
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
