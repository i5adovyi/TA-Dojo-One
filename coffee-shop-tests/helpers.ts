import { Locator, Page } from '@playwright/test';

export const clickFewTimes = async (
  locator: Locator,
  count: number,
  page: Page
) => {
  for (let i = 0; i < count; i++) {
    await locator.click({ delay: 100 });
    await page.waitForTimeout(500);
  }
};


