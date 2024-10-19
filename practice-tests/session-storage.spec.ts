import { expect, test } from '@playwright/test';

// 1. Створіть тест, який буде логінитися на linkedin та зберігати storageState у файл.
// 2. Створіть інший тест, який буде використовувати збережений storageState, щоб увійти на сайт автоматично, без повторного логіну.

// Підказка:

// Використовуйте context.storageState({ path: 'state.json' }) для збереження стану.
// Використовуйте опцію storageState: 'state.json' для відновлення стану в новому тесті.

test('Login into linkedin and save state', async ({ page, context }) => {
  await page.goto('https://www.linkedin.com/');
  await page.waitForLoadState('load');
  await page
    .locator(
      '//*[@id="artdeco-global-alert-container"]//*[@action-type="ACCEPT"]'
    )
    .click();
  await page
    .locator(
      '//*[@data-tracking-control-name="guest_homepage-basic_nav-header-signin"]'
    )
    .click();
  await page
    .locator('//*[@id="organic-div"]//input[@id="username"]')
    .fill('isadov.test03@gmail.com');
  await page
    .locator('//*[@id="organic-div"]//input[@id="password"]')
    .fill('haq!xpc2xvf*zvf3EKZ');
  await page
    .locator('//*[@id="organic-div"]//button[@aria-label="Sign in"]')
    .click();

  await page.waitForLoadState('load');
  await page.waitForSelector(
    '//div[@class="feed-identity-module__actor-meta break-words"]//div[@class="t-16 t-black t-bold"]'
  );
  expect(
    page.locator(
      '//div[@class="feed-identity-module__actor-meta break-words"]//div[@class="t-16 t-black t-bold"]'
    )
  ).toHaveText('Welcome, IGOR TEST!');
});
