import { expect, test } from '@playwright/test';

test('Search in rozetka', async ({ page }) => {
  await page.goto('https://rozetka.com.ua/ua/');
  await page.waitForLoadState('load');
  await page.waitForSelector('#rz-banner');
  await page.click('//*[@id="rz-banner"]//span[@class="exponea-close-cross"]');
  await page.locator('//input[@name="search"]').fill('iPhone');
  // Wait for the search button using the corrected XPath
  await page.waitForSelector(
    '//*[@class="header-search"]//button[contains(@class, "button") and contains(@class, "search-form__submit")]'
  );

  // Click the search button
  await page.click(
    '//*[@class="header-search"]//button[contains(@class, "button") and contains(@class, "search-form__submit")]'
  );

  const searchResult = page
    .locator(`//*[@class="catalog-grid ng-star-inserted"]/li`)
    .first();

  await expect(searchResult).toContainText('Apple iPhone');
});

const testData = [
  {
    testId: 'MONE-001',
    searchQuery: 'Ноутбук',
    searchResultWord: 'Ноутбук',
  },
  {
    testId: 'MONE-002',
    searchQuery: 'Моноблок',
    searchResultWord: 'Моноблок',
  },
];

for (const data of testData) {
  test.describe.serial('search suit', () => {
    test(`${data.testId} search for "${data.searchQuery}" - should appear in search results`, async ({
      page,
    }) => {
      await page.goto('https://rozetka.com.ua/ua/');
      await page.waitForLoadState('load');
      await page.waitForSelector('#rz-banner');
      await page.click('//*[@id="rz-banner"]//span[@class="exponea-close-cross"]');
      await page.locator(`//input[@name="search"]`).fill(data.searchQuery);

      // await page.keyboard.press('Enter');
      await page.click(
        '//*[@class="header-search"]//button[contains(@class, "button") and contains(@class, "search-form__submit")]'
      );
      await page.waitForLoadState('load');
      await page.waitForSelector(
        '//*[@class="catalog-heading ng-star-inserted"]'
      );

      await expect.soft(
        page.locator('//*[@class="catalog-heading ng-star-inserted"]')
      ).toContainText(data.searchResultWord);

      const searchResult = page
        .locator(`//*[@class="catalog-grid ng-star-inserted"]/li[1]`)

      await expect(searchResult).toContainText(data.searchResultWord);
    });
  });
}
