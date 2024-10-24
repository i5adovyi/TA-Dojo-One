import { expect, test } from '@playwright/test';
import { config } from 'dotenv';
import { loggedUserTest } from './src/fixtures/linkedin-fixture';
config();

// 1. Створіть тест, який буде логінитися на linkedin та зберігати storageState у файл.
// 2. Створіть інший тест, який буде використовувати збережений storageState, щоб увійти на сайт автоматично, без повторного логіну.

// Підказка:

// Використовуйте context.storageState({ path: 'state.json' }) для збереження стану.
// Використовуйте опцію storageState: 'state.json' для відновлення стану в новому тесті.

//Base test without fixture
const email = process.env.LINKEDIN_EMAIL!;
const password = process.env.LINKEDIN_PASSWORD!;

test('Login into LinkedIn and save state', async ({ page, context }) => {
  await page.goto('https://www.linkedin.com/');
  await page.waitForLoadState('load');

  // Accept cookie policy if the element is present
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

  const profileName = page.locator(
    '//div[@class="feed-identity-module__actor-meta break-words"]//div[@class="t-16 t-black t-bold"]'
  );
  await profileName.waitFor({ state: 'visible', timeout: 20000 });

  await expect(profileName).toHaveText('Welcome, IGOR TEST!');

  await context.storageState({
    path: `practice-tests/storageState/state.json`,
  });
});



// Test 1 - Create Storage State file and Login
loggedUserTest(
  'Login into LinkedIn using fixture',
  async ({ page }) => {
    const profileName = page.locator(
      '//div[@class="feed-identity-module__actor-meta break-words"]//div[@class="t-16 t-black t-bold"]'
    );

    await expect(profileName).toHaveText('Welcome, IGOR TEST!');
  }
);

//Test2 - Login and check messages
test.use({
  storageState:
    '/Users/admin/TA Dojo One/practice-tests/storageState/state.json',
});
test('Open mesages for already logged in user', async ({page}) => {
    await page.goto('https://www.linkedin.com/messaging/thread/new/');
});
