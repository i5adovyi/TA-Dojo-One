import { test as base, Page } from '@playwright/test';
import { config } from 'dotenv';
config();

export const loggedUserTest = base.extend<{
  page: Page;
}>({
  page: async ({ page, context }, use) => {
    const email = process.env.LINKEDIN_EMAIL!;
    const password = process.env.LINKEDIN_PASSWORD!;
    const storageStatePath = 'practice-tests/storageState/state.json';

    await page.goto('https://www.linkedin.com/');
    await page.waitForLoadState('load');
    
    const acceptCookiesButton = page.locator(
      '//*[@id="artdeco-global-alert-container"]//*[@action-type="ACCEPT"]'
    );
    if (await acceptCookiesButton.isVisible()) {
      await acceptCookiesButton.click();
    }

    await page
      .locator(
        '//*[@data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
      )
      .click();

    await page
      .locator('//*[@id="organic-div"]//input[@id="username"]')
      .fill(email);
    await page
      .locator('//*[@id="organic-div"]//input[@id="password"]')
      .fill(password);
    await page
      .locator('//*[@id="organic-div"]//button[@aria-label="Sign in"]')
      .click();

    await page.waitForLoadState('load');
    await context.storageState({
      path: storageStatePath,
    });
    await use(page);
  },
});
