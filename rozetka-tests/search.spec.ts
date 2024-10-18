import { expect, test } from '@playwright/test';

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

  const searchResult = page
    .locator(
      `//li[contains(@class, "catalog-grid")]//a[contains(@class, 'goods-tile__picture')]`
    )
    .first();

  expect(searchResult.getAttribute('title')).toContain('iphone');
});

const testData = [
  {
    testId: 'MONE-001',
    searchQuery: 'Монітори',
    searchResultWord: 'Монітор',
  },
  {
    testId: 'MONE-002',
    searchQuery: "Комп'ютерна мишка",
    searchResultWord: "Комп'ютерна мишка",
  },
];

for (const data of testData) {
  test.describe.serial('search suit', () => {
    test(`${data.testId} search for "${data.searchQuery}" - should appear in search results`, async ({
      page,
    }) => {
      await page.goto('https://rozetka.com.ua/ua/');
      await page.locator(`//input[@name="search"]`).fill(data.searchQuery);

      await page.keyboard.press('Enter');

      const searchResult = page
        .locator(
          `//li[contains(@class, "catalog-grid")]//a[contains(@class, 'goods-tile__picture')]`
        )
        .first();

      expect(searchResult.getAttribute('title')).toContain(
        data.searchResultWord
      );
    });
  });
}
