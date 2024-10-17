import { test } from '@playwright/test';

test('Search in rozetka', async ({ page }) => {
  await page.goto('https://rozetka.com.ua/ua/');
  await page.waitForLoadState('load');
  await page.waitForSelector('#rz-banner');
  await page.click('//*[@id="rz-banner"]//span[@class="exponea-close-cross"]');
  await page.locator('//input[@name="search"]').fill('iphone');
  // Wait for the search button using the corrected XPath
  await page.waitForSelector(
    '//*[@class="header-search"]//button[contains(@class, "button") and contains(@class, "search-form__submit")]'
  );

  // Click the search button
  await page.click(
    '//*[@class="header-search"]//button[contains(@class, "button") and contains(@class, "search-form__submit")]'
  );
});
