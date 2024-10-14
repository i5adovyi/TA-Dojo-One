import { test as base } from '@playwright/test';
import { config } from 'dotenv';
import { HomePage } from '../src/HomePage';

// Load environment variables from .env file
config();

export const test = base.extend<{
  homePage: HomePage;
  userLoggedIn: HomePage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigate('https://demo.learnwebdriverio.com/');
    await use(homePage);
  },

  userLoggedIn: async ({ page }, use) => {
    const userLoggedIn = new HomePage(page);

    // Extract environment variables
    const email = process.env.EMAIL!;
    const password = process.env.PASSWORD!;

    // Navigate to login page and perform login
    await userLoggedIn.navigate('https://demo.learnwebdriverio.com/login');
    await userLoggedIn.fillEmail(email);
    await userLoggedIn.fillPassword(password);
    await userLoggedIn.clickSignInButton();

    // Use the logged-in user page in tests
    await use(userLoggedIn);
  },
});