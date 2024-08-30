import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto(
    'https://www.google.com/search?q=playwright&oq=playwright&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzM2OWowajSoAgCwAgE&sourceid=chrome&ie=UTF-8'
  );
  await page
    .getByRole('link', { name: 'Playwright: Fast and reliable' })
    .click();
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.locator('.tabs > li:nth-child(2)').first().click();
  await page.locator('.tabs > li:nth-child(3)').first().click();
});
